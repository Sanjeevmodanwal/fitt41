import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';
import { Storage } from '@ionic/storage';
import { CalendarComponentOptions } from 'ion2-calendar'
import * as moment from 'moment';
@Component({
  selector: 'app-week-tab',
  templateUrl: 'week-tab.page.html',
  styleUrls: ['week-tab.page.scss']
})
export class WeekTabPage {


  dateMulti: string[];
  type: 'string';
  cal: any;
  distance: any;
  hour:any;
  Redline: any;
  HardCore: any;
  Endrurance: any;
  fitness: any;
  warm: any;
  bpm: any
  act:any;
  Diastolic: any;
  showred: boolean = false;
  showhardcore: boolean = false;
  showend: boolean = false;
  showfitness: boolean = false;
  showwarm: boolean = false;
  mph:any;
  duration:any;

  constructor(private health: Health, private storage: Storage) {
  //  Moment('12:16','HH:mm').minutes();
  //  console.log("monet",moment('Tue Jul 14 2020 19:27:26').startOf('hour').fromNow());
 
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

   FormDate='2020-07-01';
   EndDate="2020-07-06";
  date: {
    from: string
    to: string
  } = {
    from:this.FormDate,
    to:this.EndDate
  };

  optionsRange: CalendarComponentOptions = {
    from: new Date(this.FormDate),
   // from: new Date(2020, 6, 1),
    pickMode: 'range',
    disableWeeks: [0, 2, 3, 4, 5, 6]
  };

  // optionsMulti: CalendarComponentOptions = {
  //   pickMode: 'single',
  //   from: new Date(2020, 6, 1),
  //   to: 0,
  //   disableWeeks: [0, 2, 3, 4, 5, 6],
  //   daysConfig:[]
  // };

  ionViewWillEnter() {
    this.weekhealtdata()
  }

  weekhealtdata() {

    this.health.query({
      startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'calories',
    }).then(data => {
      this.calories(data);
      console.log("Aggregated calories", data);
    }).catch(e => {
      console.log("error " + e);
    })

    this.health.query({
      startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'distance',
    }).then(data => {
      this.discount(data);
      console.log("distance", data);
    }).catch(e => {
      console.log("error " + e);
    })

    this.health.query({
      startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), // now
      dataType: 'blood_pressure',
    }).then(data => {
      let blod = JSON.stringify(data, undefined, 2);
    //  console.log("blodjson", blod);
      //this.storage.set('calblood_pressureories', data);
      console.log('blood_pressure', data);
      this.bloodP(data);
      // this.calories(data);
    }).catch(e => {
      console.log("error " + e);
    });

   

  }

