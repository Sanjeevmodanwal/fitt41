import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController,ActionSheetController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class  ProfilePage{
 
  uid:any;
  fname:string;
  lname:string;
  email:string;
  dob:null;
  height:string;
  weight:string;
  nationality:null;
  code:null;
  profile_img:any;
  bg_img:string;
  constructor(
    private http: HttpClient,
    private router: Router,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  
  ) {
    this.storage.get('user').then((val) => {
      console.log(val.id);
      this.uid=val.id;
      this.get(val.id);
    });
  }

  ngOnInit() {
    // this.profile_img = this.activatedRoute.snapshot.paramMap.get('img');
    // //this.croppedImagepath =this.activatedRoute.snapshot.paramMap.get('profile');
    // console.log("profile",this.profile_img);
  }

  apiPath=environment.product;

  get(uid) {
  //   this.bg_img="../../assets/jim.jpg";
  //  console.log("bg",this.bg_img);
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/fetch_single', {"id":uid},httpOptions).subscribe((data: any) => {
        console.log(data);
        this.fname=data.first_name;
        this.lname=data.last_name;
        this.email=data.email;
        this.dob=data.dob;
        this.height=data.height;
        this.weight=data.weight;
        this.nationality=data.nationality;
        this.code=data.code;
        if(data.profile_pic==null){
          this.profile_img="/assets/user.png";
        }else{
          this.profile_img="https://www.mag-studios.com/Fitt41/images/"+data.profile_pic;
        }
        if(data.bg_img==""){
          this.bg_img="../../assets/jim.jpg";
        }else{
          console.log("bg profile");
          this.bg_img="https://www.mag-studios.com/Fitt41/images/"+data.bg_img;
        }
        this.loadingController.dismiss('setting');
      });
  }

  

  

  async LoginAlert(msg) {
    const alert = await this.alertController.create({
      message:msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      id:'profile'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  getdob(event){
    this.dob=event.detail.value;
 } 

  submit(){
    console.log(this.dob);
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/update', {"id":this.uid,"first_name": this.fname, "last_name":this.lname,"weight":this.weight,"height":this.height,"dob":this.dob,"nationality":this.nationality,"code":this.code},httpOptions).subscribe((data: any) => {
        if(data.status==200){
          let msg=data.msg;
          this.LoginAlert(msg);
          this.loadingController.dismiss('setting');
        }else{
          let msg=data.msg;
          this.LoginAlert(msg);
          this.loadingController.dismiss('setting');
        }
      });
  }

  bg(){
    this.router.navigate(['/bg-img/',{img:this.bg_img}]);
  }

  pro(){
    this.router.navigate(['/upload/',{img:this.profile_img}]);
  }

  ionViewWillEnter() {
    let uid=this.uid;
    this.get(uid);
  }


  

}
