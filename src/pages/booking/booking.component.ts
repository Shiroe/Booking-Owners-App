import { Component, OnInit, OnDestroy }     from '@angular/core';
import { NavController, ViewController, NavParams }    from 'ionic-angular'; 


@Component({
    selector: 'ab-booking',
    templateUrl: 'booking.component.html'
})
export class BookingComponent implements OnInit, OnDestroy{

    booking;

    constructor(
        private _nav: NavController,
        private _viewCtrl: ViewController,
        private _navp: NavParams
    ){

    }

    ngOnInit(){
        this.booking = this._navp.get('booking');
        console.log('Single view init!', this.booking);
    }

    ngOnDestroy(){
        console.log('Leaving single view!');        
    }

    back(){
        this._viewCtrl.dismiss({data: null});
    }

}