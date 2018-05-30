import { Injectable } from '@angular/core';
import { Password } from '../../models/password';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { AES, enc } from 'crypto-js';
import _ from 'lodash';
import { Storage } from '@ionic/storage';

const STORAGE_KEY: string = 'passwds';
@Injectable()
export class PasswordProvider {

  // private storagePath: string = this.file.dataDirectory;
  private storageFileName: string = 'remindPass.pswd';
  /**
   * Local cache copy of passwords written in the local file
   */
  private _passwords: Array<Password>;
  private aesKey: string = 'ma cle secrete temporaire';

  constructor(private file: File, public platform: Platform, public storage: Storage) {
  }

  /**
   * Get all registered passwords
   */
  getPasswords(): Promise<Array<Password>> {
    // We read the local file to retrieved all stored passwords
    return this.storage.get(STORAGE_KEY).then((passwords) => {
      console.log('PASSWORDS GET: ' + JSON.stringify(passwords));
      if (passwords) {
        return passwords;
      } else {
        return [];
      }
    });
  }

  addPassword(pass: Password) {
    this.addPasswordByAttributes(pass.name, pass.username, pass.password, pass.icon);
  }

  addPasswordByAttributes(name, username, password, icon) {
    if (!icon) { // If no icon is provided, we set it to 'help' by default
      icon = 'help';
    }
    // Encrypt password
    password = this.encodePassword(password);
    const newPasswd = new Password(name, username, password, icon);
    // Don't add if it already contains the same password
    this.containsThisPassword(newPasswd).then((contains) => {
      if (!contains) {
        this.getPasswords().then((passwords) => {
          if (passwords) {
            passwords.push(newPasswd);
            passwords = _.sortBy(passwords, (elem) => elem.name);
            this.storePassword(passwords);
          } else {
            this.storePassword([newPasswd]);
          }
        });
      }
    });
  }

  removePassword(pass: Password) {
    this.getPasswords().then((passwords) => {
      if (passwords) {
        _.remove(passwords, (elem) => {
          return elem.name === pass.name;
        });
        this.storePassword(passwords);
      }
    });
  }

  storePassword(passwdList) {
    return this.storage.set(STORAGE_KEY, passwdList);
  }

  containsThisPassword(password: Password): Promise<boolean> {
    return this.getPasswords().then((passwords) => {
      return _.findIndex(passwords, (elem) => {
        return elem.name === password.name;
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
