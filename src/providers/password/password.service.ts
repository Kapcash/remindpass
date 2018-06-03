import { Injectable } from '@angular/core';
import { Password } from '../../models/password';
import { Platform, ToastController } from 'ionic-angular';
import { AES, enc } from 'crypto-js';
import _ from 'lodash';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY: string = 'passwds';
@Injectable()
export class PasswordProvider {

  /**
   * Local cache copy of passwords written in the local file
   */
  private aesKey: string = 'ma cle secrete temporaire';

  constructor(public platform: Platform, public storage: Storage, public toastCtrl: ToastController, public translate: TranslateService) {
  }

  /**
   * Get all registered passwords
   */
  getPasswords(): Promise<Array<Password>> {
    // We read the local file to retrieved all stored passwords
    return this.storage.get(STORAGE_KEY).then((passwords) => {
      if (passwords) {
        return passwords;
      } else {
        return [];
      }
    });
  }

  addPassword(pass: Password) {
    // Don't add if it already contains the same password
    this.containsThisPassword(pass).then((contains) => {
      if (!contains) {
        this.getPasswords().then((passwords) => {
          if (passwords) {
            // Encrypt new password before storing it
            pass.password = this.encodePassword(pass.password);
            passwords.push(pass);
            passwords = _.sortBy(passwords, (elem) => elem.name);
            this.storePassword(passwords);
          } else {
            this.storePassword([pass]);
          }
        });
      } else {
        this.toastCtrl.create({
          message: this.translate.instant('alreadyExists'),
          duration: 1500
        }).present();
      }
    });
  }

  addPasswordByAttributes(name, username, password, icon) {
    const newPasswd = new Password(name, username, password, icon);
    this.addPassword(newPasswd);
  }

  updatePassword(pass: Password) {
    return this.getPasswords().then((passwords) => {
      const index = _.findIndex(passwords, (elem) => {
        return elem.id === pass.id;
      });
      if(index > -1) {
        pass.lastEdited = new Date();
        passwords[index] = pass;
        return this.storePassword(passwords);
      } else {
        return null;
      }
    });
  }

  removePassword(pass: Password) {
    return this.getPasswords().then((passwords) => {
      if (passwords) {
        _.remove(passwords, (elem) => {
          return elem.id === pass.id;
        });
        return this.storePassword(passwords);
      }
    });
  }

  storePassword(passwdList) {
    return this.storage.set(STORAGE_KEY, passwdList);
  }

  containsThisPassword(password: Password): Promise<boolean> {
    return this.getPasswords().then((passwords) => {
      return _.findIndex(passwords, (elem) => {
        return elem.id === password.id;
      }) >= 0;
    });
  }

  /**
   * Encode the password with AES
   */
  encodePassword(passwordStr: string): string {
    return AES.encrypt(passwordStr, this.aesKey).toString();
  }

  /**
   * Decode the password with AES
   * @param passwordStr The encoded password string to decode
   */
  decodePassword(passwordStr: string) {
    return AES.decrypt(passwordStr, this.aesKey).toString(enc.Utf8);
  }
}
