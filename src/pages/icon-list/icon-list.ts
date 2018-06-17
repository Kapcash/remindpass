import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { ColorPopover } from './color-popover/color-popover';

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
    'settings', 'star', 'thumbs-up',
    'pizza', 'moon', 'musical-notes', 'key'];
  iconColor: string = '#0162a9';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public popoverCtrl: PopoverController) {
  }

  chooseIcon(icon: string) {
    this.dismiss(icon);
  }

  chooseColor($event) {
    const popover = this.popoverCtrl.create(ColorPopover);
    popover.present({
      ev: $event
    });
    popover.onDidDismiss((data) => {
      this.iconColor = data.colorChosen;
    });
  }

  dismiss(icon: string) {
    this.viewCtrl.dismiss({ 'iconChosen': icon, 'iconColor': this.iconColor });
  }
}
