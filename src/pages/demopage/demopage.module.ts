import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemopagePage } from './demopage';

@NgModule({
  declarations: [
    DemopagePage,
  ],
  imports: [
    IonicPageModule.forChild(DemopagePage),
  ],
})
export class DemopagePageModule {}
