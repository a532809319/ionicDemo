import { Component } from "@angular/core";
import { NavController, ViewController, IonicPage } from "ionic-angular";
@IonicPage({
	name: "SlidesDemo"
})
@Component({
	templateUrl: "slides.html"
})
export class SlidesDemo {
	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
