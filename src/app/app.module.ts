import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './user/main/main.component';
import {Routes, RouterModule} from '@angular/router';
import {ShareModule} from './user/share/share.module';
import {AccordionModule} from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './admin/commonadmin/error/error.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {FacebookLoginProvider} from 'angularx-social-login';
import {FoundpageComponent}  from 'src/app/admin/mainadmin/foundpage/foundpage.component';
const approute: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/mainadmin/mainadmin.module').then((m) => m.MainadminModule)
  },
  {
    path: 'notfound',
    component: FoundpageComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ErrorComponent,
    FoundpageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(approute),
    ShareModule,
    RouterModule,
    AccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('872675876891858')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
