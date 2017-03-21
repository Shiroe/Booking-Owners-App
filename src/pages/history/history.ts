import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';

import { BookingModalService } from '../booking/booking.service';
import { LoaderComponent } from '../../shared/loader/loading.component';
import { ServerService }        from '../../shared/server/server.service';
import { StorageService }        from '../../shared/storage/storage.service';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  providers: [LoaderComponent]
})
export class HistoryPage {

    bookings; // = [{id: 1, ref: 'ref7777'},{ id: 2, ref: 'ref7777'},{id: 3, ref: 'ref7777'}];

    hotels;
    active = { id: '', name: ''};
    sub;

    constructor(
        public _nav: NavController,
        private _modalService: BookingModalService,
        private _loader: LoaderComponent,
        private _api: ServerService,
        private _storage: StorageService) {

        this.sub = this._storage.getActive().subscribe( data => {
            console.log('did retrieve:', data);
            this.active = data;
            this.update();
        }, error => {
            console.log('error retrieving active ', error);            
        });

    }

    activeChanged(ev){
        this.active = ev;
        this.update();     
        // console.log('active Changed!', ev, ' : ' , this.active);
    }

    update(){
        this._api.getPastRequestsByHotel(this.active.id)
            .then( data => {
                console.log('dataRequested',data);    
                if(data && data.bookings){
                    this.bookings = data.bookings;           
                }
                else{
                    this.bookings = null;
                }
            }, error => {
                console.log('dataRequested',error);
            });
    }

    view(b){
        this._modalService.show(b);
    }

}
