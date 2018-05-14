import { Injectable } from '@angular/core';
import { Password } from '../../models/password';
import { File } from '@ionic-native/file';
import * as _ from 'lodash';
import { Platform } from 'ionic-angular';

@Injectable()
export class PasswordProvider {

  // private storagePath: string = this.file.dataDirectory;
  private storageFileName: string = 'remindPass.pswd';
  /**
   * Local cache copy of passwords written in the local file
   */
  private _passwords: Array<Password>;

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
      console.log(JSON.stringify(this._passwords));
      return this._passwords;
    });
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
    const newPasswd = new Password(name, username, password, icon);
    this._passwords.push(newPasswd);
    this.writePasswordToStorageFile(newPasswd).then((res) => {
      console.log('iswritten: ' + res);
      this.readPasswordsFromStorageFile().then((r) => console.log('added'));
      console.log(JSON.stringify(this._passwords));
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
        elem.id === password.getId();
      });
      // To add it with the edited values
    }
    return this.addPasswordByAttributes(password.name, password.username, password.password, password.icon);
  }

  containsThisPassword(password: Password) {
    // TODO:
    return true;
  }

  setCodePin() {
    // TODO:
    this.addPasswordByAttributes('RemindPass Code Pin', null, '123456', 'help');
  }

  /**
   * Read all passwords stored in the local file and decode them
   */
  readPasswordsFromStorageFile(): Promise<Array<Password>> {
    return this.platform.ready().then(() => {
      // If the local copy is empty, it means we haven't read the file yet
      // if(this._passwords.length !== 0) {
      //   return this._passwords;
      // }
      return this.file.readAsText(this.file.dataDirectory, this.storageFileName)
        .then((res) => {
          const strPasswords: Array<Password> =  JSON.parse(`[${res.substring(1)}]`);
          // strPasswords.map((elem) => {
          //   return new Password(elem);
          // });
          console.log(JSON.stringify(strPasswords));
          return strPasswords;
        })
        .catch((error) => {
          console.error(error.message);
          // If the file doesn't exists
          if (error.code === 1) {
            // We create the empty file
            return this.file.createFile(this.file.dataDirectory, this.storageFileName, false)
              .then((file) => {
                console.info('Empty file ' + file.name + ' created.');
                return new Array<Password>();
              })
              .catch((error) => {
                console.error('ERR:' + error.message);
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
      return this.file.checkFile(this.file.dataDirectory, this.storageFileName)
      .then((res) => {
        console.log('RES: ' + res);
        return this.file.writeFile(this.file.dataDirectory,
          this.storageFileName,
          ',' + JSON.stringify(pass),
          {append: true, replace: false})
        .then((file) => {
          console.info('File written successfully.');
          return true;
        })
        .catch((error) => {
          console.error('ERR:' + error.message);
          return false;
        });
      })
      .catch((error) => {
        console.error('ERR: ' + error.message);
        return this.file.writeFile(this.file.dataDirectory, this.storageFileName, '[]')
        .then((file) => {
          console.info('Empty file ' + file.name + ' created.');
          return true;
        })
        .catch((error) => {
          console.error('ERR:' + error.message);
          return false;
        });
      });
    });
  }

}
