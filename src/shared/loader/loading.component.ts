import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'

@Injectable()
export class LoaderComponent{

    loading;

    constructor(public loadingCtrl: LoadingController) {


    }

    presentDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        this.loading.present();
    }

    dismissDefault(){
        this.loading.dismiss();
    }

    presentLoadingCustom() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
            <div class="custom-spinner-container">
                <div class="custom-spinner-box"></div>
            </div>`,
            duration: 5000
        });

        this.loading.onDidDismiss(() => {
            console.log('Dismissed loading');
        });

        this.loading.present();
    }


    presentLoadingText(text?: string) {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: text ? text  : 'Loading Please Wait...'
        });

        this.loading.present();
    }

    dismissLoadingText(){
        this.loading.dismiss();
    }
}