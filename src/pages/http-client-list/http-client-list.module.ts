import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpClientListPage } from './http-client-list';

@NgModule({
  declarations: [
    HttpClientListPage,
  ],
  imports: [
    IonicPageModule.forChild(HttpClientListPage),
  ],
})
export class HttpClientListPageModule {}
