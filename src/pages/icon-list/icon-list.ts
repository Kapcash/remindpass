import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import * as Multiple from '../../../node_modules/multiple.js/multiple.js';
@Component({
  selector: 'page-icon-list',
  templateUrl: 'icon-list.html'
})
export class IconListPage {
  iconList: Array<string> = ['logo-apple', 'logo-twitter', 'logo-facebook', 'logo-android',
  'logo-linkedin', 'logo-google', 'logo-steam', 'logo-windows',
  'logo-skype', 'logo-snapchat', 'logo-github', 'logo-dropbox',
  'logo-pinterest', 'logo-youtube', 'logo-whatsapp', 'logo-twitch',
  'trophy', 'help-circle', 'add', 'search',
  'attach', 'camera', 'color-palette', 'contact',
  'football', 'heart', 'mail', 'pin',
  'settings', 'star', 'mail', 'thumbs-up',
  'pizza', 'moon', 'musical-notes', 'key'];

  constructor (public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    const background = new Multiple({
      selector: '.multiple',
      background: 'linear-gradient(164deg, #00b4ff, #002c8a)'
    });
  }

  chooseIcon (icon: string) {
    this.dismiss(icon);
  }

  dismiss (icon: string) {
    this.viewCtrl.dismiss({ 'iconChosen': icon });
  }
}
