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
  selector: 'app-invite-people',
  templateUrl: 'invite-people.page.html',
  styleUrls: ['invite-people.page.scss']
})
export class InvitePeoplePage {
 uid:any;
 SendList=true;
 FetchList:boolean=false;
 count:any;
 invitePeople:boolean=true;
 paddingreq:boolean=false;
 Accepted:boolean=false;
 public items: Array<{id:string,username:string,img:string,status:any}> = [];
 public requests: Array<{id:string,username:string,img:string}> = [];
 public accepts: Array<{id:string,username:string,img:string}> = [];
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
      this.getuser(id);
      this.pendingReq(id);
      this.acceptReq(id);
    });
  }
  apiPath=environment.product;

  ngOnInit() {
   
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  getuser(d){
     let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/get_users',{"id":d},httpOptions).subscribe((data: any) => {
         console.log("getusers",data);
         for(let i=0; i<data.length; i++){
           this.items.push({
             id:data[i].id,
             username:data[i].first_name,
             img:data[i].profile_pic,
             status:0
           });
         }
      });
  }

  invite(item){
    var index=this.items.findIndex(pro => pro.id ==item.id);
    this.items[index].status=1;
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/invite',{"id":this.uid,"from_id":item.id},httpOptions).subscribe((data: any) => {
        if(data.status==200){
          let msg=data.msg;
          let color='success'
           this.presentToast(msg,color);
        }else if(data.status==500){
          let msg=data.msg;
          let color='danger'
          this.presentToast(msg,color);
        } 
      });
  }

  pendingReq(id){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/getpendingReq',{"id":this.uid},httpOptions).subscribe((data: any) => {
         console.log(data);
         var rec=data.data;
         this.count=data.count;
         for(let i=0; i<rec.length; i++){
          this.requests.push({
            id:rec[i].id,
            username:rec[i].first_name,
            img:rec[i].profile_pic,
          });
        }
      });
  }

  acceptReq(d){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Api/acceptReq',{"id":d},httpOptions).subscribe((data: any) => {
         console.log(data);
         var rec=data.data;
         this.count=data.count;
         for(let i=0; i<rec.length; i++){
          this.accepts.push({
            id:rec[i].id,
            username:rec[i].first_name,
            img:rec[i].profile_pic,
          });
        }
      });
  }

  show(){
    this.SendList=false;
    this.FetchList=true;
  }

  back(){
    this.SendList=true;
    this.FetchList=false;
  }

  InvitePeople(){
    this.invitePeople=true;
    this.paddingreq=false;
    this.Accepted=false;
  }

  PendingReq(){
    this.invitePeople=false;
    this.paddingreq=true;
    this.Accepted=false;
  }

  AcceptReq(){
    this.invitePeople=false;
    this.paddingreq=false;
    this.Accepted=true;
  }

}
