import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PasswdDetailsPage } from '../passwd-details/passwd-details';
import { PasswordProvider } from '../../providers/password/password.service';
import { AddPasswordPage } from '../add-passwd/add-passwd';
import { Password } from '../../models/password';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-list-passwd',
  templateUrl: 'list-passwd.html'
})
export class ListPasswordPage {
  icons: Array<string>;
  isLoggedIn = true;
  searchFilter: string;
  passwords: Promise<Array<Password>>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public passwordProvider: PasswordProvider) {
  }

  ionViewWillEnter() {
    this.passwords = this.passwordProvider.getPasswords();
  }

  /**
   * Open the details modal to display password information
   * @param event Click event
   * @param item The selected password
   */
  goToPasswdDetails(event, item) {
    this.navCtrl.push(PasswdDetailsPage, {
      item: item,
    });
  }

  /**
   * Open the add password modal
   */
  addPassdw() {
    this.navCtrl.push(AddPasswordPage, {'editing': false});
  }

  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
}
