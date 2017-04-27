import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage }       from '../pages/tabs/tabs';
import { LoginPage }      from '../pages/login/login';
import { StorageService } from '../shared/storage/storage.service';

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';


@Component({
  templateUrl: 'app.html',
  providers: [StorageService]
})
export class MyApp {
  rootPage: any; // = TabsPage;
  constructor(platform: Platform,
             public push: Push,
             private modal: ModalController,
             private storage: StorageService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // this.storage.init();

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {
        console.log('Token saved:', t.token);
      });
 
      this.push.rx.notification()
      .subscribe((msg) => {
        console.log('I received awesome push: ' + msg);
      });

      //if user already logged in and saved in storage then bypass login modal below
      // and just set rootPage = TabsPage;
      let modal = this.modal.create(LoginPage,{}, {showBackdrop: true, });
        modal.onDidDismiss(data => {
          console.log('login data:', data);
          // if(){
            this.rootPage = TabsPage;
          // }
        });
        modal.present();
      });
  }
}
