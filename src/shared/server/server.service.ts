import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } 	  from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ServerService {

	//TO DELETE THIS AND TOAST
	private api: string = 'https://booking.vpsites.eu/wp-admin/admin-ajax.php';
	// private api: string = '/api';
	private headers = new Headers();

	constructor(
		private _http: Http){
		this.headers.append('Content-Type', 'application/json; charset=UTF-8');
		// this.headers.append('Access-Control-Allow-Origin:', '*');
		this.headers.append('crossDomain', 'true'); 
    }

	
	login(email, password){

		let data = {
			'action'	: 'processBooking',
			'email'	    : email,
			'password'	: password,
		};
		let options = new RequestOptions({
			headers: this.headers
		});

		return this._http.post(this.api + '?action=processBooking', data, options).map( res => res.json()); //.toPromise();
	}

}
