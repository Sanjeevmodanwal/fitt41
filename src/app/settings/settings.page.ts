import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
//import { Storage } from '@ionic/storage';
import { LoadingController,AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  fname: string;
  lname: string;
  email: string;
  password: string;
  cpass: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  apiPath=environment.product;
  ngOnInit() {
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
      id:'setting'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


  singin() {
    if(this.fname && this.lname && this.email && this.password && this.cpass){
      this.presentLoadingWithOptions();
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}), };
      this.http.post(this.apiPath+'/Api/insert', {"fname": this.fname, "lname":this.lname,"email":this.email,"password": this.password,"cpass":this.cpass },httpOptions).subscribe((data: any) => {
       console.log(data); 
       if(data.status==200){
         this.loadingController.dismiss('setting');
         let msg=data.msg;
         this.LoginAlert(msg);
         this.router.navigate(['/login/']); 
       }else if(data.status==500){
         this.loadingController.dismiss('setting');
         let msg=data.msg;
         this.LoginAlert(msg);
       }
     });
    }else{
      let msg="please fill all fileds"
      this.LoginAlert(msg);
    }
   
  }

}
