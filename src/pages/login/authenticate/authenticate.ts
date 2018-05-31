import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html'
})
export class AuthenticatePage {

  public rootPassword: string;
  public submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public auth: AuthProvider) {
  }

  authenticate() {
    // TODO: Use TouchID or pin code
    if (this.rootPassword) {
      this.auth.isGoodRootPassword(this.rootPassword).then((isCorrect) => {
        if(isCorrect) {
          this.viewCtrl.dismiss({ 'isAuthenticated': true });
        }
      });
    } else {
      // this.viewCtrl.dismiss({ 'isAuthenticated': true });
    }
  }
}
