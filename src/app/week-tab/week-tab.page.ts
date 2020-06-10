import { Component } from '@angular/core';
 import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'app-week-tab',
  templateUrl: 'week-tab.page.html',
  styleUrls: ['week-tab.page.scss']
})
export class WeekTabPage {

    
  dateMulti: string[];
  type: 'string';
  

  constructor() {}

  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi'
  };
}
 