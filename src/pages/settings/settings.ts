import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth.service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public auth: AuthProvider, public modalCtrl: ModalController) {
  }

  resetRootPassword() {
    this.auth.deleteRootPassword().then((res) => {
      // Once the password is deleted, we display the register password modal again
      this.navCtrl.popToRoot();
      window.location.reload();
    });
  }

  /**
   * Open the login modal to authenticate
   */
  presentLoginModal() {

  }

}
