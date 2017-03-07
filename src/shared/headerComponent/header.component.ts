import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MyApp } from '../../app/app.component';

@Component({
    selector: 'ab-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {



    constructor(private _nav: NavController){

    }

    dropChanged(ev){
        console.log('Event:', ev);        
        if(ev === 'logout')
                this._nav.popTo(MyApp);
    }
    
    logout(){
        console.log('logout!');        
    }
}