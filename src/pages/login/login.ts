import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ServerService }    from '../../shared/server/server.service';
import { LoaderComponent } from '../../shared/loader/loading.component';
import { StorageService } from '../../shared/storage/storage.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html',
    providers: [LoaderComponent, StorageService]
})
export class LoginPage {
  
    username = 'ab@viralpassion.gr';
    password;

    constructor( 
        private _nav: NavController,
        private _navParams: NavParams,
        private _viewCtrl: ViewController,
        private _api: ServerService,
        private _loader: LoaderComponent,
        private storage: StorageService
        ) {

    }

    login(){
        //TODO CALL SERVICE 
        this.password = ')IJS(#X1eJLOF!ZjmyE15)4n';
        this._loader.presentDefault();
        this._api.login(this.username, this.password)
            .then( data => {
                console.log('login response', data);
                this._viewCtrl.dismiss({logged: true, hotels: data.hotels});
                this.storage.setHotels(data.hotels);
                this.storage.setActive(data.hotels[0]);
                setTimeout( ()=> { 
                    this._loader.dismissDefault();
                }, 2000);
            }, error => {
                this._loader.dismissDefault();
                this._loader.presentLoadingText('The credentials you provided were not correct.');
                setTimeout( ()=> { this._loader.dismissLoadingText() }, 2500);
                // this._viewCtrl.dismiss({logged: true});
            });


    }
}