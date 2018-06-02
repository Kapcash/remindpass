import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PasswdDetailsPage } from '../passwd-details/passwd-details';
import { PasswordProvider } from '../../providers/password/password.service';
import { AddPasswordPage } from '../add-paddwd/add-passwd';
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

  ngOnInit() {
    this.passwords = this.passwordProvider.getPasswords();
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

  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }
}
