import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss']
})
export class CommunityPage {
  comment: string;
  username:string;
  uid:any;
  profile_img:any;
  public items: Array<{username:string,post:string,time:string,uimg:string}> = [];
  public peoples: Array<{profile:string,id:any;username:string}> = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage,
  ) { 

    //  console.log(localStorage.getItem('username'));

    this.storage.get('user').then((val) => {
      console.log(val);
      this.username=val.first_name;
      this.uid=val.id;
      this.getpost(val.id);
      this.myinvite(val.id);
      if(val.profile_pic==null){
      }else{
        this.profile_img=val.profile_pic;
      }
    });
  }

  apiPath = environment.product;
  ngOnInit() {
    
  }

  async LoginAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  getpost(id){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), };
    this.http.post(this.apiPath + '/Post/getpost',{"id":id},httpOptions).subscribe((data: any) => {
       console.log(data);
       var rec=data.record;
       for(let i=0; i<rec.length; i++){
          this.items.push({
            uimg:rec[i].profile_pic,
            username:rec[i].first_name,
            post:rec[i].post,
            time:moment(rec[i].time).fromNow()
          });
       }
    });
  }

  submit() {
    if (this.comment==undefined) {
      let msg="please right something";
      this.LoginAlert(msg);
    }else if(this.comment==''){
      let msg="please right something";
      this.LoginAlert(msg);
    } else {
      let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath + '/Post/post', { "post": this.comment,"uid":this.uid}, httpOptions).subscribe((data: any) => {
        console.log(data);
        if(data.status==200){
           this.items.unshift({
             uimg:this.profile_img,
             username:this.username,
             post:this.comment,
             time:'Just now'
           });
           this.comment=" ";
        }
      });
    }
  }

  myinvite(id){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), };
    this.http.post(this.apiPath + '/Post/accept_req',{"id":id},httpOptions).subscribe((data: any) => {
      console.log(data);
      for(let i=0; i<data.length; i++){
        this.peoples.push({
          id:data[i].from_id,
          profile:data[i].profile_pic,
          username:data[i].first_name,
        });
      }
    });
  }

  // seepost(item){
  //   console.log(item);
  //   this.router.navigate(['/comment/',{"uid":item.id,"username":item.username}]);
  // }

}
