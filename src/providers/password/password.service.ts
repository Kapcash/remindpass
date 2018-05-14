import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Password } from '../../models/password';
import * as _ from 'lodash';

@Injectable()
export class PasswordProvider {

  /**
   * Local cache copy of passwords written in the local file
   */
  private _passwords: Array<Password>;

  constructor(public http: HttpClient) {
    this._passwords = new Array<Password>();
    this.addPasswordByAttributes('TEST', 'TEST', 'TEST', null);
    this.addPasswordByAttributes('TEST', 'TEST', 'TEST', null);
  }

  /**
   * Get all registered passwords
   */
  getPasswords(): Array<Password> {
    // If the local copy is empty, it means we haven't read the file yet
    if (this._passwords.length === 0 ) {
      // We read the local file to retrieved all stored passwords
      this._passwords = this.readPasswordsFromStorageFile();
    }

    return this._passwords;
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
    this.writePasswordToStorageFile(newPasswd);

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
      // To readd it with the edited values
    }
    return this.addPasswordByAttributes(password.name, password.username, password.password, password.icon);
  }

  containsThisPassword(password: Password) {
    return true;
  }

  setCodePin() {
    // TODO:
    this.addPasswordByAttributes('RemindPass Code Pin', null, '123456', 'help');
  }

  /**
   * Read all passwords stored in the local file and decode them
   */
  readPasswordsFromStorageFile(): Array<Password> {
    // TODO:
    return null;
  }

  /**
   * Save a password by encoding it and writting it into a storage local file
   * @param pass The password to save
   */
  writePasswordToStorageFile(pass: Password): boolean {
    // TODO:
    return false;
  }

}
