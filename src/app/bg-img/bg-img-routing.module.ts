import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgImgPage } from './bg-img.page';

const routes: Routes = [
  {
    path: '',
    component: BgImgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgImgPageRoutingModule {}
