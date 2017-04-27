import { Component, OnInit, OnDestroy, AfterViewInit }      from '@angular/core';
import { NavController, NavParams }  from 'ionic-angular';

import { BookingModalService }  from '../booking/booking.service';
import { LoaderComponent }      from '../../shared/loader/loading.component';
import { ServerService }        from '../../shared/server/server.service';
import { StorageService }        from '../../shared/storage/storage.service';

@Component({
  selector: 'page-accepted',
  templateUrl: 'accepted.html',
  providers: [LoaderComponent, StorageService]
})
export class AcceptedPage implements OnInit, OnDestroy{

    bookings;
    hotels;
    active = { id: '', name: ''};
    sub;

    constructor(
      public _nav: NavController,
      private _navp: NavParams,
      private _modalService: BookingModalService,
      private _loader: LoaderComponent,
      private _api: ServerService,
      private _storage: StorageService
      ) {
        // this._storage.getHotels().then( data => {
        //     console.log('did retrieve:', data);
            
        //     this.hotels = data;
        // }, error => {
        //     console.log('error retrieving active ', error);            
        // });
        this.sub = this._storage.getActive().subscribe( data => {
            console.log('did retrieve:', data);
            this.active = data;
            this.update();
        }, error => {
            console.log('error retrieving active ', error);            
        });

    }

    ngOnInit(){
        // this.update();
    }

    update(){
        this.sub = this._storage.getActive().subscribe( data => {
            console.log('did retrieve:', data);
            this.active = data;
        }, error => {
            console.log('error retrieving active ', error);            
        });

        this._api.getAcceptedRequestsByHotel(this.active.id)
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

    activeChanged(ev){
        this.active = ev;
		this._storage.setActive(ev);
        this.update();     
        // console.log('active Changed!', ev, ' : ' , this.active);
    }

    ngOnDestroy(){
        this.sub.unsubscribe(); 
    }    

    view(b){
        this._modalService.show(b);
    }
    
    ionViewWillEnter(){
		this.update();
	};

}
