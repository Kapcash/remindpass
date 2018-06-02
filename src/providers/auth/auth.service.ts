import { Injectable } from '@angular/core';
import { SHA256 } from 'crypto-js';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

const STORAGE_KEY = 'rootHash';

@Injectable()
export class AuthProvider {

  private fingerPrintOpts: any;

  constructor(public storage: Storage, public faio: FingerprintAIO, public platform: Platform) {
    this.fingerPrintOpts = {
      clientId: 'Fingerprint-RemindPass',
      clientSecret: 'fingerprintPassword',
      disableBackup: true,
      localizedFallbackTitle: 'Use Pin',
      localizedReason: 'Please authenticate'
    };
  }

  async askFingerPrint() {
    try {
      await this.platform.ready();
      const isAvailable = await this.faio.isAvailable();
      if (isAvailable) {
        return this.faio.show(this.fingerPrintOpts)
        .then((res) => {
          return res;
        });
      }
    } catch (e) {
      throw e;
    }
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
  rootPasswordExists(): Promise<boolean> {
    return this.storage.get(STORAGE_KEY).then((storedPassword: string) => {
      return !!storedPassword;
    });
  }

  /**
   * Delete the root password of the app
   */
  deleteRootPassword() {
    return this.storage.remove(STORAGE_KEY);
  }

}
