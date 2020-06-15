import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassNamePage } from './class-name.page';

const routes: Routes = [
  {
    path: '',
    component: ClassNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassNamePageRoutingModule {}
