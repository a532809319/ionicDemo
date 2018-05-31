import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController
} from "ionic-angular";

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: "AlertsPage"
})
@Component({
	selector: "page-alerts",
	templateUrl: "alerts.html"
})
export class AlertsPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad AlertsPage");
	}
	presentBasicAlert() {
		this.alertCtrl
			.create({
				title: "Basic Alert",
				subTitle: "这是Alert的基本用法展示",
				buttons: [
					{
						text: "OK",
						handler: () => {}
					}
				]
			})
			.present();
	}

	presentPromptAlert() {
		this.alertCtrl
			.create({
				title: "Prompt Alert",
				message: "请输入你的内容",
				inputs: [
					{
						name: "username",
						placeholder: "username"
					},
					{
						name: "password",
						placeholder: "passoword",
						type: "password"
					}
				],
				buttons: [
					{
						text: "Cancel",
						handler: data => {
							console.log("Cancel click:" + data);
						}
					},
					{
						text: "OK",
						handler: data => {
							console.log("OK click:" + data);
						}
					}
				]
			})
			.present();
	}
	presentConfirmationAlert() {
		this.alertCtrl
			.create({
				title: "Confirmation Alert",
				message: "请确认你的选择",
				buttons: [
					{
						text: "取消",
						handler: () => {
							console.log("click cancel");
						}
					},
					{
						text: "确认",
						handler: () => {
							console.log("click ok");
						}
					}
				]
			})
			.present();
	}
	presentRadioAlert() {
		let radioAlert = this.alertCtrl.create({
			enableBackdropDismiss: false
		});
		radioAlert.setTitle("请选择");
		radioAlert.addInput({
			type: "radio",
			label: "Blue",
			value: "blue",
			checked: true
		});
		radioAlert.addInput({
			type: "radio",
			label: "Green",
			value: "green",
			checked: false
		});
		radioAlert.addButton({
			text: "OK",
			handler: data => {
				console.log("选择的结果:" + data);
				let navTransition = radioAlert.dismiss();
				navTransition.then(() => {
					this.navCtrl.push("ButtonsPage");
				});
				return false;
			}
		});
		radioAlert.present();
	}
	presentCheckBoxAlert() {
		let checkBoxAlert = this.alertCtrl.create();
		checkBoxAlert.setTitle("请选择");
		checkBoxAlert.addInput({
			type: "checkbox",
			label: "beijing",
			value: "beijing",
			checked: true
		});
		checkBoxAlert.addInput({
			type: "checkbox",
			label: "shanghai",
			value: "shanghai",
			checked: false
		});
		checkBoxAlert.addInput({
			type: "checkbox",
			label: "tianjin",
			value: "tianjin",
			checked: false
		});
		checkBoxAlert.addButton("取消");
		checkBoxAlert.addButton({
			text: "确定",
			handler: data => {
				console.log("返回值：" + data);
			}
		});
		checkBoxAlert.present();
	}
}
