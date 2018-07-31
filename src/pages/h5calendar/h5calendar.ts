///<reference path="../../services/servicesjs.d.ts"/>
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the H5calendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-h5calendar",
  templateUrl: "h5calendar.html"
})
export class H5calendarPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  toolbarTitle: string = "";
  ionViewDidLoad() {
    console.log("ionViewDidLoad H5calendarPage");
    this.initCalendar();
  }
  initCalendar() {
    let self = this;
    let calendar = new Calendar({
      container: "#calendar",
      backToToday: ".backToday", //使用内部方法会造成数据混乱
      dataRequest: function(currdate, callback, _this) {
        // 无日程安排
        var data = [];
        callback && callback(data);
      },
      onItemClick: function(item) {
        self.toolbarTitle = item.date;
      },
      swipeCallback: item => {
        self.toolbarTitle = item.date;
      },
      isDebug: false
    });
  }
  backToToday() {
    this.initCalendar();
  }
  /**
   * 将1,2,3,4,5格式化01,02,03,04,05
   * @param {Object} m 月份转换
   */
  tom(m) {
    if (parseInt(m) > 9) {
      m = "" + parseInt(m);
    } else {
      m = "0" + parseInt(m);
    }
    return m;
  }
  /**
   * 将1,2,3,4,5格式化01,02,03,04,05
   * @param {Object} 日转换
   */
  tod(d) {
    if (parseInt(d) > 9) {
      d = "" + parseInt(d);
    } else {
      d = "0" + parseInt(d);
    }
    return d;
  }
}
