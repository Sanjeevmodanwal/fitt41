import { Component, ViewChild , Directive, ElementRef, Input, OnChanges} from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-garph',
  templateUrl: 'garph.page.html',
  styleUrls: ['garph.page.scss']
})
export class GarphPage {

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  @ViewChild('barChart', {static: true}) barChart; 
  @ViewChild('yearChart', {static: true}) yearChart;
  @ViewChild('weekChart', {static: true}) weekChart;
  @ViewChild('todayChart', {static: true}) todayChart;


  
  bars: any;
  yearCharts: any;
  weekCharts: any;
  todayCharts: any;

  colorArray: any;
  target: any;
  segment: any;
  @Input() shadowCustomCss: string;
  ngOnChanges(): void {
    const shadow = this.el.nativeElement.shadowRoot || this.el.nativeElement.attachShadow({ mode: 'open' });
    if (shadow) {
      let innerHTML = '';
      innerHTML += '<style>';
      innerHTML += this.shadowCustomCss;
      innerHTML += '</style>';
      shadow.innerHTML += innerHTML;
    }
  }

  constructor(public navCtrl: NavController, private el: ElementRef) {
    this.target = "alltime";
   
  }

  ionViewDidEnter() {
    this.createBarChart();
    this.createYearChart();
    this.createWeekChart();
    this.createTodayChart();
  } 

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], 
        datasets: [{
          label: '',
          data: [250, 200, 220, 240, 290, 250], 
          backgroundColor: 'transparent', // array should have same number of elements as number of dataset
          borderColor: 'rgb(72, 125, 209)',// array should have same number of elements as number of dataset
          borderWidth: 4,
          pointBorderColor: 'rgb(207, 207, 207)',
          pointStyle: 'circle',
          pointBorderWidth: 4,
          pointRadius: 4,
        }], 
      },
      options: {
        legend: {
          display: false //This will do the task
       },
        scales: {
          yAxes: [{
            ticks: {
              min: 200,
              max: 300,
              stepSize: 20,
            } 
          }]
        }
      }
    });
  }

  createYearChart() {
    this.yearCharts = new Chart(this.yearChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], 
        datasets: [{
          // label: '',
          data: [200, 210, 250, 230, 280, 300],
          backgroundColor: 'transparent', 
          borderColor: 'rgb(72, 125, 209)',
          borderWidth: 4,
          pointBorderColor: 'rgb(207, 207, 207)',
          pointStyle: 'circle',
          pointBorderWidth: 4,
          pointRadius: 4,
        }], 
      },
      options: {
        legend: {
          display: false //This will do the task
       },
        scales: {
          yAxes: [{
            ticks: {
              min: 200,
              max: 300,
              stepSize: 20 
            }
          }]
        }
      }
    });
  }


  createWeekChart() {
    this.weekCharts = new Chart(this.weekChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], 
        datasets: [{
          // label: '',
          data: [300, 250, 300, 200, 280, 300],
          backgroundColor: 'transparent', 
          borderColor: 'rgb(72, 125, 209)',
          borderWidth: 4,
          pointBorderColor: 'rgb(207, 207, 207)',
          pointStyle: 'circle',
          pointBorderWidth: 4,
          pointRadius: 4,
        }], 
      },
      options: {
        legend: {
          display: false //This will do the task
       },
        scales: {
          yAxes: [{
            ticks: {
              min: 200,
              max: 300,
              stepSize: 20 
            }
          }]
        }
      }
    });
  }
  

  createTodayChart() {
    this.todayCharts = new Chart(this.todayChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], 
        datasets: [{
           label: '',
          data: [230, 250, 200, 280, 260, 300],
          backgroundColor: 'transparent', 
          borderColor: 'rgb(72, 125, 209)',
          borderWidth: 4,
          pointBorderColor: 'rgb(207, 207, 207)',
          pointStyle: 'circle',
          pointBorderWidth: 4,
          pointRadius: 4,
        }], 
      },
      options: {
        legend: {
          display: false //This will do the task
       },
        scales: {
          yAxes: [{
            ticks: {
              min: 200,
              max: 300,
              stepSize: 20 
            }
          }]
        }
      }
    });
  }


}
