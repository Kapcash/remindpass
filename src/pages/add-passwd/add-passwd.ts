import { Component } from '@angular/core';

import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password.service';
import { IconListPage } from '../icon-list/icon-list';

import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-add-passwd',
  templateUrl: 'add-passwd.html'
})
export class AddPasswordPage {
  oldPassword: Password;
  // Local copy of the password to avoid reference side effects on previous page
  newPassword: Password;
  editing: boolean;

  constructor (public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    public passwordProvider: PasswordProvider) {
      this.oldPassword = this.navParams.get('password');
      this.editing = this.navParams.get('editing');
      this.newPassword = _.cloneDeep(this.oldPassword);
      if (this.oldPassword && this.editing) {
        // Decode the password to show it
        this.newPassword.password = this.passwordProvider.decodePassword(this.newPassword.password);
      } else {
        this.newPassword = Password.createEmptyPassword();
      }
  }

  async savePasswd () {
    if(this.editing) {
      // Reencode the password before updating it
      this.newPassword.password = this.passwordProvider.encodePassword(this.newPassword.password);
      this.updateOldReference(this.newPassword);
      await this.passwordProvider.updatePassword(this.newPassword);
    } else {
      await this.passwordProvider.addPassword(this.newPassword);
    }
    this.navCtrl.pop();
  }

  showIconList() {
    const iconsModal = this.modalCtrl.create(IconListPage);
    iconsModal.onDidDismiss((data) => {
      if(data.iconChosen) {
        this.newPassword.icon = data.iconChosen;
      }
    });
    iconsModal.present();
  }

  updateOldReference(newPassword: Password) {
    this.oldPassword.name = newPassword.name;
    this.oldPassword.username = newPassword.username;
    this.oldPassword.icon = newPassword.icon;
    this.oldPassword.password = newPassword.password;
    this.oldPassword.lastEdited = newPassword.lastEdited;
  }
}
