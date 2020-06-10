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
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  uid:any;
  public items: Array<{id:string,username:string,img:string,accept:any;}> = [];
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
     });
   }
   apiPath=environment.product;

  ngOnInit() {
  }

  noti(d){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/get_invite',{"id":this.uid},httpOptions).subscribe((data: any) => {
        var record=data.user;
        this.items=[];
        for(let i=0; i<record.length;i++){
           this.items.push({
             id:record[i].id,
             username:record[i].first_name,
             img:record[i].profile_pic,
             accept:record[i].accept
           });
        }
      });
  }

  accept(d){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/accept',{"id":d,"accept":1},httpOptions).subscribe((data: any) => {
          if(data.status==200){
            let id=this.uid;
            this.noti(id);
          }
      }); 
  }

  back(){
    this.router.navigate(['/tabs/tab1']);
  }

}
