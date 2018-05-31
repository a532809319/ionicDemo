import { Component, ViewChild } from "@angular/core";
import {
	NavController,
	ModalController,
	MenuController,
	IonicPage
} from "ionic-angular";
import { Slides } from "ionic-angular";

// import { SlidesDemo } from "../slides/slides";
@IonicPage()
@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	@ViewChild("homeSlides") slides: Slides;
	constructor(
		public navCtrl: NavController,
		private modalCtrl: ModalController,
		public menuCtrl: MenuController
	) {}
	showModal() {
		let modal = this.modalCtrl.create("SlidesDemo");
		modal.present();
	}
	ionViewDidEnter() {
		this.slides.startAutoplay(); //配合stopAutoplay解决跳转到其他页超过设置的自动播放时间后自动播放失效的问题
		this.slides.autoplayDisableOnInteraction = false; //解决手动滑动后自动播放失效的问题
	}
	ionViewDidLeave() {
		this.slides.stopAutoplay();
	}

	openLock() {
		console.log("打开手势密码页");
		this.navCtrl.push("LockPage");
	}
	openMenu1() {
		this.menuCtrl.enable(false, "menu2");
		this.menuCtrl.enable(true, "menu1");
		this.menuCtrl.open();
	}
	openPage() {
		this.navCtrl.push("LoginPage");
	}
}
