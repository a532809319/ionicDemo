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
              Wechat.isInstalled(
                function(installed) {
                  if (installed) {
                    Wechat.share(
                      {
                        message: {
                          title: "测试微信分享",
                          description: "这里是分享内容描述",
                          thumb: "www/assets/imgs/shouye01.png",
                          media: {
                            type: Wechat.Type.IMAGE,
                            image: "www/assets/imgs/shouye01.png"
                          }
                        },
                        scene: Wechat.Scene.SESSION
                      },
                      success => {
                        alert("成功");
                      },
                      error => {
                        debugger;
                        alert("失败1" + error);
                      }
                    );
                  } else {
                    alert("Please install Wechat");
                  }
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
