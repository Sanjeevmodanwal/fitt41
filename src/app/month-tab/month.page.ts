import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';
import { Storage } from '@ionic/storage';
import { CalendarComponentOptions } from 'ion2-calendar'
import * as moment from 'moment';
@Component({
  selector: 'app-month',
  templateUrl: 'month.page.html',
  styleUrls: ['month.page.scss']
})
export class MonthTabPage {


  dateMulti: string[];
  type: 'string';
  cal: any;
  distance: any;
  hour:any;
  Redline:any;
  HardCore:any;
  Endrurance:any;
  fitness:any;
  warm:any;
  bpm:any
  Diastolic:any;
  showred:boolean=false;
  showhardcore:boolean=false;
  showend:boolean=false;
  showfitness:boolean=false;
  showwarm:boolean=false;
  mph:any;
  duration:any;
  date:any;
  act:any;
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'single',
    to: null
  };

  constructor(private health: Health, private storage: Storage) {
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
  ionViewWillEnter() {
    this.nonthdata()
  }

  nonthdata() {
    this.date=new Date();
    this.health.query({
      startDate:new Date('07-01-2020'), // three days ago
      endDate: new Date(), // now
      dataType: 'calories',
    }).then(data => {
      this.calories(data);
      console.log("Aggregated calories", data);
    }).catch(e => {
      console.log("error " + e);
    })

    this.health.query({
      startDate:new Date('07-01-2020'), // three days ago
      endDate: new Date(), // now
      dataType: 'distance',
    }).then(data => {
      this.discount(data);
      console.log("Aggregated calories", data);
    }).catch(e => {
      console.log("error " + e);
    })

    this.health.query({
      startDate:new Date('01-13-2020'), // three days ago
      endDate: new Date(), // now
      dataType: 'blood_pressure',
    }).then(data => {
      let blod = JSON.stringify(data, undefined, 2);
      console.log("blodjson", blod);
      //this.storage.set('calblood_pressureories', data);
      console.log('blood_pressure', data);
      this.bloodP(data);
      // this.calories(data);
    }).catch(e => {
      console.log("error " + e);
    });

    this.health.query({
      startDate:new Date('01-13-2020'), // three days ago
      endDate:new Date(), // now
      dataType: 'activity',
    }).then(data => {
      this.activity(data);
      console.log("activity", data);
    }).catch(e => {
      this.bpm=0;
      console.log("error " + e);
    })

  }

  calories(data) {
    var countCal = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        /// console.log("cal", data[i].value + "d[i]", data[i]);
        countCal += data[i].value;
      // this.cal = data[i].value;
      }
      this.cal = Math.round(countCal);
      console.log("count calories", this.cal);
    }
  }

  activity(data) {
    var CountAct = 0;
    var dis=0
    var diff=0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
      //  console.log("dis", data[i].distance + "  "+ "cal",data[i].calories);
        CountAct += data[i].calories;
        dis +=data[i].distance;
        var dt1 = new Date(data[i].startDate);
        var dt2 = new Date(data[i].endDate);
        diff +=(dt2.getTime() - dt1.getTime()) / 1000;
      }
      this.act = Math.round(CountAct);
      let mt=Math.round(dis);
      let km=mt/1000;
      let hr= Math.round(diff)/(60*60);
      let mp=km*0.62137/this.duration;
      this.mph=mp.toFixed(2);
      // console.log("mph",km*0.62137/hr)
      // console.log("count act calories", Math.round(CountAct));
      // console.log("count act distance", Math.round(dis));
      // console.log("time diffrenc", Math.round(diff));
      // console.log("hr", hr);
    }
  }

  discount(data) {
    var discount=0;
    var diff=0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        // console.log("dis", data[i].value + "d[i]", data[i]);
          discount += data[i].value;
          var dt1 = new Date(data[i].startDate);
          var dt2 = new Date(data[i].endDate);
          diff +=(dt2.getTime() - dt1.getTime()) / 1000;
      }
      this.duration=Math.round(diff/(60*60));
      this.distance = Math.round(discount);
      var meter=this.distance/1000;
      this.distance=meter.toFixed(2);
    }
  }

  bloodP(data) {
    var CountAct = 0;
    var bc;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.Diastolic=data[i].value.diastolic;
        this.bpm = data[i].value.systolic + "/" + data[i].value.diastolic + " " + "mmHg";
      }
      console.log("bc",this.Diastolic);
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
      
    }else{
      this.bpm =0;
    }
  }

   onChange($event) {
     console.log($event);
   
     var statdate=30*$event.oldMonth.months;
     var enddate=30*$event.newMonth.months;
    // console.log("new",$event.newMonth.months);
    // console.log("old",$event.oldMonth.months);
    if($event.newMonth.months==7){
     // console.log("strat");
      this.nonthdata();
    }else{
      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - statdate * 24 * 60 * 60 * 1000), // three days ago
        endDate: new Date(new Date().getTime() - enddate * 24 * 60 * 60 * 1000), // now
        dataType: 'distance',
        bucket: 'month'
      }).then(data => {
        this.discount(data);
        console.log("month distance", data);
      }).catch(e => {
        console.log("error " + e);
      })
  
  
      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - statdate * 24 * 60 * 60 * 1000), // three days ago
        endDate: new Date(new Date().getTime() - enddate * 24 * 60 * 60 * 1000), // now
        dataType: 'calories',
        bucket: 'month'
      }).then(data => {
        this.calories(data);
        console.log("month calories", data);
      }).catch(e => {
        console.log("error " + e);
      })
  
  
      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - statdate * 24 * 60 * 60 * 1000), // three days ago
        endDate: new Date(new Date().getTime() - enddate * 24 * 60 * 60 * 1000), // now
        dataType: 'blood_pressure',
        bucket: 'month'
      }).then(data => {
        this.bloodP(data);
        console.log("Aggregatedblood_pressure", data);
      }).catch(e => {
        console.log("error " + e);
      })
    }

  }

  ngOnInit() {
    console.log("ngOnInit",12%1);
    // this.Diastolic=120;
    // console.log("ngint",this.Diastolic)
    // if(this.Diastolic<=60){
    // //  console.log("WARM",this.Diastolic);
    //   this.showwarm=true;
    //   this.warm="WARM";
    // }if(this.Diastolic>60 && this.Diastolic<=80){
    //   //console.log("Fitness",this.Diastolic);
    //   this.showfitness=true;
    //   this.fitness="Fitness";
    // }if(this.Diastolic>80  && this.Diastolic<=100){
    //   console.log("Endurance",this.Diastolic);
    //   this.showend=true;
    //   this.Endrurance="Endurance";
    // }if(this.Diastolic>100 && this.Diastolic<=120){
    //   this.showhardcore=true;
    //   console.log("Hardcore",this.Diastolic);
    //   this.HardCore="Hardcore";
    // }if(this.Diastolic>120){
    //   console.log("Redline",this.Diastolic);
    //   this.showred=true;
    //   this.Redline="Redline";
    // }
  }

  


}
