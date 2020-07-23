import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';
import { Storage } from '@ionic/storage';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import * as moment from 'moment';
@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {

  steps: any;
  heart: any;
  distance: any;
  cal: any;
  act: any;
  bpm: any;
  date: any;
  mph: any;
  duration: any;
  hour: any;
  constructor(private health: Health, private storage: Storage) {


    this.health.isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health.requestAuthorization([
          'distance', 'nutrition','heart_rate','heart_rate.resting','heart_rate.variability', //read and write permissions
          {
            read: ['steps'],       //read only permission
            write: ['height', 'weight', 'heart_rate', 'blood_pressure', 'heart_rate.resting', 'heart_rate.variability']  //write only permission
          }
        ])
          .then(res => console.log(res))
          .catch(e => console.log(e));
      })

    var d = moment(new Date()).format('MM-DD-YYYY');
    var dt = d.split("-");
    // this.health.queryAggregated({
    //   startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'activity',
    // }).then(data => {
    //   console.log('activity', data);
    //   let blod = JSON.stringify(data, undefined, 2);
    //  // console.log("do under go",blod);
    //   var du=JSON.parse(blod)
    //  console.log("do distance",du.value.walking.distance);
    //  console.log("do duration",du.value.walking.duration);

    //   var me=JSON.parse(du.value);

    //   console.log("me distance",me);
    //   //this.do(data);
    // }).catch(e => {
    //   console.log("error " + e);
    // });



    // this.health.queryAggregated({
    //   startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'activity',
    //   bucket: 'days'
    // }).then(data => {
    //   console.log('activity days', data);

    //   //this.do(data);
    // }).catch(e => {
    //   console.log("error " + e);
    // });



    // this.health.queryAggregated({
    //   startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'activity',
    //   bucket: 'days'
    // }).then(data => {
    //   console.log('activity hour', data);
    //   this.activity(data);
    //   this.do(data);
    // }).catch(e => {
    //   console.log("error " + e);
    // });

    // this.health.query({
    //   startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'TBD',
    // }).then(data => {
    //   console.log('heart_rate.resting', data);
    //  // this.activity(data);
     
    // }).catch(e => {
    //   console.log("error heart_rate.resting" + e);
    // });




    // this.health.queryAggregated({
    //   startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'AGGREGATE_HEART_POINTS',
    // }).then(data => {
    //   console.log('AGGREGATE_HEART_POINTS', data);
    //  // this.activity(data);
     
    // }).catch(e => {
    //   console.log("error heart_rate.resting" + e);
    // });

    
    // this.health.queryAggregated({
    //   startDate: new Date(dt[0] + '-' + dt[1] + '-' + dt[2]), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'AGGREGATE_HEART_RATE_SUMMARY',
    // }).then(data => {
    //   console.log('heart_rate', data);
    //  // this.activity(data);
     
    // }).catch(e => {
    //   console.log("error heart_rate" + e);
    // });


    this.health.query({
      startDate: new Date(dt[0] + '-' + dt[1] + '-' + dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'TYPE_HEART_RATE_BPM',
    }).then(data => {
      console.log('TYPE_HEART_RATE_BPM', data);
  
     
    }).catch(e => {
      console.log("error heart_rate" + e);
    });



    this.health.query({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'resp_rate',
    }).then(data => {
     console.log("heart_rate",data);
    }).catch(e => {
      console.log("error " + e);
    });



    this.health.query({
      startDate: new Date(dt[0]+'-'+dt[1]+'-'+dt[2]), // three days ago
      endDate: new Date(), // now
      dataType: 'heart_rate.resting',
    }).then(data => {
     console.log("heart_rate",data);
    }).catch(e => {
      console.log("error " + e);
    });






    // this.health.queryAggregated({
    //   startDate: new Date(dt[0] + '-' + dt[1] + '-' + dt[2]), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'TYPE_HEART_RATE_BPM',
    // }).then(data => {
    //   console.log('TYPE_HEART_RATE_BPM', data);
    //  // this.activity(data);
     
    // }).catch(e => {
    //   console.log("error heart_rate" + e);
    // });


    // this.health.queryAggregated({
    //   startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
    //   endDate: new Date(), // now
    //   dataType: 'heart_rate.variability',
    // }).then(data => {
    //   console.log('heart_rate.variability', data);
    //  // this.activity(data);
     
    // }).catch(e => {
    //   console.log("error heart_rate.resting" + e);
    // });


  }


  // activity(data) {
  //   var CountAct = 0;
  //   var dis = 0
  //   var diff = 0;
  //   if (data.length > 0) {
  //     var num = [];
  //     var count = 0;
  //     for (let i = 0; i < data.length; i++) {
  //       let blod = JSON.stringify(data[i].value, undefined, 2);
  //       var du = JSON.parse(blod);
  //       console.log("du", du.walking);
  //       console.log("duration", du.walking.duration)

  //       if (typeof du.walking.duration !== 'undefined' && typeof du.walking.distance !== 'undefined') {
  //         console.log("diff+", diff += du.walking.duration);
  //         var seconds = Math.round(diff / 1000)

  //         var minutes = Math.round(diff / (1000 * 60));

  //         var hours = Math.round(diff / (1000 * 60 * 60));

  //         if (seconds < 60) {
  //           console.log("sec", seconds);
  //         } else if (minutes < 60) {
  //           console.log("min", minutes);
  //         } else if (hours < 24) {
  //           console.log("hr", hours);
  //         }
  //       }
  //     }
  //     // console.log("diff",diff);
  //     //console.log("num",num);
  //   }
  // }


  // do(data) {
  //   var CountAct = 0;
  //   var dis = 0
  //   var diff = 0;
  //   if (data.length > 0) {
  //     var num = [];
  //     var count = 0;
  //     for (let i = 0; i < data.length; i++) {
  //       let blod = JSON.stringify(data[i].value, undefined, 2);
  //       var du = JSON.parse(blod);
  //       if (typeof du.walking !== undefined) {
  //         console.log("under pass")
  //       } else if (typeof du.walking.duration !== undefined) {
  //         console.log("under pass duration")
  //         diff += du.walking.duration;
  //       } else {
  //         console.log("under pass duration")
  //       }
  //     }
  //     console.log("do diff", diff);
  //   }
  // }











  ngOnInit() {

  }





}
