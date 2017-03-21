import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { BookingComponent } from './booking.component';

@Injectable()
export class BookingModalService{

    constructor(
        private modal: ModalController
    ){

    }

    show(b){
        let modal = this.modal.create(BookingComponent,{ booking: b}, {showBackdrop: true, });
        modal.onDidDismiss(data => {
          console.log('login data:', data);
          return data;
        });
        modal.present();
    }
} 