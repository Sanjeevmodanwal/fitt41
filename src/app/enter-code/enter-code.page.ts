import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'
@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.page.html',
  styleUrls: ['./enter-code.page.scss'],
})
export class EnterCodePage implements OnInit {
  date: string;
  type: 'string';
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'single',
    weekdays:['S', 'M', 'T', 'W', 'T', 'F', 'S']
  }; 
  constructor() { }

  ngOnInit() {
  }
  gotoNextField(nextElement) {
    nextElement.setFocus();
  }

  onChange($event) {
    console.log($event.Moment.d);
  }



}
