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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  uid:any;
  
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
       this.noti(id);
       this.count_connection(id);
       this.count_workout(id);
     });
   }
   apiPath=environment.product;

   noti(id){ 
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/get_invite',{"id":id},httpOptions).subscribe((data: any) => {
        localStorage.setItem('countnoti', data.count);
        console.log(data.count);
      });
       
  }

  count_connection(id){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
    this.http.post(this.apiPath+'/Api/connect',{"id":id},httpOptions).subscribe((data: any) => {
     localStorage.setItem('connected', data);
      console.log("connected",data);
    });
  }

  count_workout(id){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
    this.http.post(this.apiPath+'/Workout/count_workout',{"id":id},httpOptions).subscribe((data: any) => {
     localStorage.setItem('workout', data);
      console.log("Workout",data);
    });
  }

 
}
