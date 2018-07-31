import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CalendarPage } from "./calendar";
import { CalendarComponent } from "../../components/calendar/calendar";
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [CalendarPage, CalendarComponent],
  imports: [
    CalendarModule,
    ButtonModule,
    IonicPageModule.forChild(CalendarPage)
  ]
})
export class CalendarPageModule {}
