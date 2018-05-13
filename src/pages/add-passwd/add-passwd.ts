import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password';


@Component({
  selector: 'page-add-passwd',
  templateUrl: 'add-passwd.html'
})
export class AddPasswdPage {
  selectedItem: Password;
  readonly: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public passwordProvider: PasswordProvider) {
      this.readonly = navParams.get('readonly');
      this.selectedItem = navParams.get('item');
      if (!this.selectedItem) {
        this.selectedItem = Password.createEmptyPassword();
      };
  }

  savePasswd() {
    this.passwordProvider.addPassword(this.selectedItem);
    this.viewCtrl.dismiss({'passwordCreated': true});
  }
}
