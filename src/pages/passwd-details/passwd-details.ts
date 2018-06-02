import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Password } from '../../models/password';
import { PasswordProvider } from '../../providers/password/password.service';
import { AddPasswordPage } from '../add-paddwd/add-passwd';
import { TranslateService } from '@ngx-translate/core';


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
    public translate: TranslateService,
    public passwordProvider: PasswordProvider) {
      this.selectedItem = navParams.get('item');
      this.shownPassword = this.passwordProvider.decodePassword(this.selectedItem.password);
  }

  edit() {
    this.dismiss();
    const editModal = this.modalCtrl.create(AddPasswordPage, {
      password: this.selectedItem,
    });
    editModal.present();
  }

  /**
   * Definitely Delete the selected password
   */
  remove() {
    const alertConfirmation = this.alertCtrl.create({
      title: this.translate.instant('sure?'),
      subTitle: this.translate.instant('confirmSentence', {'name': this.selectedItem.name}),
      buttons: [
        {
          text: this.translate.instant('remove'),
          handler: () => {
            // Action confirmed
            // Remove the password
            this.passwordProvider.removePassword(this.selectedItem);
            this.toastCtrl.create({
              message: this.translate.instant('removeSuccess'),
              duration: 2000
            }).present();
            this.dismiss();
          }
        },
        {
          text: this.translate.instant('cancel'),
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
