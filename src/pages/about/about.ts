import { Component } from "@angular/core";
import { NavController, Events, IonicPage } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Keyboard } from "@ionic-native/keyboard";
@IonicPage({
	name: "AboutPage"
})
@Component({
	selector: "page-about",
	templateUrl: "about.html"
})
export class AboutPage {
	photo: Object;
	constructor(
		public navCtrl: NavController,
		private camera: Camera,
		private keyboard: Keyboard,
		private event: Events
	) {}
	ionViewDidLoad() {
		this.keyboard.onKeyboardShow().subscribe(() => {
			this.event.publish("hideTabs");
		});
		this.keyboard.onKeyboardHide().subscribe(() => {
			this.event.publish("showTabs");
		});
	}
	getPic() {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};
		this.camera.getPicture(options).then(
			imageData => {
				debugger;
				let base64Image = "data:image/jpeg;base64," + imageData;
				this.photo = base64Image;
				// alert(this.photo);
			},
			error => {}
		);
	}

	getPic2() {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		};

		this.camera.getPicture(options).then(
			imageData => {
				let base64Image = "data:image/jpeg;base64," + imageData;
				this.photo = base64Image;
				// alert(this.photo);
			},
			error => {}
		);
	}
}
