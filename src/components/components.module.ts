import { NgModule } from '@angular/core';
import { ActionSheetsComponent } from './action-sheets/action-sheets';
import { CalendarComponent } from './calendar/calendar';
@NgModule({
	declarations: [ActionSheetsComponent,
    CalendarComponent],
	imports: [],
	exports: [ActionSheetsComponent,
    CalendarComponent]
})
export class ComponentsModule {}
