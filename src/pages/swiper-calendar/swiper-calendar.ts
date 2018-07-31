///<reference path="../../services/servicesjs.d.ts"/>
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SwiperCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-swiper-calendar",
  templateUrl: "swiper-calendar.html"
})
export class SwiperCalendarPage {
  ionCalendar: any;
  allDate: Array<any>;
  activeDate: any = { year: "", month: "", day: "" };
  curDate: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  ionViewDidLoad() {
    this.init();
  }
  backToToday() {
    this.ionCalendar.destroy();
    this.init();
  }
  init() {
    let date = new Date();
    let curYear = date.getFullYear();
    let curMonth = date.getMonth() + 1;
    let curDay = date.getDate();
    this.curDate = curYear + "-" + this.formatNum(curMonth);
    let preYear = curYear;
    let preMonth = curMonth - 1;
    if (preMonth == 0) {
      preYear--;
      preMonth = 12;
    }
    this.allDate = [
      {
        year: preYear,
        month: preMonth,
        day: 1
      }
    ];
    this.allDate.push({ year: curYear, month: curMonth, day: curDay });

    let predataObj = this.assembleData({
      year: preYear,
      month: preMonth,
      day: 1
    });
    let template = this.getHtmlTemplate();
    let prehtml =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";
    for (let i = 0; i < predataObj.length; i++) {
      prehtml += Mustache.render(template, predataObj[i]);
    }
    prehtml += "</div></div></div>";

    let curdataObj = this.assembleData({
      year: curYear,
      month: curMonth,
      day: curDay
    });
    let curhtml =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";
    for (let i = 0; i < curdataObj.length; i++) {
      let curDate = curdataObj[i].dateTime;
      let activeDate =
        curYear + "-" + this.formatNum(curMonth) + "-" + this.formatNum(curDay);
      if (activeDate == curDate) {
        let activeTemplate =
          '<div class="em-calendar-item em-calendar-active em-calendar-curd  isforbid{{isforbid}}" date="{{dateTime}}"><span class="day"> {{day}} </span><p class="lunar">今天</p></div>';
        curhtml += Mustache.render(activeTemplate, curdataObj[i]);
      } else {
        curhtml += Mustache.render(template, curdataObj[i]);
      }
    }
    curhtml += "</div></div></div>";
    this.activeDate = {
      year: curYear,
      month: this.formatNum(curMonth),
      day: this.formatNum(curDay)
    };
    document.querySelector("#swiper-wrapper").innerHTML = prehtml + curhtml;
    this.addEvents();
  }
  addEvents() {
    let self = this;
    this.ionCalendar = new Swiper("#ion-calendar", {
      initialSlide: 1,
      on: {
        tap: function(event) {
          let _this = event.target.parentNode;
          if (_this.classList.contains("isforbid1")) {
            let parentE = _this.parentNode;
            let e = parentE.children;
            for (let i = 0; i < e.length; i++) {
              if (e[i] == _this) {
                _this.classList.add("em-calendar-active");
              } else {
                e[i].classList.remove("em-calendar-active");
              }
            }
          }
        },
        slideNextTransitionStart: function() {
          //设置当前活动月
          if (self.allDate.length > 2) {
            let year = self.activeDate.year;
            let month = parseInt(self.activeDate.month) + 1;
            let day = self.activeDate.day;
            if (month == 13) {
              year++;
              month = 1;
            }
            self.activeDate = {
              year: year,
              month: self.formatNum(month),
              day: day
            };
          }
          //向左滑动，月份递增
          let lastDate = self.allDate[self.allDate.length - 1];
          let nextYear = lastDate.year;
          let nextMonth = parseInt(lastDate.month) + 1;
          if (nextMonth == 13) {
            nextYear++;
            nextMonth = 1;
          }
          //
          self.allDate.push({
            year: nextYear,
            month: nextMonth,
            day: 1
          });
          let dataObj = self.assembleData({
            year: nextYear,
            month: nextMonth,
            day: 1
          });
          let html = self.getHtmlTemplate();
          this.appendSlide(self.renderCalendar(dataObj, html));
          let activeDate =
            self.activeDate.year + "-" + self.formatNum(self.activeDate.month);
          // debugger;
          if (activeDate == self.curDate) {
            //当前月
          } else {
            var chooseDom = document.querySelector(
              ".swiper-slide-active .em-calendar-active"
            );
            if (chooseDom) {
              chooseDom.classList.remove("em-calendar-active");
            }
            document
              .querySelector(".swiper-slide-active .isforbid1")
              .classList.add("em-calendar-active");
          }
        },
        slidePrevTransitionStart: function() {
          //设置当前活动月
          let year = self.activeDate.year;
          let month = parseInt(self.activeDate.month) - 1;
          let day = self.activeDate.day;
          if (month == 0) {
            year--;
            month = 12;
          }
          self.activeDate = {
            year: year,
            month: self.formatNum(month),
            day: day
          };
          //向右滑动，月份递减
          let firstDate = self.allDate[0];
          let preYear = firstDate.year;
          let preMonth = parseInt(firstDate.month) - 1;
          let preDay = firstDate.day;
          if (preMonth == 0) {
            preYear--;
            preMonth = 12;
          }
          let preDate = [
            {
              year: preYear,
              month: preMonth,
              day: preDay
            }
          ];
          self.allDate = preDate.concat(self.allDate);
          let dataObj = self.assembleData({
            year: preYear,
            month: preMonth,
            day: 1
          });
          let html = self.getHtmlTemplate();
          this.prependSlide(self.renderCalendar(dataObj, html));

          let activeDate =
            self.activeDate.year + "-" + self.formatNum(self.activeDate.month);
          // debugger;
          if (activeDate == self.curDate) {
            //当前月
          } else {
            var chooseDom = document.querySelector(
              ".swiper-slide-active .em-calendar-active"
            );
            if (chooseDom) {
              chooseDom.classList.remove("em-calendar-active");
            }
            document
              .querySelector(".swiper-slide-active .isforbid1")
              .classList.add("em-calendar-active");
          }
        }
      }
    });
  }
  //组装数据
  assembleData(dateObj?) {
    let dataObj = [];
    let date = new Date();
    let nowYear = date.getFullYear();
    let nowMonth = date.getMonth() + 1;
    let nowDay = date.getDate();
    if (dateObj) {
      nowYear = dateObj.year;
      nowMonth = dateObj.month;
      nowDay = dateObj.day;
    }

    //获取当前月1号是星期几
    let dateTime = new Date(Date.parse(nowYear + "/" + nowMonth + "/01"));
    let weekDay = dateTime.getDay();
    if (weekDay == 0) {
      weekDay = 7;
    }
    //设置头部上月日期数据
    //获取上一月天数
    let preYear = nowYear;
    let preMonth = nowMonth - 1;
    if (preMonth == 0) {
      preYear--;
      preMonth = 12;
    }
    let preMonthDays = this.calDaysByYearMonth(preYear, preMonth);
    for (let i = 1; i <= weekDay; i++) {
      let month = this.formatNum(preMonth);
      let day = parseInt(preMonthDays) - weekDay + i;
      day = this.formatNum(day);
      let lunar = calendarUtils.solar2lunar(preYear, month, day);
      let lunarDay = lunar.IDayCn;
      if (lunar.lDay == 1) {
        lunarDay = lunar.IMonthCn;
      }
      dataObj.push({
        year: preYear,
        month: month,
        day: day,
        lunar: lunarDay,
        dateTime: preYear + "-" + preMonth + "-" + day,
        isforbid: "0"
      });
    }
    //设置本月数据
    //获取当前月的天数
    let curMonthDays = this.calDaysByYearMonth(nowYear, nowMonth);
    for (let i = 1; i <= parseInt(curMonthDays); i++) {
      let month = this.formatNum(nowMonth);
      let day = this.formatNum(i);
      let lunar = calendarUtils.solar2lunar(nowYear, month, day);
      let lunarDay = lunar.IDayCn;
      if (lunar.lDay == 1) {
        lunarDay = lunar.IMonthCn;
      }
      dataObj.push({
        year: nowYear,
        month: month,
        day: day,
        lunar: lunarDay,
        dateTime: nowYear + "-" + month + "-" + day,
        isforbid: "1"
      });
    }
    //设置下月数据
    let nextYear = nowYear;
    let nextMonth = nowMonth + 1;
    if (nextMonth == 13) {
      nextMonth = 1;
      nextYear++;
    }
    let len = 42 - dataObj.length;
    for (let i = 1; i <= len; i++) {
      let month = this.formatNum(nextMonth);
      let day = this.formatNum(i);
      let lunar = calendarUtils.solar2lunar(nextYear, month, day);
      let lunarDay = lunar.IDayCn;
      if (lunar.lDay == 1) {
        lunarDay = lunar.IMonthCn;
      }
      dataObj.push({
        year: nextYear,
        month: month,
        day: day,
        lunar: lunarDay,
        dateTime: nextYear + "-" + month + "-" + day,
        isforbid: "0"
      });
    }
    return dataObj;
  }
  /**
   * 获取html模版
   */
  getHtmlTemplate() {
    let template =
      '<div class="em-calendar-item  isforbid{{isforbid}}" date="{{dateTime}}"><span class="day"> {{day}} </span><p class="lunar">{{lunar}}</p></div>';
    return template;
  }
  /**
   * 渲染日历
   */
  renderCalendar(dataObj, template) {
    let html =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";

    for (let i = 0; i < dataObj.length; i++) {
      html += Mustache.render(template, dataObj[i]);
    }
    html += "</div></div></div>";
    return html;
  }
  /**
   * 根据年月计算当月总天数
   * @param year
   * @param month
   */
  calDaysByYearMonth(year, month) {
    year = parseInt(year);
    month = parseInt(month);
    if (month == 2) {
      if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        //闰月
        return "28";
      } else {
        return "29";
      }
    } else {
      if ([4, 6, 9, 11].indexOf(month) > -1) {
        return "30";
      } else {
        return "31";
      }
    }
  }
  /**
   * 格式化数字为两位,单位数补"0"
   */
  formatNum(num) {
    if (parseInt(num) < 10) {
      num = "0" + parseInt(num);
    } else {
      num = "" + num;
    }
    return num;
  }
}
