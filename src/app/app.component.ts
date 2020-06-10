import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
    this.checktoken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      if(this.platform.is('android')) {
        this.statusBar.styleLightContent();
      }
    });
  }

  checktoken(){
    this.storage.get('user').then((val) => {
       if(val==null){
         this.router.navigate(['/login']);
       }else{
        this.router.navigate(['/tabs']);        
       }
    });
  }

}
