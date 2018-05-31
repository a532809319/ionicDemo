import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	ActionSheetController
} from "ionic-angular";

declare var Wechat;
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-share",
	templateUrl: "share.html"
})
export class SharePage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheet: ActionSheetController
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad SharePage");
	}
	open() {
		this.actionSheet
			.create({
				buttons: [
					{
						text: "微信",
						handler: () => {
							debugger;
							Wechat.isInstalled(
								function(installed) {
									alert(
										"Wechat installed: " +
											(installed ? "Yes" : "No")
									);
								},
								function(reason) {
									alert("Failed: " + reason);
								}
							);
						}
					},
					{
						text: "朋友圈",
						handler: () => {}
					},
					{
						text: "取消",
						role: "cancle"
					}
				]
			})
			.present();
	}
}
