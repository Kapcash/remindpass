import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password.service';
import { AddPasswordPage } from '../add-paddwd/add-passwd';


@Component({
  selector: 'page-passwd-details',
  templateUrl: 'passwd-details.html'
})
export class PasswdDetailsPage {
  selectedItem: Password;
  shownPassword: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public passwordProvider: PasswordProvider) {
      this.selectedItem = navParams.get('item');
      this.shownPassword = this.passwordProvider.decodePassword(this.selectedItem.password.toString());
  }

  edit() {
    this.dismiss();
    const editModal = this.modalCtrl.create(AddPasswordPage, {
      password: this.selectedItem,
    });
    editModal.present();
  }

  remove() {
    this.passwordProvider.removePassword(this.selectedItem);
    // TODO: Toast "Password successfully removed"
    this.dismiss();
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }
}
