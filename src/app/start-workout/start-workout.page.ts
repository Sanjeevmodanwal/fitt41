import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-start-workout',
  templateUrl: 'start-workout.page.html',
  styleUrls: ['start-workout.page.scss']
})
export class StartWorkoutPage {
  

  // progress = 0;
  // timerHandler: number;
  // progressText = "Ready";

  constructor(public navCtrl: NavController , public ngGarph: NgCircleProgressModule ) {}
  // stop() {
  //   if (this.timerHandler) {
  //     window.clearInterval(this.timerHandler);
  //     this.timerHandler = 0;
  //   }
  // }
  // start() {
  //   this.stop();
  //   this.progress = 0;
  //   this.progressText = "Started";
  //   this.timerHandler = window.setInterval(() => {
  //     this.progress += Math.random() * 5;
  //     if (this.progress >= 50) {
  //       this.progressText = "Please stay tuned.";
  //     }
  //     if (this.progress >= 60) {
  //       this.progress = 60;
  //       this.progressText = "Complete"
  //       this.stop();
  //     }
  //   }, 100);
  // }
  formatSubtitle = (percent: number) : string => {
    if(percent >= 100){
      return "Congratulations!"
    }else if(percent >= 50){
      return "Half"
    }else if(percent > 0){
      return "Just began"
    }else {
      return "Not started"
    }
  }
}
 