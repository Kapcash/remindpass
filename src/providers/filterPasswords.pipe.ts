import { PipeTransform, Pipe } from '@angular/core';
import { Password } from '../models/password';

@Pipe({
  name: 'filterPasswords',
  pure: false
})
export class FilterPasswordsPipe implements PipeTransform {
  transform(passwords: Array<Password>, filterStr: string): any {
    if (!passwords || !filterStr || filterStr === '') {
      return passwords;
    }
    return passwords.filter((pass) => pass.name.includes(filterStr));
  }
}
