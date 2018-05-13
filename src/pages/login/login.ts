import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  auth() {
    // TODO: Use TouchID or pin code
    this.viewCtrl.dismiss({'isAuthenticated': true});
  }
}
