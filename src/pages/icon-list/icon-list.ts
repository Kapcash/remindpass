import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-icon-list',
  templateUrl: 'icon-list.html'
})
export class IconListPage {
  iconList: Array<string>;

  constructor (public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      this.iconList = ['logo-apple', 'logo-twitter', 'logo-facebook', 'logo-android',
        'logo-linkedin', 'logo-google', 'logo-steam', 'logo-windows',
        'logo-skype', 'logo-slack', 'logo-github', 'logo-dropbox',
        'logo-pinterest', 'logo-youtube', 'logo-whatsapp', 'logo-twitch',
        'logo-snapchat', 'help-circle', 'add', 'search',
        'attach', 'camera', 'color-palette', 'contact',
        'football', 'heart', 'mail', 'pin',
        'settings', 'star', 'mail', 'thumbs-up',
        'pizza', 'moon', 'musical-notes', 'key',
        'trophy'];
  }

  chooseIcon (icon: string) {
    this.dismiss(icon);
  }

  dismiss (icon: string) {
    this.viewCtrl.dismiss({ 'iconChosen': icon });
  }
}
