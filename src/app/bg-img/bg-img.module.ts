import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgImgPageRoutingModule } from './bg-img-routing.module';

import { BgImgPage } from './bg-img.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgImgPageRoutingModule
  ],
  declarations: [BgImgPage]
})
export class BgImgPageModule {}
