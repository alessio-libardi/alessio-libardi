import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './root/app.component';
import {RouterModule} from '@angular/router'
import { WelcomeComponent } from './feature/welcome/welcome.component';
import { AboutComponent } from './feature/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes = [
  {
    path: 'welcome',
    pathMatch: 'full',
    component: WelcomeComponent,
    data: {animation: 'WelcomePage'}
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
    data: {animation: 'AboutPage'}
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
]
@NgModule({
  declarations: [AppComponent, WelcomeComponent, AboutComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), BrowserAnimationsModule, RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
