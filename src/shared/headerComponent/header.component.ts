import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StorageService } from '../../shared/storage/storage.service';
//import { HeaderComponentService }  from '../../shared/headerComponent/header.service';


@Component({
    selector: 'ab-header',
    templateUrl: 'header.component.html',
    providers: [StorageService]
    
})
export class HeaderComponent implements OnInit, OnDestroy{

    // @Input() hotels;
    @Output() hotelChanged = new EventEmitter;
    @Output() hotelsArray = new EventEmitter;


    _active;
    _hotels;
    sub

    constructor(
        private _nav: NavController,
        //private _header: HeaderComponentService,
        private _storage: StorageService){

            this._storage.getHotels().then( data => {
                console.log('========= hotels: =========', data);                
                this._hotels = data;
                this.hotelsArray.emit(data);
            }, error => {
                console.log('error hotels: ', error);
                
            });
            this.sub = this._storage.getActive().subscribe( data => {
                this._active = this._hotels[this._hotels.map( (el) => el.id ).indexOf(data.id)];
                console.log('========= active: =========', data, this._active);                
                // this.hotelChanged.emit(data);
            }, error => {
                console.log('error active: ', error);
                
            });
            // console.log('asdasdas', this._hotels, ' fff: ', this._active);            
    }

    ngOnInit(){
        console.log('ngOnInit HEADER');
    }

    ngOnDestroy(){
        console.log('ngOnDestroy HEADER');
        this._storage.setActive(this._active);
        this.sub.unsubscribe();
    }

    dropChanged(ev){
        console.log('Event:', ev);        
        if(ev.id === 'logout'){
            this.logout();
        }else{          
            this._active = this._hotels[this._hotels.map( (el) => el.id ).indexOf(ev.id)];
            this._storage.setActive(ev);
          //  this._header.setActive(ev);
            this.hotelChanged.emit(ev);
        }
    }
    
    logout(){
        console.log('logout!');  
        this._storage.clear();      
    }
}