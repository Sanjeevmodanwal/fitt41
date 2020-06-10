import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-workout',
  templateUrl: 'weekly-workout.page.html',
  styleUrls: ['weekly-workout.page.scss']
})
export class WeeklyWorkoutPage {
 // date:any;
  constructor(private router: Router) {

  }

  cate(d){
    this.router.navigate(['/tabs/weeklyworkoutdetail/',{"id":d}]); 
  }

  

}
