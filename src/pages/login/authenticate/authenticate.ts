import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html'
})
export class AuthenticatePage {

  public rootPassword: string;
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public auth: AuthProvider, public toastCtrl: ToastController, public translate: TranslateService) {
  }

  /**
   * Ask for a fingerprint authentication
   * Show the native popup
   */
  askFingerPrint() {
    this.auth.askFingerPrint()
      .then((res) => {
        this.viewCtrl.dismiss();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  authenticate() {
    // if (this.rootPassword) {
    //   this.auth.isGoodRootPassword(this.rootPassword).then((isCorrect) => {
    //     if (isCorrect) {
          this.viewCtrl.dismiss();
    //     } else {
    //       this.toastWrongPassword();
    //     }
    //   });
    // } else {
    //   this.toastWrongPassword();
    // }
  }

  toastWrongPassword() {
    this.toastCtrl.create({
      message: this.translate.instant('errors.wrongPassword'),
      duration: 1500
    }).present();
  }
}
