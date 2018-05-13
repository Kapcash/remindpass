export class Password {

  constructor(public name: string, public username: string, public password: string, public icon: string){
  }

  static createEmptyPassword () {
    return new Password('', '', '', ''); // TODO: Give a '?' icon by default
  }
}
