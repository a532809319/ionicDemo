import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GanttPage } from './gantt';

@NgModule({
  declarations: [
    GanttPage,
  ],
  imports: [
    IonicPageModule.forChild(GanttPage),
  ],
})
export class GanttPageModule {}
