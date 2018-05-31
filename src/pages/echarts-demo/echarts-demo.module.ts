import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EchartsDemoPage } from './echarts-demo';

@NgModule({
  declarations: [
    EchartsDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(EchartsDemoPage),
  ],
})
export class EchartsDemoPageModule {}
