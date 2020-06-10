import { Component } from '@angular/core';
 import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'app-month',
  templateUrl: 'month.page.html',
  styleUrls: ['month.page.scss']
})
export class MonthTabPage {

    
  dateMulti: string[];
  type: 'string';
  

  constructor() {}

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
  
}
 