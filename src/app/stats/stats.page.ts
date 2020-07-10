import { Component } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage {
  
  steps: any;
  heart: any;
  distance: any;
  cal: any;
  act: any;
  bpm:any;
  hardcore=0.8;
  constructor(private health: Health, private storage: Storage) {
    this.health.isAvailable()
    .then((available: boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight', 'heart_rate','blood_pressure']  //write only permission
        }
      ])
        .then(res => console.log(res))
        .catch(e => console.log(e));
    })


  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'heart_rate',
  }).then(data => {
    this.storage.set('heart', data);
    this.heartcount(data);
  }).catch(e => {
    console.log("error " + e);
  });












  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'steps',
  }).then(data => {
    this.storage.set('steps', data);
    this.stepcount(data);
    //this.steps =JSON.stringify(data, undefined, 2);
  }).catch(e => {
    console.log("error " + e);
  });


  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'distance',
  }).then(data => {
    this.storage.set('distance', data);
    
    this.discount(data);
    // this.distance = JSON.stringify(data, undefined, 2);
  }).catch(e => {
    console.log("error " + e);
  });


  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'activity',
  }).then(data => {
    this.storage.set('activity', data);
    console.log('activity', data);
    this.activity(data);
  }).catch(e => {
    console.log("error " + e);
  });



  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'calories',
  }).then(data => {
    this.storage.set('calories', data);
    console.log('calories', data);
    this.calories(data);
  }).catch(e => {
    console.log("error " + e);
  });


  this.health.query({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'blood_pressure',
  }).then(data => {
    let blod =JSON.stringify(data, undefined, 2);
    console.log("blodjson",blod);
    //this.storage.set('calblood_pressureories', data);
    console.log('blood_pressure', data);
    this.bloodP(data);
    // this.calories(data);
  }).catch(e => {
    console.log("error " + e);
  });

  


  // this.health.store({
  //   startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
  //   // three minutes ago
  //   endDate: new Date(), // now
  //   dataType: 'blood_pressure',
  //   value: '{ systolic: 110, diastolic: 70 }',
  //   sourceName: 'myApp',
  //   sourceBundleId: 'com.mag.fitt41'
  // }).then(data => {
  //   console.log("systolic: 110, diastolic: 70", data);
   
  // }).catch(e => {
  //   console.log("error " + e);
  // })



  this.health.store({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    // three minutes ago
    endDate: new Date(), // now
    dataType: 'activity',
    value: 'walking',
    sourceName: 'myApp',
    sourceBundleId: 'com.mag.fitt41'
  }).then(data => {
    console.log("walking_store", data);
  }).catch(e => {
    console.log("error " + e);
  })






  this.health.store({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    // three minutes ago
    endDate: new Date(), // now
    dataType: 'calories',
    value: '245.3',
    sourceName: 'myApp',
    sourceBundleId: 'com.mag.fitt41'
  }).then(data => {
    console.log("calories_store", data);
  }).catch(e => {
    console.log("error " + e);
  })





  this.health.store({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    // three minutes ago
    endDate: new Date(), // now
    dataType: 'steps',
    value: '34',
    sourceName: 'myApp',
    sourceBundleId: 'com.mag.fitt41'
  }).then(data => {
    console.log("Store steps", data);
  }).catch(e => {
    console.log("error " + e);
  })

  this.health.store({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    // three minutes ago
    endDate: new Date(), // now
    dataType: 'heart_rate',
    value: '66',
    sourceName: 'myApp',
    sourceBundleId: 'com.mag.fitt41'
  }).then(data => {
    console.log("Store heart_rate", data);
  }).catch(e => {
    console.log("error " + e);
  })


  this.health.store({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    // three minutes ago
    endDate: new Date(), // now
    dataType: 'distance',
    value: '101.2',
    sourceName: 'myApp',
    sourceBundleId: 'com.mag.fitt41'
  }).then(data => {
    // this.distance=data[0].value
    console.log("Store distance", data);
  }).catch(e => {
    console.log("error " + e);
  })

  this.health.queryAggregated({
    startDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // three days ago
    endDate: new Date(), // now
    dataType: 'steps',
    bucket: 'day'
  }).then(data => {
    // this.distance=data[0].value
    console.log("Aggregated steps", data);
  }).catch(e => {
    console.log("error " + e);
  })

  }

  stepcount(data) {
    var stpcount = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        console.log("set", data[i].value + "d[i]", data[i]);
        stpcount += data[i].value;
      }
      this.steps = Math.round(stpcount);
    }
  }

  heartcount(data) {
    var hraetcount = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
       // console.log("dis", data[i].value + "d[i]", data[i]);
        hraetcount++;
      }
      this.heart = hraetcount++;
      console.log("this.hrt", this.heart);
    }
  }

  discount(data) {
    var discount = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
       // console.log("dis", data[i].value + "d[i]", data[i]);
        discount += data[i].value;
      }
      this.distance = Math.round(discount);
    }
  }

  calories(data) {
    var countCal = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
       /// console.log("cal", data[i].value + "d[i]", data[i]);
        countCal += data[i].value;
      }
      this.cal = Math.round(countCal);
      console.log("count calories", this.cal);
    }
  }


  activity(data) {
    var CountAct = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
       // console.log("actv", data[i].value + "d[i]", data[i]);
        CountAct += data[i].value;
      }
      this.act = Math.round(CountAct);
      console.log("count act calories", this.act);
    }
  }

  bloodP(data){
    var CountAct = 0;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        // console.log("pb",bp);
      //  console.log("systolic", data[i].value[0].systolic + "diastolic", data[i].value[1].diastolic);
        this.bpm= data[i].value.systolic+"/"+data[i].value.diastolic+" "+"mmHg";
      }
    }
  }
}
 