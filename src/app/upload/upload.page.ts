import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  croppedImagepath = "";
  uid: any;
  num:any;
  show:boolean=false;
  constructor(
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController) {
    this.storage.get('user').then((val) => {
      console.log(val);
      this.uid = val.id;
      
    });
  }

  ngOnInit() {
   
     this.croppedImagepath =this.activatedRoute.snapshot.paramMap.get('img');
     
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 3000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      id: 'user'
    });
    return await loading.present();
    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'middle',
      color: color,
    });
    toast.present();
  }




  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cropImage(imageData)
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.show = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      // this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      // this.isLoading = false;
    });
  }

  uploadImage() {

    console.log("crop", this.croppedImagepath);
    this.presentLoadingWithOptions();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'myFile',
      fileName: "myImage_" + random + ".jpg",
      params: { "id": this.uid },
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.croppedImagepath, 'https://www.mag-studios.com/Fitt41/Api/upload', options)
      .then((data) => {
        console.log(data);
        this.loadingController.dismiss('child');
        let msg = "upload image Successfully";
        let color = 'success';
        this.presentToast(msg, color);
        //this.router.navigate(['/tabs/profilepage']);
      }, (err) => {
        console.log(err);
        alert("Error");
      });
  }

  bck(){
    this.router.navigate(['/tabs/profilepage']);
  }


}
