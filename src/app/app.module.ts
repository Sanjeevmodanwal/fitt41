import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsPageModule } from './tabs/tabs.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
// import { CalendarModule } from "ion2-calendar";
 import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClientModule }    from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CalendarModule } from "ion2-calendar";
//import { GooglePlus } from '@ionic-native/google-plus/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CalendarModule,
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule , 
    TabsPageModule,
    
   // Specify ng-circle-progress as an import
   NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
  })
  ],
  bootstrap: [AppComponent],
  providers: [
   // GooglePlus,
    DatePicker,
    Facebook,
   FileTransfer,
   File,
   Camera,
   Crop,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
})
export class AppModule {}
