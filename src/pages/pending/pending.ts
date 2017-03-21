import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoaderComponent } from '../../shared/loader/loading.component';


@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
  providers: [LoaderComponent]
})
export class PendingPage {

  constructor(
      public navCtrl: NavController,
      private _loader: LoaderComponent) {

  }



}
