import { AbstractControl } from '@angular/forms';

export const passwordsMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const passwd = control.get('passwd');
  const confirm = control.get('passwdConfirm');
  if (!passwd || !confirm) {
    return null;
  }
  return passwd.value === confirm.value ? null : { nomatch: true };
};
