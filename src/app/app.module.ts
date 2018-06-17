import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

import { FilterPasswordsPipe } from '../providers/filterPasswords.pipe';
import { PasswordProvider } from '../providers/password/password.service';
import { AuthProvider } from '../providers/auth/auth.service';

import { RemindPassApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AuthenticatePage } from '../pages/login/authenticate/authenticate';
import { RegisterPassword } from '../pages/login/registerPassword/register-password';
import { ListPasswordPage } from '../pages/list-passwd/list-passwd';
import { IconListPage } from '../pages/icon-list/icon-list';
import { ColorPopover } from '../pages/icon-list/color-popover/color-popover';

import { SettingsModule } from '../pages/settings/settings.module';
import { AddPasswordModule } from '../pages/add-passwd/add-passwd.module';
import { PasswdDetailsModule } from '../pages/passwd-details/passwd-details.module';

export function createTranslateLoader(http: HttpClient) { // tslint:disable-line
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    RemindPassApp,
    ListPasswordPage,
    LoginPage,
    AuthenticatePage,
    ColorPopover,
    RegisterPassword,
    IconListPage,
    FilterPasswordsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(RemindPassApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    SettingsModule,
    AddPasswordModule,
    PasswdDetailsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RemindPassApp,
    ListPasswordPage,
    LoginPage,
    IconListPage,
    ColorPopover,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PasswordProvider,
    FingerprintAIO,
    AuthProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
