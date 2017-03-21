import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } 	  from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Base64 } from '../encoding/base64';


@Injectable()
export class ServerService {

	//TO DELETE THIS AND TOAST
	private api: string = 'https://booking.vpsites.eu/wp-json/owner_app/v1';
	// private api: string = 'https://demo.wp-api.org/wp-json/';
	private headers = new Headers();
	private hash: string;

	constructor(
		public base64: Base64,
		private _http: Http){
		this.headers.append('Content-Type', 'application/json; charset=UTF-8');
		// this.headers.append('Access-Control-Allow-Origin:', '*');
		// this.headers.append('crossDomain', 'true');
    }

	// Caution with the headers.append on each function cuz if Authorization exists it will be added again the value
	// eg 'Authorization' : 'Basic eos32df==' and you do another apped it will become
	// 'Authorization' : 'Basic eos32df== Basic eos32df==' and request will fail.
	// that's why only login appends 'authorization' header and saves it to hash
	// creds = mail : pass 

	// private creds: string;

	logout(){
		// TODO
		// this.headers.delete('Authorization');
		// and clear this.hash also any storage
		// variable must be set to initial value.
	}
	
	login(email, password){
		let data = {};
		let creds = email + ':' + password;
		this.hash = btoa('Basic '+ this.base64.encodeStringToString(creds));
		// this.base64.encode(this.creds);
		console.log('Encoded: ', this.hash, ' decoded: ', atob(this.hash));
		
		this.headers.delete('Authorization');
		this.headers.append('Authorization', atob(this.hash));
		// this.headers.append('Authorization', 'Basic YWJAdmlyYWxwYXNzaW9uLmdyOilJSlMoI1gxZUpMT0YhWmpteUUxNSk0bg==');
		let options = new RequestOptions({
			headers: this.headers
		});		

		return this._http.post(this.api + '/login', data, options).map( res => res.json()).toPromise();
	}


	getPendingRequestsByHotel(id){
		
		let options = new RequestOptions({
			headers: this.headers
		});		

		return this._http.get(this.api + '/hotelbookings/' + id + '/status/pending', options).map( res => res.json()).toPromise();
	}

	getAcceptedRequestsByHotel(id: string){
		
		let options = new RequestOptions({
			headers: this.headers
		});		

		// return this._http.post(this.api + '/hotelbookings/id/' + id + '/status/active', data, options).map( res => res.json()).toPromise();
		return this._http.get(this.api + '/hotelbookings/' + id + '/status/active', options).map( res => res.json()).toPromise();
	}

	getPastRequestsByHotel(id){

		let options = new RequestOptions({
			headers: this.headers
		});		

		return this._http.post(this.api + '/hotelbookings/' + id + '/status/inactive', options).map( res => res.json()).toPromise();
	}

	claimBookingByRef(){
		let data = {};
		 
		let options = new RequestOptions({
			headers: this.headers
		});		

		return this._http.post(this.api + '', data, options).map( res => res.json()).toPromise();
	}
}
