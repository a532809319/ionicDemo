import { Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { Calendar } from "@ionic-native/calendar";
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private renderer2: Renderer2
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarPage");
    this.calendar.createCalendar("myCalendar").then(
      msg => {
        console.log(msg);
      },
      err => {
        console.log(err);
      }
    );
  }

  openCalendar() {
    this.calendar.openCalendar(new Date());
  }
}
