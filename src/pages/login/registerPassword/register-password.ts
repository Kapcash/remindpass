import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordsMatcher } from '../../../providers/validators/password-validator';

@Component({
  selector: 'page-register-password',
  templateUrl: 'register-password.html'
})
export class RegisterPassword {

  @Output()
  public passwordRegistered = new EventEmitter<any>();

  public newPassword: string;
  public confirmation: string;
  public submitAttempt: boolean = false;

  private passwdForm: FormGroup;
  private minLengthPassword: number = 8;
  // private passwordPattern: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]+$/;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
    public auth: AuthProvider, private formBuilder: FormBuilder) {
    this.passwdForm = this.formBuilder.group({
      passwd: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.minLengthPassword),
        // Validators.pattern(this.passwordPattern)
      ])],
      passwdConfirm: ['', Validators.required],
    }, {validator: passwordsMatcher});
  }

  setPassword() {
    this.submitAttempt = true;
    if(this.passwdForm.valid) {
      this.passwordRegistered.emit();
      this.auth.setRootPassword(this.newPassword);
    }
  }
}
