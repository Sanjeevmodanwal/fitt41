import { Component } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {

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
 
console.log(mondays[0]);
  
  
   // var date=moment(mondays[0]).format('MM-DD-YYYY');
   var date=moment(new Date());
   // console.log("date",date);
    // var dt=date.split("-");
    // var st='01';
  //   var et=+dt[1]+ +6;
   //  var en=new Date(dt[0]+'-'+et+'-'+dt[2]);
   // var en=new Date(dt[0]+'-'+et+'-'+dt[2]);
   // console.log("sd",sd,"ed",en);
    // console.log("from",new Date(Date.now() + 24 * 60 * 60 * 1000 *1));
   
    // console.log("to",new Date(Date.now() + 24 * 60 * 60 * 1000 * 6));

     console.log("end date",date);
     console.log("new date",new Date());
   //  console.log("sto date",new Date(mondays[0]));

  //  var data=[{'name':'anshu'},{'name':'akrosh'},{},{'name':'beenu'}];

  //  for(let i=0; i<data.length; i++){
  //    console.log("name",data[i].name);
  //  }

 
    
  }

  
  

}
