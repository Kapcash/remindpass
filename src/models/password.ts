export class Password {

  /**
   * The unique id of the password, refered by its name
   */
  private id: string;

  public name: string;
  public username: string;
  public password: string;
  public icon: string;
  public lastEdited: Date;

  constructor(name: string, username: string, password: string, icon: string, lastEdited?: Date) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.icon = icon;
    this.id = name;
    this.lastEdited = lastEdited ? lastEdited : new Date();
  }

  static createEmptyPassword () {
    return new Password('', '', '', ''); // TODO: Give a '?' icon by default
  }

  getId() {
    return this.id;
  }

  toString(): string {
    return '{"name": "' + this.name + '", "username": "' + this.username + '","password": "' + this.password + '","icon": "' + this.icon + '","lastEdited": "' + this.lastEdited + '"}';
  }
}
