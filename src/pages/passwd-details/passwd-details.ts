import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController, AlertController } from 'ionic-angular';
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
  showClearPassword: boolean = false;
  hidedStr: string = '•••••';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
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
    const alertConfirmation = this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: 'Please confirm you want to delete the password \'' + this.selectedItem.name + '\'',
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            // Action confirmed
            // Remove the password
            this.passwordProvider.removePassword(this.selectedItem);
            this.toastCtrl.create({
              message: 'Password was removed successfully',
              duration: 2000
            }).present();
            this.dismiss();
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            // Action canceled
            // Do nothing but dismiss the alert
          }
        }
      ]
    });
    alertConfirmation.present();
  }

  showPassword() {
    this.showClearPassword = !this.showClearPassword;
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }
}
