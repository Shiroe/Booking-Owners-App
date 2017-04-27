import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp }            from './app.component';

import { AcceptedPage }     from '../pages/accepted/accepted';
import { BookingComponent } from '../pages/booking/booking.component';
import { HistoryPage }      from '../pages/history/history';
import { LoginPage }        from '../pages/login/login';
import { PendingPage }      from '../pages/pending/pending';
import { TabsPage }         from '../pages/tabs/tabs';

import { BookingModalService }  from '../pages/booking/booking.service';
import { HeaderComponent }      from '../shared/headerComponent/header.component';
import { LoaderComponent }      from '../shared/loader/loading.component';
import { ServerService }        from '../shared/server/server.service';
import { StorageService }       from '../shared/storage/storage.service';

import { DateTransformPipe }    from '../shared/pipes/dateTransform.pipe';
import { DateDifferencePipe }    from '../shared/pipes/dateDiff.pipe';
import { Base64 }               from '../shared/encoding/base64';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0d4aafde'
  },
  'push': {
    'sender_id': '249311632410',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#ff0000'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    PendingPage,
    HistoryPage,
    AcceptedPage,
    TabsPage,
    LoginPage,
    HeaderComponent,
    BookingComponent,
    DateTransformPipe,
    DateDifferencePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PendingPage,
    HistoryPage,
    AcceptedPage,
    TabsPage,
    LoginPage,
    HeaderComponent,
    BookingComponent,
    // DateTransformPipe
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ServerService, BookingModalService, Base64, LoaderComponent, StorageService]
})
export class AppModule {}
