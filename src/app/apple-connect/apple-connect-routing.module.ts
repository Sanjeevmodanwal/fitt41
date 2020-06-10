import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppleConnectPage } from './apple-connect.page';

const routes: Routes = [
  {
    path: '',
    component: AppleConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppleConnectPageRoutingModule {}
