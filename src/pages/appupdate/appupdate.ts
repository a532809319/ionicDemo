import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular/umd";
import { AppUpdate } from "@ionic-native/app-update";
/**
 * Generated class for the AppupdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "AppupdatePage"
})
@Component({
  selector: "page-appupdate",
  templateUrl: "appupdate.html"
})
export class AppupdatePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appUpdate: AppUpdate
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AppupdatePage");
  }
  checkAppUpdate() {
    const updateUrl = "http://10.71.204.65:8100/update.xml";
    this.appUpdate.checkAppUpdate(updateUrl).then(() => {
      console.log("检查更新成功");
    });
  }
}
