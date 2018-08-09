import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  StreamingMedia,
  StreamingVideoOptions
} from "@ionic-native/streaming-media";

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-video",
  templateUrl: "video.html"
})
export class VideoPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private streamingMedia: StreamingMedia
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad VideoPage");
    let options: StreamingVideoOptions = {
      successCallback: () => {
        console.log("Video played");
      },
      errorCallback: e => {
        console.log("Error streaming");
      },
      orientation: "portrait"
    }; //portrait,landscape
    this.streamingMedia.playVideo(
      "http://static.videogular.com/assets/videos/videogular.mp4",
      options
    );
  }
}
