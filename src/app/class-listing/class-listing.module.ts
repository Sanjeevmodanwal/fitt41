import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassListingPageRoutingModule } from './class-listing-routing.module';

import { ClassListingPage } from './class-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassListingPageRoutingModule
  ],
  declarations: [ClassListingPage]
})
export class ClassListingPageModule {}
