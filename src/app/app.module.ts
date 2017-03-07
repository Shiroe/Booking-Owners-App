import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp }            from './app.component';
import { PendingPage }      from '../pages/pending/pending';
import { HistoryPage }      from '../pages/history/history';
import { AcceptedPage }     from '../pages/accepted/accepted';
import { TabsPage }         from '../pages/tabs/tabs';
import { LoginPage }        from '../pages/login/login';
import { HeaderComponent }  from '../shared/headerComponent/header.component';
import { ServerService }    from '../shared/server/server.service';

@NgModule({
  declarations: [
    MyApp,
    PendingPage,
    HistoryPage,
    AcceptedPage,
    TabsPage,
    LoginPage,
    HeaderComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PendingPage,
    HistoryPage,
    AcceptedPage,
    TabsPage,
    LoginPage,
    HeaderComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ServerService]
})
export class AppModule {}
