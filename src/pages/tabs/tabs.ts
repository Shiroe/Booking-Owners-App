import { Component } from '@angular/core';

import { AcceptedPage } from '../accepted/accepted';
import { PendingPage } from '../pending/pending';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'tabs-footer',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  accepted: any = AcceptedPage;
  pending: any = PendingPage;
  history: any = HistoryPage;

  constructor() {

  }
}
