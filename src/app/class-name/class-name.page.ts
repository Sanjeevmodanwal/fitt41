import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController,ActionSheetController,ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-class-name',
  templateUrl: './class-name.page.html',
  styleUrls: ['./class-name.page.scss'],
})
export class ClassNamePage implements OnInit {
  public items: Array<{id:any;name:string,capacity:string,duration:string,hour:string,miniut:string,status:any,enroll:string;}> = [];
  public locations: Array<{id:string,lname:string}> = [];
  sl:any;
  day:any;
  uid:any;
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
    });
  }

  ngOnInit() {
    this.GetSchedule();
    this.getlocation();
  }

  apiPath=environment.product;

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
      id:'class'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


  GetSchedule(){
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.get(this.apiPath+'/Workout/getschedule',httpOptions).subscribe((data: any) => {
          console.log(data);
         // var color=['green','lite','blue','orng','pup']
         // var color=['green']
          for(let i=0; i<data.length; i++){
            this.items.push({
              id:data[i].id,
              name:data[i].class_name,
              capacity:data[i].capacity,
              duration:data[i].duration,
              hour:data[i].hour,
              miniut:data[i].min,
              status:data[i].status,
              enroll:'Enroll'
            });
          }
          this.loadingController.dismiss('class');
      }); 
  }

  getlocation(){
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.get(this.apiPath+'/Workout/getlocation',httpOptions).subscribe((data: any) => {
          console.log(data);
          for(let i=0; i<data.length; i++){
            this.locations.push({
              id:data[i].id,
              lname:data[i].location_name,
            });
          }
          this.loadingController.dismiss('class');
      });  
  }

  location(event){
   this.sl=event.detail.value;
 
  }

  getdate(event){
    this.day=event.detail.value;

  }

  getdata(){
   if(this.sl==undefined){
    let msg="please select location";
    this.LoginAlert(msg);
   }
   if(this.day==undefined){
    let msg="please select days";
    this.LoginAlert(msg);
   }else{
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Workout/getdata',{"lid":this.sl,"day":this.day},httpOptions).subscribe((data: any) => {
          console.log(data);
          this.items=[];
          for(let i=0; i<data.length; i++){
            this.items.push({
              id:data[i].id,
              name:data[i].class_name,
              capacity:data[i].capacity,
              duration:data[i].duration,
              hour:data[i].hour,
              miniut:data[i].min,
              status:data[i].status,
              enroll:'Enroll'
            });
          }
          this.loadingController.dismiss('class');
      });  
   }
    
  }

  Enroll(id){
    var index=this.items.findIndex(pro => pro.id ==id);
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Workout/enroll',{"uid":this.uid,"sid":id},httpOptions).subscribe((data: any) => {
         if(data.status==200){
           this.items[index].enroll='Enrolled';
         }else if(data.status==500){
           let msg=data.msg;
           this.LoginAlert(msg);
         }
      });  
  }

}
