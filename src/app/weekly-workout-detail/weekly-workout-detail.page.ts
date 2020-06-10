import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController,ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
import * as moment from 'moment';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-weekly-workout-detail',
  templateUrl: 'weekly-workout-detail.page.html',
  styleUrls: ['weekly-workout-detail.page.scss']
})
export class WeeklyWorkoutDetailPage {
 uid:any;
 set:any;
 rep:any;
 weight:any;
 AddBtn:boolean=true;
 showInput:boolean=false;
 cateid:any;
 date: String = new Date().toISOString();
 public items: Array<{id:string,set:string,rep:string,weight:any}> = [];
 public workouts: Array<{id:string,set:string,rep}> = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private datePicker: DatePicker,
    public toastController: ToastController
  ) {
   
    this.storage.get('user').then((val) => {
      this.uid=val.id;
      let id=this.uid;
      this.getTodayWorkout(id);
     
      // console.log(this.date);
    });
  }

  ngOnInit() {
    this.cateid = this.activatedRoute.snapshot.paramMap.get('id');
 }

 async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000,
    position:'top'
  });
  toast.present();
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

 getdate(event){
  this.date=event.detail.value;
  console.log(this.date);
} 

  apiPath=environment.product;

  getTodayWorkout(id){
    this.presentLoadingWithOptions();
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Workout/getTodayworkout',{"id":this.uid,"cate_id":this.cateid},httpOptions).subscribe((data: any) => {
         console.log(data);
        var rec=data.record;
         if(data.status==200){
            this.loadingController.dismiss('profile');
          for(let i=0; i<rec.length; i++){
            this.items.push({
               id:rec[i].lid,
               set:rec[i].set_weight,
               rep:rec[i].rep,
               weight:rec[i].weight
            });
          }
         }
      });
  }

  addworkout(){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
      this.http.post(this.apiPath+'/Workout/add',{"cate_id":this.cateid,"date":this.date,"uid":this.uid,"set":this.set,"rep":this.rep,"weight":this.weight},httpOptions).subscribe((data: any) => {
         if(data.status==200){
           this.items.push({
             id:data.lid,
             set:this.set,
             rep:this.rep,
             weight:this.weight
           });
           this.set="";
           this.rep="";
           this.weight="";
           this.showInput=false;
           this.AddBtn=true;
         }
      });
  }

  // getworkout(id){
  //   // alert("me");
  //    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
  //      this.http.post(this.apiPath+'/Workout/getworkout',{"id":this.uid,"cate_id":this.cateid},httpOptions).subscribe((data: any) => {
  //         console.log(data);
  //        var rec=data.record;
  //         if(data.status==200){
  //          for(let i=0; i<rec.length; i++){
  //            this.workouts.push({
  //               id:rec[i].lid,
  //               set:rec[i].set_weight,
  //               rep:rec[i].rep,  
  //            });
  //          }
  //         }
  //      });
  //  }

  show(){
    this.AddBtn=false;
    this.showInput=true;
  }

  picDate(){
  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  }).then(
    date =>{
      let dt= date.getDate()
      console.log("mydatte",dt);
      this.search(dt)
    },
    err => console.log('Error occurred while getting date: ', err)
  );
 }

 search(date){
  this.presentLoadingWithOptions();
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}), };
  this.http.post(this.apiPath+'/Workout/search',{"cate_id":this.cateid,"date":date,"uid":this.uid},httpOptions).subscribe((data: any) => {
     if(data.status==200){
       this.items=[];
      this.loadingController.dismiss('profile');
         var rec=data.record;
          for(let i=0; i<rec.length; i++){
            this.items.push({
              id:rec[i].lid,
              set:rec[i].set_weight,
              rep:rec[i].rep,
              weight:rec[i].weight
           });
           }
     }else if(data.status==500){
      this.items=[];
        //let msg=data.msg;
        //this.presentToast(msg);
       this.loadingController.dismiss('profile');
    
     }
  });
 }
  

}
