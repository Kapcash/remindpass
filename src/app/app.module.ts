import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

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
    MyApp,
    ListPasswordPage,
    LoginPage,
    PasswdDetailsPage,
    AddPasswordPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPasswordPage,
    LoginPage,
    PasswdDetailsPage,
    AddPasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PasswordProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