  calories(data) {
    var countCal = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        countCal += data[i].value;
      }
      this.cal = Math.round(countCal);
      console.log("count calories", this.cal);
    }
  }
 
  discount(data) {
    var discount = 0;
    var diff=0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        discount += data[i].value;
        var dt1 = new Date(data[i].startDate);
        var dt2 = new Date(data[i].endDate);
        diff +=(dt2.getTime() - dt1.getTime()) / 1000;
        
      }
      this.duration=Math.round(diff/(60*60));
      this.distance = Math.round(discount);
      var meter=this.distance/1000;
     // console.log("diff",diff/(60*60))
     // console.log("meter",meter)
     // console.log("mph",meter/diff/(60*60));
      //console.log("mile",discount/diff/(60*60));
    //  console.log("mile/hour", meter*0.62137/this.duration);
     // let mp=meter*0.62137/this.duration;
     // this.mph=mp.toFixed(2);
      this.distance=meter.toFixed(2);
      // console.log("hour",this.hour[1])
      // console.log("mph",this.distance%this.hour[1]);
      // if(mp>1){
      //   this.mph=mp;
      // }else{
      //   this.mph=0;
      // }
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
      console.log("amph",km*0.62137/hr)
      console.log("count act calories", Math.round(CountAct));
      console.log("count act distance", Math.round(dis));
      console.log("time diffrenc", Math.round(diff));
      console.log("hr", hr);
    }
  }



  bloodP(data) {
    var CountAct = 0;
    var bc;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.Diastolic = data[i].value.diastolic;
        this.bpm = data[i].value.systolic + "/" + data[i].value.diastolic + " " + "mmHg";
      }
      console.log("bpm",this.bpm);

      console.log("bc", this.Diastolic);
      if (this.Diastolic <= 60) {
        //  console.log("WARM",this.Diastolic);
        this.showwarm = true;
        this.warm = "WARM Up";
      } if (this.Diastolic > 60 && this.Diastolic <= 80) {
        //console.log("Fitness",this.Diastolic);
        this.showfitness = true;
        this.fitness = "Fitness";
      } if (this.Diastolic > 80 && this.Diastolic <= 100) {
        console.log("Endurance", this.Diastolic);
        this.showend = true;
        this.Endrurance = "Endurance";
      } if (this.Diastolic > 100 && this.Diastolic <= 120) {
        this.showhardcore = true;
        console.log("Hardcore", this.Diastolic);
        this.HardCore = "Hardcore";
      } if (this.Diastolic > 120) {
        console.log("Redline", this.Diastolic);
        this.showred = true;
        this.Redline = "Redline";
      }

    }
  }

  ngOnInit() {
    console.log("ngOnInit",12%1);
    // this.Diastolic=120;
    // console.log("ngint",this.Diastolic)
    // if(this.Diastolic<60){
    // //  console.log("WARM",this.Diastolic);
    //   this.showwarm=true;
    //   this.warm="WARM";
    // }if(this.Diastolic>60 && this.Diastolic<=80){
    //   //console.log("Fitness",this.Diastolic);
    //   this.showfitness=true;
    //   this.fitness="Fitness";
    // }if(this.Diastolic>100  && this.Diastolic<=120){
    //   console.log("Endurance",this.Diastolic);
    //   this.showend=true;
    //   this.Endrurance="Endurance";
    // }if(this.Diastolic>=120 && this.Diastolic<160){
    //   this.showhardcore=true;
    //   console.log("Hardcore",this.Diastolic);
    //   this.HardCore="Hardcore";
    // }if(this.Diastolic>120){
    //   console.log("Redline",this.Diastolic);
    //   this.showred=true;
    //   this.Redline="Redline";
    // }
  }

  sd:any;
  end:any;
  onChange($event) {
    console.log($event);
   // var date = $event.format('DD-MM-YYYY');
    var date = $event.from.format('MM-DD-YYYY'); //single date select intity
  //  console.log(date);
   // let _daysConfig: DayConfig[] = [];
   // var date=JSON.stringify($event.from, undefined, 2);
    // var stdate=moment(date).format('MM-DD-YYYY');
   // console.log("start",stdate);
    var dt=date.split("-");
    var ed=+dt[1]+ +6;
    this.sd=dt[1];
    this.end=ed;
    //var stdate=moment(date).format('MM-DD-YYYY');
   // console.log("stdate",stdate);
   this.FormDate=date;
   this.EndDate=dt[0]+'-'+ed+'-'+dt[2];
    console.log("from date", this.FormDate);
    console.log("end date",this.EndDate);
    this.health.query({
      startDate:new Date(date), // three days ago
      endDate:new Date(dt[0]+'-'+ed+'-'+dt[2]), // now
      dataType: 'distance',
    }).then(data => {
      this.discount(data);
      console.log("distance", data);
    }).catch(e => {
      this.distance =0;
      console.log("error " + e);
    })


    this.health.query({
      startDate:new Date(date), // three days ago
      endDate:new Date(dt[0]+'-'+ed+'-'+dt[2]), // now
      dataType: 'calories',
    }).then(data => {
      this.calories(data);
     console.log("calories", data);
    }).catch(e => {
      this.cal=0;
      console.log("error " + e);
    })


    this.health.query({
      startDate:new Date(date), // three days ago
      endDate:new Date(dt[0]+'-'+ed+'-'+dt[2]), // now
      dataType: 'blood_pressure',
    }).then(data => {
      this.bloodP(data);
      console.log("Aggregatedblood_pressure", data);
    }).catch(e => {
      this.bpm=0;
      console.log("error " + e);
    })

    this.health.query({
      startDate:new Date(date), // three days ago
      endDate:new Date(dt[0]+'-'+ed+'-'+dt[2]), // now
      dataType: 'activity',
    }).then(data => {
      this.activity(data);
      console.log("activity", data);
    }).catch(e => {
      this.bpm=0;
      console.log("error " + e);
    })



   
  }


  getFirstMonday(){
    var d = new Date(),
        month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }
    return mondays[0]
  }

  // onChange($event) {
  //  // var d = $event.format('DD-MM-YYYY');
  //  // var date = d.split("-");
  //   console.log("console.log",$event.from.format('DD-MM-YYYY'));
  //   var date=JSON.stringify($event.from, undefined, 2);
  //  //  var stdate=moment(new Date(date)).format('MM-DD-YYYY');
  // // var d=new Date(date);
  //  //  console.log("date",stdate);
  //  // console.log("start",stdate);
  // }

  // onChange($event) {
  //   console.log($event)
  // }

}
