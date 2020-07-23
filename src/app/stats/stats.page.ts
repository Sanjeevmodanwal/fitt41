import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {

  steps: any;
  heart: any;
  distance: any;
  hour:any;
  duration:any;
  cal: any;
  act: any;
  bpm: any;
  Redline:any;
  HardCore:any;
  Endrurance:any;
  fitness:any;
  warm:any;
  Diastolic:any;
  systolic:any;
  showred:boolean=false;
  showhardcore:boolean=false;
  showend:boolean=false;
  showfitness:boolean=false;
  showwarm:boolean=false;
  mph:any;
  constructor(private health: Health, private storage: Storage) {
    console.log("hit");
    this.health.isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health.requestAuthorization([
          'distance', 'nutrition',  //read and write permissions
          {
            read: ['steps'],       //read only permission
            write: ['height', 'weight', 'heart_rate', 'blood_pressure']  //write only permission
          }
        ])
          .then(res => console.log(res))
          .catch(e => console.log(e));
      })
  }

  stepcount(data) {
    var stpcount = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
      //  console.log("set", data[i].value + "d[i]", data[i]);
        stpcount += data[i].value;
      }
      this.steps = Math.round(stpcount);
    }
  }

  heartcount(data) {
    var hraetcount = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
         console.log("heart", data[i].value + "d[i]", data[i]);
        hraetcount++;
      }
      this.heart = hraetcount++;
      console.log("this.hrt", this.heart);
    }
  }

  // discount(data) {
  //   var discount = 0;
  //   var diff=0;
  //   if (data.length > 0) {
  //     for (let i = 0; i < data.length; i++) {
  //        discount += data[i].value;
  //         var dt1 = new Date(data[i].startDate);
  //         var dt2 = new Date(data[i].endDate);
  //         diff +=(dt2.getTime() - dt1.getTime()) / 1000;
  //     }
  //     var hour=Math.round(diff/(60*60));
  //     this.distance = Math.round(discount);
  //     var meter=this.distance/1000;
  //    // console.log("diff",diff/(60*60))
  //     console.log("dis meter",meter)
  //     // console.log("mph",meter/diff/(60*60));
  //     // console.log("mile",discount/diff/(60*60));
  //     console.log("mile/hour", meter*0.62137/hour);
  //    // let mp=meter*0.62137/hour;
  //   //  this.mph=mp.toFixed(2);
  //     this.distance=meter.toFixed(2);
  //     let mt=Math.round(discount);
  //     let km=mt/1000;
  //     let mp=km*0.62137/hour;
  //     this.mph=mp.toFixed(2);
  //   }
  // }

  // calories(data) {
  //   var countCal = 0;
  //   if (data.length > 0) {
  //     for (let i = 0; i < data.length; i++) {
  //       /// console.log("cal", data[i].value + "d[i]", data[i]);
  //       countCal += data[i].value;
  //    //  this.cal=data[i].value;
  //     }
  //     this.cal = Math.round(countCal);
  //     console.log("count calories", this.cal);
  //   }
  // }


  activity(data) {
    var CountAct = 0;
    var dis=0
    var diff=0;
    if (data.length > 0) {
      var num=[];
      var count=0;
      for (let i = 0; i < data.length; i++) {
        let blod = JSON.stringify(data[i].value, undefined, 2);
        var du=JSON.parse(blod);
        //console.log("du",du.walking);
        //console.log("duration",du.walking.duration)
       
        if(typeof du.walking.duration !=='undefined' && typeof du.walking.distance !=='undefined'){
            console.log("diff+", diff +=du.walking.duration);
            var seconds = Math.round(diff / 1000)

            var minutes = Math.round(diff / (1000 * 60));
    
            var hours = Math.round(diff / (1000 * 60 * 60));
    
            if (seconds < 60) {
              this.duration=seconds+"Sec";
          } else if (minutes < 60) {
            this.duration=minutes+"Min";
          } else if (hours < 24) {
            this.duration=hours+"Hrs";
          } 
        }
      }
    }
  }

  ngOnInit() {
  
  }

  bloodP(data) {
    var CountAct = 0;
    var bc;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        console.log("diastolic",data[i].value.diastolic);
        console.log("systolic",data[i].value.systolic)
        this.Diastolic=data[i].value.diastolic;
        this.systolic=data[i].value.systolic;
       // this.bpm = data[i].value.systolic + "/" + data[i].value.diastolic + " " + "mmHg";
      }
     // console.log("bc",this.Diastolic);
      if(this.Diastolic<=60){
        //  console.log("WARM",this.Diastolic);
          this.showwarm=true;
          this.warm="WARM Up";
        }if(this.Diastolic>60 && this.Diastolic<=80){
          //console.log("Fitness",this.Diastolic);
          this.showfitness=true;
          this.fitness="Fitness";
        }if(this.Diastolic>80  && this.Diastolic<=100){
          console.log("Endurance",this.Diastolic);
          this.showend=true;
          this.Endrurance="Endurance";
        }if(this.Diastolic>100 && this.Diastolic<=120){
          this.showhardcore=true;
          console.log("Hardcore",this.Diastolic);
          this.HardCore="Hardcore";
        }if(this.Diastolic>120){
          console.log("Redline",this.Diastolic);
          this.showred=true;
          this.Redline="Redline";
        }
    }
    this.bpm =0;
  }


 

  ionViewWillEnter() {
    this.healthData()
  }

  healthData() {
    var d=moment(new Date()).format('MM-DD-YYYY');
    var dt=d.split("-");
    this.health.query({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'heart_rate',
    }).then(data => {
      this.storage.set('heart', data);
      this.heartcount(data);
    }).catch(e => {
      console.log("error " + e);
    });


    this.health.query({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'steps',
    }).then(data => {
      this.storage.set('steps', data);
      this.stepcount(data);
      //this.steps =JSON.stringify(data, undefined, 2);
    }).catch(e => {
      console.log("error " + e);
    });


    this.health.queryAggregated({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'distance',
    }).then(data => {
      //console.log('distance', data);
      let dis = JSON.stringify(data, undefined, 2);
      var Distance=JSON.parse(dis)
     // console.log("json parse distance",Distance);
       var dt1 = new Date(Distance.startDate);
       var dt2 = new Date(Distance.endDate);
       var diff =(dt2.getTime() - dt1.getTime()) / 1000;
       var hr=Math.round(diff/(60*60));
       let mt=Math.round(Distance.value);
       let km=mt/1000;
       this.distance=(mt/1000).toFixed(2);
       this.mph=(km*0.62137/hr).toFixed(2);
     //  this.duration=hr+"Hr";
     // this.discount(data);
    }).catch(e => {
      console.log("error " + e);
    });


    this.health.queryAggregated({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'activity',
      bucket: 'hour'
    }).then(data => {
      console.log('activity', data);
      this.activity(data);
    }).catch(e => {
      console.log("error " + e);
    });


    this.health.queryAggregated({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'calories',
    }).then(data => {
      console.log('calories', data);
      let cal = JSON.stringify(data, undefined, 2);
      var Calor=JSON.parse(cal)
     // console.log("json parse Calor",Calor);
      this.cal=Math.round(Calor.value);
     // this.calories(data);
    }).catch(e => {
      console.log("error " + e);
    });


    this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'blood_pressure',
    }).then(data => {
      console.log(data);
     // let blod = JSON.stringify(data, undefined, 2);
     // var blodp=JSON.parse(blod)
     // console.log("blodjson", blod);
      //this.storage.set('calblood_pressureories', data);
     // console.log('systolic', blodp.value.systolic);
     // console.log('diastolic', blodp.value.diastolic);
     // this.bpm = blodp.value.systolic + "/" + blodp.value.diastolic + " " + "mmHg";
      this.bloodP(data);
      // this.calories(data);
    }).catch(e => {
      console.log("error " + e);
    });


    // this.health.store({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    //   // three minutes ago
    //   endDate: new Date(), // now
    //   dataType: 'activity',
    //   value: 'walking',
    //   sourceName: 'myApp',
    //   sourceBundleId: 'com.mag.fitt41'
    // }).then(data => {
    //   console.log("walking_store", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })






    // this.health.store({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    //   // three minutes ago
    //   endDate: new Date(), // now
    //   dataType: 'calories',
    //   value: '245.3',
    //   sourceName: 'myApp',
    //   sourceBundleId: 'com.mag.fitt41'
    // }).then(data => {
    //   console.log("calories_store", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })





    // this.health.store({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    //   // three minutes ago
    //   endDate: new Date(), // now
    //   dataType: 'steps',
    //   value: '34',
    //   sourceName: 'myApp',
    //   sourceBundleId: 'com.mag.fitt41'
    // }).then(data => {
    //   console.log("Store steps", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })

    // this.health.store({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    //   // three minutes ago
    //   endDate: new Date(), // now
    //   dataType: 'heart_rate',
    //   value: '66',
    //   sourceName: 'myApp',
    //   sourceBundleId: 'com.mag.fitt41'
    // }).then(data => {
    //   console.log("Store heart_rate", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })


    // this.health.store({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    //   // three minutes ago
    //   endDate: new Date(), // now
    //   dataType: 'distance',
    //   value: '101.2',
    //   sourceName: 'myApp',
    //   sourceBundleId: 'com.mag.fitt41'
    // }).then(data => {
    //   // this.distance=data[0].value
    //   console.log("Store distance", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })

    // this.health.queryAggregated({
    //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'steps',
    //   bucket: 'day'
    // }).then(data => {
    //   // this.distance=data[0].value
    //   console.log("Aggregated steps", data);
    // }).catch(e => {
    //   console.log("error " + e);
    // })

  }
}
