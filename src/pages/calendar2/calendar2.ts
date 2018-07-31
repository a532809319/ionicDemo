///<reference path="../../services/servicesjs.d.ts"/>
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the Calendar2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// declare var Swiper;
@IonicPage()
@Component({
  selector: "page-calendar2",
  templateUrl: "calendar2.html"
})
export class Calendar2Page {
  segmentsArray = ["segmentOne", "segmentTwo", "segmentThree"];
  segmentModel: string = this.segmentsArray[0];
  listData: any;
  swiper: any;
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    this.calendarData(year, month, day);
    this.initSwiper();
  }
  swipeEvent(event) {
    //向左滑
    if (event.direction == 2) {
      if (this.segmentsArray.indexOf(this.segmentModel) < 2) {
        this.segmentModel = this.segmentsArray[
          this.segmentsArray.indexOf(this.segmentModel) + 1
        ];
      }
    }
    //向右滑
    if (event.direction == 4) {
      if (this.segmentsArray.indexOf(this.segmentModel) > 0) {
        this.segmentModel = this.segmentsArray[
          this.segmentsArray.indexOf(this.segmentModel) - 1
        ];
      }
    }
  }
  //组装数据
  calendarData(year, month, day) {
    let calendarData = {
      date: year + "年" + month + "月" + day + "日",
      year: year,
      month: month,
      day: day,
      list: []
    };
    //获取本月多少天
    let monthDays = this.getMonthDays(year, month);
    //获取本月1号位置
    let firstDay = this.getFirstDay(year, month);
    //获取上个月多少天
    let prevYear = year;
    let prevMonth = month;
    if (month === 1) {
      prevYear = year - 1;
      prevMonth = 12;
    } else {
      prevMonth = month - 1;
    }
    let prevMonthDays = this.getMonthDays(prevYear, prevMonth);
    let daysList = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      daysList.push(prevMonthDays - i);
    }
    for (let i = 1; i <= monthDays; i++) {
      daysList.push(i);
    }

    const len = 7 - (daysList.length % 7);
    for (let i = 1; i <= len; i++) {
      daysList.push(i);
    }

    let list = [];
    for (let j = 1; j <= daysList.length / 7; j++) {
      list.push(daysList.slice(list.length * 7, j * 7));
    }
    this.listData = list;
  }

  //判断是否润年
  leapYear(year) {
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      return true;
    }
    return false;
  }
  //判断某年某月的1号是星期几
  getFirstDay(year, month) {
    let allDay = 0;
    let y = year - 1;
    allDay =
      y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
    for (let i = 1; i < month; i++) {
      switch (i) {
        case 1:
          allDay += 31;
          break;
        case 2:
          if (this.leapYear(year)) {
            allDay += 29;
          } else {
            allDay += 28;
          }
          break;
        case 3:
          allDay += 31;
          break;

        case 4:
          allDay += 30;
          break;
        case 5:
          allDay += 31;
          break;
        case 6:
          allDay += 30;
          break;
        case 7:
          allDay += 31;
          break;
        case 8:
          allDay += 31;
          break;
        case 9:
          allDay += 30;
          break;
        case 10:
          allDay += 31;
          break;
        case 11:
          allDay += 30;
          break;
        default:
          allDay += 31;
          break;
      }
    }
    return allDay % 7;
  }
  getMonthDays(year, month) {
    let monthDay = 31;
    switch (month) {
      case 1:
        monthDay = 31;
        break;
      case 2:
        if (this.leapYear(year)) {
          monthDay = 29;
        } else {
          monthDay = 28;
        }
        break;
      case 3:
        monthDay = 31;
        break;
      case 4:
        monthDay = 30;
        break;
      case 5:
        monthDay = 31;
        break;
      case 6:
        monthDay = 30;
        break;
      case 7:
        monthDay = 31;
        break;
      case 8:
        monthDay = 31;
        break;
      case 9:
        monthDay = 30;
        break;
      case 10:
        monthDay = 31;
        break;
      case 11:
        monthDay = 30;
        break;
      default:
        monthDay = 31;
        break;
    }
    return monthDay;
  }
  initSwiper() {
    this.swiper = new Swiper(".pageMenuSlides .swiper-container", {
      loop: true
    });
  }
}
