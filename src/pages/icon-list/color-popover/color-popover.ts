import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-color-popover',
  templateUrl: 'color-popover.html'
})
export class ColorPopover {
  public colorList: Array<string> = ['red', 'blue', 'yellow', 'cyan', 'green', 'black', 'grey', 'purple'];

  constructor (public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  dismiss (color: string) {
    this.viewCtrl.dismiss({ 'colorChosen': color });
  }
}
