import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PasswdDetailsPage } from '../passwd-details/passwd-details';
import { PasswordProvider } from '../../providers/password/password.service';
import { AddPasswordPage } from '../add-paddwd/add-passwd';
import { Password } from '../../models/password';

@Component({
  selector: 'page-list-passwd',
  templateUrl: 'list-passwd.html'
})
export class ListPasswordPage {
  icons: Array<string>;
  isLoggedIn = false;
  searchFilter: string;
  passwords: Promise<Array<Password>>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public passwordProvider: PasswordProvider) {
      // Always ask for authentication
      this.presentLoginModal();
  }

  ngOnInit() {
    this.passwords = this.passwordProvider.getPasswords();
  }

  /**
   * Open the login modal to authenticate
   */
  presentLoginModal() {
    const loginModal = this.modalCtrl.create(LoginPage, null, { enableBackdropDismiss: false });
    this.isLoggedIn = false;
    loginModal.onDidDismiss((data) => {
      this.isLoggedIn = data.isAuthenticated;
    });
    loginModal.present();
  }

  /**
   * Open the details modal to display password information
   * @param event Click event
   * @param item The selected password
   */
  goToPasswdDetails(event, item) {
    const detailsModal = this.modalCtrl.create(PasswdDetailsPage, {
      item: item,
    });
    detailsModal.onDidDismiss((data) => {
      this.passwords = this.passwordProvider.getPasswords();
    });
    detailsModal.present();
  }

  /**
   * Open the add password modal
   */
  addPassdw() {
    const addModal = this.modalCtrl.create(AddPasswordPage);
    addModal.onDidDismiss((data) => {
      this.passwords = this.passwordProvider.getPasswords();
    });
    addModal.present();
  }
}
