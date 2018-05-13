import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddPasswdPage } from '../add-passwd/add-passwd';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password';

@Component({
  selector: 'page-list-passwd',
  templateUrl: 'list-passwd.html'
})
export class ListPasswordPage {
  icons: string[];
  passwords: Array<Password>;
  isLoggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public passwordProvider: PasswordProvider) {
    this.presentLoginModal();

    this.passwords = this.passwordProvider.getPasswords();
  }

  presentLoginModal() {
    let loginModal = this.modalCtrl.create(LoginPage, null, {enableBackdropDismiss:false});
    this.isLoggedIn = false;
    loginModal.onDidDismiss(data => {
      this.isLoggedIn = data.isAuthenticated;
    });
    loginModal.present();
  }

  presentDetailsModal(options) {
    let detailsModal = this.modalCtrl.create(AddPasswdPage, options);
    detailsModal.present();
  }

  goToPasswdDetails(event, item) {
    this.presentDetailsModal({
      readonly: true,
      item: item,
    });
  }

  addPassdw() {
    this.presentDetailsModal({
      readonly: false,
    });
  }
}
