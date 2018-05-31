import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";

/**
 * Generated class for the ButtonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: "ButtonsPage"
})
@Component({
	selector: "page-buttons",
	templateUrl: "buttons.html"
})
export class ButtonsPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public app: App
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad ButtonsPage");
	}
}
