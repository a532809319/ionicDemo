import { Component, ViewChild, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from "ionic-angular";
import { LoginPage } from "../login/login";

/**
 * Generated class for the GesturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-gestures",
  templateUrl: "gestures.html"
})
export class GesturesPage {
  @ViewChild(Content) content: Content;
  @ViewChild("div1") cdiv1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone
  ) {}
  contentTop: number;
  monthTop: number;
  calendarType: string = "month";
  monthScrollStop: boolean = false;
  ionViewDidLoad() {
    let el = $("ion-item").outerHeight(true);
    debugger;
  }
  dragStart(event) {
    console.log("start");
    //滑动开始隐藏周视图
    $("#week").hide();
    this.monthTop = $("#month").position().top;
    this.contentTop = $("#content").position().top;
  }
  drag(event) {
    let deltaY = event.detail.deltaY;
    console.log("deltaY:" + deltaY);
    let monthOffset = this.monthTop + deltaY;
    if (monthOffset >= -105.6 && monthOffset <= 0) {
      $("#month").css("top", monthOffset + "px");
    }
    let contentOffset = this.contentTop + deltaY;
    if (contentOffset >= 52.8 && contentOffset <= 264) {
      $("#content").css("top", contentOffset + "px");
    }
  }
  dragEnd(event) {
    if (this.monthTop != 0 && event.detail.deltaY > 0) {
      $("#month").animate({ top: "0px" });
      $("#content").animate({ top: "264px" });
    } else if (this.monthTop == 0 && event.detail.deltaY < 0) {
      $("#month").animate({ top: "-105.6px" }, function() {
        //周视图显示
        $("#week").show();
      });
      $("#content").animate({ top: "52.8px" });
    }
    this.showOrHiddenWeekView();
  }
  showOrHiddenWeekView() {
    let curMonthTop = $("#month").position().top;
    console.log("curMonthTop:" + curMonthTop);
    if (curMonthTop == -105.6) {
      $("#week").show();
    } else {
      $("#week").hide();
    }
  }
}
