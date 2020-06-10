import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppleConnectPageRoutingModule } from './apple-connect-routing.module';

import { AppleConnectPage } from './apple-connect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppleConnectPageRoutingModule
  ],
  declarations: [AppleConnectPage]
})
export class AppleConnectPageModule {}
