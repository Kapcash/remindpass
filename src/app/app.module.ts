import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { RemindPassApp } from './app.component';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { FilterPasswordsPipe } from '../providers/filterPasswords.pipe';

import { ListPasswordPage } from '../pages/list-passwd/list-passwd';
import { LoginPage } from '../pages/login/login';
import { AuthenticatePage } from '../pages/login/authenticate/authenticate';
import { RegisterPassword } from '../pages/login/registerPassword/register-password';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { PasswordProvider } from '../providers/password/password.service';
import { PasswdDetailsPage } from '../pages/passwd-details/passwd-details';
import { AddPasswordPage } from '../pages/add-paddwd/add-passwd';
import { AuthProvider } from '../providers/auth/auth.service';

@NgModule({
  declarations: [
    RemindPassApp,
    ListPasswordPage,
    LoginPage,
    AuthenticatePage,
    RegisterPassword,
    PasswdDetailsPage,
    AddPasswordPage,
    FilterPasswordsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(RemindPassApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RemindPassApp,
    ListPasswordPage,
    LoginPage,
    PasswdDetailsPage,
    AddPasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PasswordProvider,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
  ]
})
export class AppModule { }
