import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RunningPage } from './running.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: RunningPage }]),
    NgCircleProgressModule.forRoot({
    // radius: 100,
    // outerStrokeWidth: 8,
    // innerStrokeWidth: 8,
    // outerStrokeColor: "#78C000",
    // innerStrokeColor: "#1e1e1e",
    // animationDuration: 300,
  })

  ],
  declarations: [RunningPage]
})
export class RunningPageModule {}
