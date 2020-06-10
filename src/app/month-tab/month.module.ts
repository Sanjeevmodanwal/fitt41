import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonthTabPage } from './month.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
  import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
   CalendarModule,
    RouterModule.forChild([{ path: '', component: MonthTabPage }]),
    NgCircleProgressModule.forRoot({
      "backgroundGradient": true,
      "backgroundColor": "#393939",
      "backgroundGradientStopColor": "#393939",
      "backgroundPadding": -10,
  })

  ],
  declarations: [MonthTabPage]
})
export class MonthTabPageModule {}
