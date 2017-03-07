import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerService }    from '../../shared/server/server.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {
  
    username;
    password;

    constructor( 
        private _nav: NavController,
        private _navParams: NavParams,
        private _viewCtrl: ViewController,
        private _api: ServerService
        ) {

    }

    login(){
        //TODO CALL SERVICE 
        // this._api.login(this.username, this.password)
        //     .subscribe( data => {
        //         console.log('login response', data);
                this._viewCtrl.dismiss({logged: true});
            // }, error => {
            //     this._viewCtrl.dismiss({logged: true});
            // })
    }
}