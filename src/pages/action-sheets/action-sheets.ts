import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";

/**
 * Generated class for the ActionSheetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: "ActionSheetsPage" })
@Component({
  selector: "page-action-sheets",
  templateUrl: "action-sheets.html"
})
export class ActionSheetsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ActionSheetsPage");
  }
  presentActionSheet() {
    this.actionSheetCtrl
      .create({
        title: "标题",
        buttons: [
          {
            text: "拍照",
            role: "destructive",
            handler: () => {
              console.log("拍照");
            }
          },
          {
            text: "相册",
            cssClass: "text-color",
            handler: () => {
              console.log("相册");
            }
          },
          {
            text: "取消",
            role: "cancel",
            handler: () => {
              console.log("取消");
            }
          }
        ]
      })
      .present();
  }
}
