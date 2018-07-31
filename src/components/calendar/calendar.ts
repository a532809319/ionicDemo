import { Component, Input } from "@angular/core";

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "calendar",
  templateUrl: "calendar.html"
})
export class CalendarComponent {
  @Input() calendarData: Array<Array<string>>;
  listData: Array<Array<string>>;
  constructor() {}
  ionViewDidLoad() {
    debugger;
    this.listData = this.calendarData;
  }
}
