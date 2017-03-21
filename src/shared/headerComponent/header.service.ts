import { Injectable } from '@angular/core';


@Injectable()
export class HeaderComponentService{

    private hotels;
    private active;

    constructor(){

    }


    setHotels(h){
        this.hotels = h;
    }

    getHotels(){
        return this.hotels;
    }

    getActive(){
        return this.active;
    }

    setActive(a){
        this.active = a;
    }
}