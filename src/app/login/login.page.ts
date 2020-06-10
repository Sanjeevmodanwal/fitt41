import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment.prod';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // @ViewChild('slides')slider:any;
  email: string;
  pass: string;
  name = ["George", "Kalle", "Canelo", "Chavez"];
  constructor(public navCtrl: NavController,
    private fb: Facebook,
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController: AlertController,
  //  private googlePlus: GooglePlus
  ) { }
  // getNext(){
  //   this.slider.slideNext() 
  // }
  //  getPrev(){
  //   this.slider.slidePrev()
  // }
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  apiPath=environment.product;
  ngOnInit() {
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      id: 'login'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async LoginAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }



  fbclick() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      .catch(e => console.log('Error logging into Facebook', e));
      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  login() {
    if (this.email && this.pass) {
      this.presentLoadingWithOptions();
      this.http.post(this.apiPath+'/Api/login', { "email": this.email, "password": this.pass }).subscribe((data: any) => {
        console.log(data)
        if (data.status == 200) {
          this.storage.set('user', data.user);
          this.loadingController.dismiss();
          this.router.navigate(['/tabs/']);
        } else {
          this.loadingController.dismiss();
          let msg = data.msg;
          this.LoginAlert(msg);
        }
      });
    }else{
      let msg="please fill all fileds"
      this.LoginAlert(msg);
    }
  }


}
