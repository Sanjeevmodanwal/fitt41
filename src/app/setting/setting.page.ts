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
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage {

  uid:any;
  countNoti:any;
  public items: Array<{id:string,username:string,img:string}> = [];
   constructor(
     private http: HttpClient,
     private router: Router,
     public loadingController: LoadingController,
     public alertController: AlertController,
     private storage: Storage,
     public toastController: ToastController
   ) {
     this.storage.get('user').then((val) => {
       this.uid=val.id;
       let id=this.uid;
       this.countNoti=  localStorage.getItem('countnoti');
     });
   }

   apiPath=environment.product;


  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
