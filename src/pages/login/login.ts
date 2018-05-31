import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public registerNewPassword: boolean = false;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public auth: AuthProvider) {
    this.auth.rootPasswordExists().then((exists) => {
      if (!exists) {
        this.registerNewPassword = true;
      }
    });
  }
}
