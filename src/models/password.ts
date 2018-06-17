export class Password {

  /**
   * The unique id of the password, refered by its name
   */
  public id: number;

  public name: string;
  public username: string;
  public password: string;
  public icon: string;
  public iconColor: string;
  public lastEdited: Date;

  constructor(name: string, username: string, password: string, icon: string, lastEdited?: Date) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.icon = icon;
    this.iconColor = '#0162a9';
    this.lastEdited = lastEdited ? lastEdited : new Date();
    this.id = new Date().getUTCMilliseconds();
  }

  static createEmptyPassword () {
    return new Password('', '', '', 'help-circle');
  }
}
