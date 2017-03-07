import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any; // = TabsPage;
  constructor(platform: Platform,
             private modal: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      let modal = this.modal.create(LoginPage,{}, {showBackdrop: true, });
        modal.onDidDismiss(data => {
          console.log('login data:', data);
          // if(data.logged){
            this.rootPage = TabsPage;
          // }
        });
        modal.present();
      });
  }
}
