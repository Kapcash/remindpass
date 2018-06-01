import { Component } from '@angular/core';
import { Platform, MenuController, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPasswordPage } from '../pages/list-passwd/list-passwd';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class RemindPassApp {
  rootPage = ListPasswordPage;
  isLoggedIn = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Always ask for authentication
      this.presentLoginModal();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.resume.subscribe(() => {
      // Always ask for authentication
        this.presentLoginModal();
      });
    });
  }

  /**
   * Open the login modal to authenticate
   */
  presentLoginModal() {
    const loginModal = this.modalCtrl.create(LoginPage, null, { enableBackdropDismiss: false });
    this.isLoggedIn = false;
    loginModal.onDidDismiss((data) => {
      this.isLoggedIn = true;
    });
    loginModal.present();
  }

}
