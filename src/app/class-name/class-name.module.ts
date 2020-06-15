import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassNamePageRoutingModule } from './class-name-routing.module';

import { ClassNamePage } from './class-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassNamePageRoutingModule
  ],
  declarations: [ClassNamePage]
})
export class ClassNamePageModule {}
