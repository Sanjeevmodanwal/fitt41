import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassListingPage } from './class-listing.page';

const routes: Routes = [
  {
    path: '',
    component: ClassListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassListingPageRoutingModule {}
