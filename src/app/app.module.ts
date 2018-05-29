import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { RemindPassApp } from './app.component';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';

import { ListPasswordPage } from '../pages/list-passwd/list-passwd';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { PasswordProvider } from '../providers/password/password.service';
import { PasswdDetailsPage } from '../pages/passwd-details/passwd-details';
import { AddPasswordPage } from '../pages/add-paddwd/add-passwd';

@NgModule({
  declarations: [
    RemindPassApp,
    ListPasswordPage,
    LoginPage,
    PasswdDetailsPage,
    AddPasswordPage,
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
  ]
})
export class AppModule { }
