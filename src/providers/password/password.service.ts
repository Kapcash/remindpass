import { Injectable } from '@angular/core';
import { Password } from '../../models/password';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { AES, enc } from 'crypto-js';
import _ from 'lodash';

@Injectable()
export class PasswordProvider {

  // private storagePath: string = this.file.dataDirectory;
  private storageFileName: string = 'remindPass.pswd';
  /**
   * Local cache copy of passwords written in the local file
   */
  private _passwords: Array<Password>;
  private aesKey: string = 'ma cle secrete temporaire';

  constructor(private file: File, public platform: Platform) {
    this._passwords = new Array<Password>();
  }

  /**
   * Get all registered passwords
   */
  getPasswords(): Promise<Array<Password>> {
    // We read the local file to retrieved all stored passwords
    return this.readPasswordsFromStorageFile().then((passwords) => {
      this._passwords = passwords;
      return _.sortBy(this._passwords, (elem) => elem.name);
    });
    // return this.deleteStorageFile().then((elem) => {
    //   return null;
    // });
  }

  /**
   * Add a password by giving each of its attributs
   * @param name The descriptive name of the password
   * @param username The username
   * @param password The password itself
   * @param icon The descriptive icon
   */
  addPasswordByAttributes(name, username, password, icon): Password {
    if (!icon) { // If no icon is provided, we set it to 'help' by default
      icon = 'help';
    }
    // Encrypt password
    password = this.encodePassword(password);
    console.log('ENCODED: ' + password);
    const newPasswd = new Password(name, username, password, icon);
    console.log('NEW PASSWD' + newPasswd.toString());
    this._passwords.push(newPasswd);
    this._passwords = _.sortBy(this._passwords, (elem) => elem.name);
    this.writePasswordToStorageFile(newPasswd).then((success) => {
      console.log('iswritten: ' + success);
    });
    return newPasswd;
  }

  /**
   * Add a password from a complete object
   * @param password The new password to create
   */
  addPassword(password: Password): Password {
    // If the list already contains the password's id, then we have to edit it
    if (this.containsThisPassword(password)) {
      // We remove it from the list
      _.remove(this._passwords, (elem) => {
        return elem.name === password.name;
      });
      // To add it with the edited values
    }
    return this.addPasswordByAttributes(password.name, password.username, password.password, password.icon);
  }

  /**
   * Remove a password from the list
   * Delete it from the local list and from the storage file
   * @param pass The password to remove
   */
  removePassword(pass: Password): void {
    // Remove the password from the local list
    _.remove(this._passwords, (elem) => {
      return elem.name === pass.name;
    });
    // And from the file
    this.writeAllPasswordsToStorageFile(this._passwords).then((success) => {
      console.log('iswritten: ' + success);
    });
  }

  containsThisPassword(password: Password): boolean {
    return _.findIndex(this._passwords, (elem) => {
      return elem.name === password.name;
    }) >= 0;
  }

  /**
   * Encode the password with AES
   */
  encodePassword(passwordStr: string) {
    return AES.encrypt(passwordStr, this.aesKey);
  }

  /**
   * Decode the password with AES
   * @param passwordStr The encoded password string to decode
   */
  decodePassword(passwordStr: string) {
    return AES.decrypt(passwordStr, this.aesKey).toString(enc.Utf8);
  }

// ===== MANAGE STORAGE FILE ===== //

  /**
   * Read all passwords stored in the local file and decode them
   */
  readPasswordsFromStorageFile(): Promise<Array<Password>> {
    return this.platform.ready().then(() => {
      // If the local copy is empty, it means we haven't read the file yet
      if (this._passwords.length !== 0) {
        return this._passwords;
      }
      return this.file.readAsText(this.file.dataDirectory, this.storageFileName)
        .then((res) => {
          console.log('RES:' + res);
          if(res === '') {
            return new Array<Password>();
          }
          const strPasswords: Array<any> =  JSON.parse(`[${_.startsWith(res, ',') ? res.substring(1) : res}]`);
          strPasswords.map((pass) => {
            // Decrypt all passwords
            const decodedPassword = this.decodePassword(pass.password.toString());
            return new Password(pass.name, pass.username, decodedPassword, pass.icon, pass.lastEdited);
          });
          return strPasswords;
        })
        .catch((error) => {
          console.error('[READ] ERR1: ' + JSON.stringify(error));
          // If the file doesn't exists
          if (error.code === 1) {
            // We create the empty file
            return this.file.createFile(this.file.dataDirectory, this.storageFileName, false)
              .then((file) => {
                console.info('Empty file ' + file.name + ' created.');
                return new Array<Password>();
              })
              .catch((error) => {
                console.error('[READ] ERR2:' + error.message);
                return null;
              });
          }
        });
    });
  }

  /**
   * Save a password by encoding it and writting it into a storage local file
   * @param pass The password to save
   */
  writePasswordToStorageFile(pass: Password): Promise<boolean> {
    return this.platform.ready().then(() => {
      // Check if the file exists
      return this.file.checkFile(this.file.dataDirectory, this.storageFileName)
      .then((fileExists) => {
        // If the file exists
        if(fileExists) {
          // Then we append the password into the file
          return this.file.writeFile(this.file.dataDirectory,
            this.storageFileName,
            ',' + pass.toString(),
            {append: true, replace: false})
          .then((file) => {
            console.info('File written successfully.');
            return true;
          })
          .catch((error) => {
            console.error('[WRITE] ERR1:' + error.message);
            return false;
          });
        } else {
          // else, we create the file with the first password to write
          return this.file.writeFile(this.file.dataDirectory, this.storageFileName, pass.toString())
          .then((file) => {
            console.info('New storage file ' + file.name + ' created.');
            return true;
          })
          .catch((error) => {
            console.error('[WRITE] ERR2:' + error.message);
            return false;
          });
        }
      })
      .catch((error) => {
        // If the file doesn't exists yet, we create it
        console.error('[WRITE] ERR3: ' + error.message);
        return false;
      });
    });
  }

  /**
   * Save a password by encoding it and writting it into a storage local file
   * @param pass The password to save
   */
  writeAllPasswordsToStorageFile(passList: Array<Password>): Promise<boolean> {
    return this.platform.ready().then(() => {
      // Check if the file exists
      return this.file.checkFile(this.file.dataDirectory, this.storageFileName)
      .then((fileExists) => {
        // If the file exists
        if(fileExists) {
          // Then we append the password into the file
          return this.file.writeFile(this.file.dataDirectory,
            this.storageFileName,
            JSON.stringify(passList),
            {append: false, replace: true})
          .then((file) => {
            console.info('File written successfully.');
            return true;
          })
          .catch((error) => {
            console.error('[WRITE] ERR1:' + error.message);
            return false;
          });
        } else {
          // else, we create the file with the first password to write
          return this.file.writeFile(this.file.dataDirectory, this.storageFileName, JSON.stringify(passList))
          .then((file) => {
            console.info('New storage file ' + file.name + ' created with entire list.');
            return true;
          })
          .catch((error) => {
            console.error('[WRITE] ERR2:' + error.message);
            return false;
          });
        }
      })
      .catch((error) => {
        // If the file doesn't exists yet, we create it
        console.error('[WRITE] ERR3: ' + error.message);
        return false;
      });
    });
  }

  /**
   * Delete the file where all passwords are stored
   */
  deleteStorageFile(): Promise<boolean> {
    return this.platform.ready().then(() => {
      // Check if the file exists
      return this.file.removeFile(this.file.dataDirectory, this.storageFileName)
      .then((res) => {
        console.info('Storage file removed');
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
    });
  }
}
