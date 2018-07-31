import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwiperCalendarPage } from './swiper-calendar';

@NgModule({
  declarations: [
    SwiperCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(SwiperCalendarPage),
  ],
})
export class SwiperCalendarPageModule {}
