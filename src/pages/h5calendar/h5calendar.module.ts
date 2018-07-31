import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { H5calendarPage } from './h5calendar';

@NgModule({
  declarations: [
    H5calendarPage,
  ],
  imports: [
    IonicPageModule.forChild(H5calendarPage),
  ],
})
export class H5calendarPageModule {}
