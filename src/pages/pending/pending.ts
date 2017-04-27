import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServerService }    from '../../shared/server/server.service';

import { LoaderComponent } from '../../shared/loader/loading.component';
import { StorageService }        from '../../shared/storage/storage.service';



@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
  providers: [LoaderComponent]
})
export class PendingPage {

	bookings;
	hotels;
	active = { id: '', name: ''};
	sub;

  constructor(
      public navCtrl: NavController,
      private _loader: LoaderComponent,
			private _api: ServerService,
			private _storage: StorageService
	  ) {

			this.sub = this._storage.getActive().subscribe( data => {
            console.log('did retrieve:', data);
            this.active = data;
            this.update();
        }, error => {
            console.log('error retrieving active ', error);            
        });
  }

	ionViewWillEnter(){
		this.update();
	};

	activeChanged(ev){
        this.active = ev;
		this._storage.setActive(ev);
        this.update();
  }

	update(){
		this._loader.presentDefault();
		// this.sub = this._storage.getActive().subscribe( data => {
		// 		console.log('did retrieve:', data);
		// 		this.active = data;
		// 		this._loader.dismissDefault();
		// }, error => {
		// 		console.log('error retrieving active ', error);    
		// 		this._loader.dismissDefault();        
		// });
		
		this.sub = this._storage.getActive().subscribe( data => {
        	console.log('did retrieve:', data);
            this.active = this._storage.getActiveOBJ();
            
			this._api.getPendingRequestsByHotel( this.active.id.toString() )
				.then(success => {
					this._loader.dismissDefault();
					if(success.avail_bookings){
						this.bookings = success.avail_bookings;
					}
					console.log('avail',success);
				}, error=> {});
			});
			this._loader.dismissDefault();
		};

	claimBooking(booking){
		this._loader.presentDefault();
		this.sub = this._storage.getActive().subscribe( data => {
				console.log('did retrieve:', data);
				this.active = data;
		}, error => {
				console.log('error retrieving active ', error);            
		});

		this._api.claimBooking( booking, this.active.id.toString() )
			.then(success => {
				this._loader.dismissDefault();
				this._loader.presentLoadingText("Request, successfully claimed!, you can find it at the 'accepted' tab");
                setTimeout( ()=> { this._loader.dismissLoadingText(); 	this.update(); }, 4000);
			}, error=> {
				this._loader.dismissDefault();
			});
	}

}
