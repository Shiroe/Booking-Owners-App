import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';  


@Injectable()
export class StorageService {

    private hotels;
    private active;
    private storage: Storage = new Storage;
    private sub;

    constructor(){
        this.storage.ready().then( data => {
            this.getHotels().then( b => {
                if(b && b.length> 0){
                    this.hotels = b; 
                }
            }, error =>{
                console.log('no hotels', error);                
            });
            this.sub = this.getActive().subscribe( a=> {
                if(a){
                    this.active = a; 
                }
            }, error => {
                console.log('no active', error);                
            });
        });
    }

    // init(){
    //     this.storage.ready().then( data => {
    //         this.getHotels().then( b => {
    //             if(b && b.length> 0){
    //                 this.hotels = b; 
    //             }
    //         }, error =>{
    //             console.log('no hotels', error);                
    //         });
    //         this.getActive().then( a=> {
    //             if(a){
    //                 this.active = a; 
    //             }
    //         }, error => {
    //             console.log('no active', error);                
    //         });
    //     });
    // }

    setHotels(hotels){
        this.hotels = hotels;
        this.storage.set('hotels', hotels);
    }

    getHotels(){
        return this.storage.get('hotels');
    }

    setActive(h){
        this.active = h;
        this.storage.set('active', this.active);
    }

    getActive(){
        return Observable.fromPromise( this.storage.get('active').then( d => { return d; }) );
    }

    clear(){
        this.storage.clear();
    }


}