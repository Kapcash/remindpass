import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password.service';

@Component({
  selector: 'page-add-passwd',
  templateUrl: 'add-passwd.html'
})
export class AddPasswordPage {
  newPassword: Password;

  constructor (public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public passwordProvider: PasswordProvider) {
      this.newPassword = this.navParams.get('password');
      if (!this.newPassword) {
        this.newPassword = Password.createEmptyPassword();
      } else {
        this.newPassword.password = this.passwordProvider.decodePassword(this.newPassword.password);
      }
  }

  savePasswd () {
    this.newPassword.password = this.passwordProvider.encodePassword(this.newPassword.password);
    this.passwordProvider.addPassword(this.newPassword);
    this.dismiss(true);
  }

  dismiss (passwordCreated: boolean) {
    this.viewCtrl.dismiss({ 'passwordCreated': passwordCreated });
  }
}
