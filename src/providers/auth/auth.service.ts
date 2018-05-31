import { Injectable } from '@angular/core';
import { SHA256, enc } from 'crypto-js';
import { Storage } from '@ionic/storage';
import _ from 'lodash';

const STORAGE_KEY = 'rootHash';

@Injectable()
export class AuthProvider {

  constructor(public storage: Storage) {
  }

  /**
   * Set the root password of the app
   * Use SHA256 to crypt it
   * @param newPass The password to store
   */
  setRootPassword(newPass: string) {
    const hash = SHA256(newPass);
    this.storeRootPassword(hash.toString());
  }

  /**
   * Store the password into the local storage
   * @param hashPassword The password hash to store
   */
  private storeRootPassword(hashPassword: string) {
    this.storage.set(STORAGE_KEY, hashPassword);
  }

  /**
   * Check whether a password is correct or not.
   * Use SHA256 to crypt it
   * @param inputPassword The password to check
   */
  isGoodRootPassword(inputPassword: string): Promise<boolean> {
    return this.storage.get(STORAGE_KEY).then((storedPassword: string) => {
      return SHA256(inputPassword).toString() === storedPassword;
    });
  }

  /**
   * Check whether the root password exists or not
   */
  rootPasswordExists() : Promise<boolean> {
    return this.storage.get(STORAGE_KEY).then((storedPassword: string) => {
      return !!storedPassword;
    });
  }

  deleteRootPassword() {
    this.storage.remove(STORAGE_KEY).then((res) => {
    });
  }

}
