import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Password } from '../../models/password';

/**
 *
 */
@Injectable()
export class PasswordProvider {

   /**
   * Local cache copy of passwords written in the local file
   */
  private _passwords: Array<Password>;

  constructor(public http: HttpClient) {
    this._passwords = new Array<Password>();
  }

  /**
   * Get all registered passwords
   */
  getPasswords(): Array<Password> {
    // If the local copy is empty, it means we haven't read the file yet
    if (this._passwords.length === 0 ){
      // We read the local file to retrieved all stored passwords
      // TODO: Read passwords from file
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
    let newPasswd = new Password(name, username, password, icon);
    this._passwords.push(newPasswd);
    // TODO: Write new password into file
    return newPasswd;
  }

  /**
   * Add a password from a complete object
   * @param password The new password to create
   */
  addPassword(password: Password): Password {
    return this.addPasswordByAttributes(password.name, password.username, password.password, password.icon)
  }

  setCodePin() {
    // TODO:
    this.addPasswordByAttributes('RemindPass Code Pin', null, '123456', null);
  }

}
