import { Component } from "@angular/core";
import { NavController, ViewController, IonicPage } from "ionic-angular";

@IonicPage({
	name: "ContactPage"
})
@Component({
	selector: "page-contact",
	templateUrl: "contact.html"
})
export class ContactPage {
	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController
	) {}
	dismiss() {
		this.navCtrl.parent.select(0);
	}
}
