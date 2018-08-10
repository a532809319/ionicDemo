///<reference path="../../services/servicesjs.d.ts"/>
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from "ionic-angular";

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
  monthViewCalendar: any;
  weekViewCalendar: any;
  allDate: Array<any>; //所有月日历数据
  activeDate: any = { year: "", month: "", day: "", date: "" };
  curDateTime: string;
  allWeekData: Array<any>; //存储所有周日历数据
  calendarType: string = "month"; //日历视图类型，默认为月视图
  monthViewHeight: number; //月视图高度
  weekViewHeight: number; //周视图高度
  monthViewTop: number; //月视图距顶部距离
  contentViewTop: number; //内容视图距顶部距离
  monthTopMin: number; //月视图距离顶部的最小距离
  monthTopMax: number = 0; //月视图距离顶部的最大距离
  contentTopMin: number; //内容视图距离顶部的最小距离=周视图的高度
  contentTopMax: number; //内容视图距离顶部的最大距离=monthViewHeight
  intervalDate: string; //选中日期和当前实际日期相差的天数
  showBackButton: boolean = true; //是否显示返回今天按钮
  startDargContentScollTop: number; //开始拖动时内容视图的scroll
  @ViewChild(Content)
  content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  ionViewDidLoad() {
    //设置今日日期
    let date = new Date();
    this.curDateTime =
      date.getFullYear() +
      "-" +
      this.formatNum(date.getMonth() + 1) +
      "-" +
      this.formatNum(date.getDate());
    //分别初始化月视图和周视图
    this.initMonthView();
    this.initWeekView();
  }
  //返回今天
  backToToday() {
    this.intervalDate = "";
    if (this.calendarType == "week") {
      this.refreshMonthCalendar(this.curDateTime);
      this.refreshWeekCalendar(this.curDateTime);
      $(".week-calendar-view").css("z-index", 10);
    } else {
      if (this.monthViewCalendar) {
        this.monthViewCalendar.destroy(true);
      }
      if (this.weekViewCalendar) {
        this.weekViewCalendar.destroy(true);
      }
      this.initMonthView();
      this.initWeekView();
    }
  }
  //初始化月视图
  initMonthView(dateStr?) {
    let date = new Date();
    if (dateStr) {
      date = new Date(dateStr);
    }
    let curYear = date.getFullYear();
    let curMonth = date.getMonth() + 1;
    let curDay = date.getDate();
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

    this.activeDate = {
      year: curYear,
      month: this.formatNum(curMonth),
      day: this.formatNum(curDay),
      date:
        curYear + "-" + this.formatNum(curMonth) + "-" + this.formatNum(curDay)
    };
    let curhtml =
      "<div class='swiper-slide swiper-slide-active'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";
    for (let i = 0; i < curdataObj.length; i++) {
      if (curdataObj[i].dateTime == this.curDateTime) {
        let activeTemplate =
          '<div class="em-calendar-item em-calendar-active em-calendar-curd  isforbid{{isforbid}}" date="{{dateTime}}"><span class="day"> {{day}} </span><p class="lunar">今天</p></div>';
        curhtml += Mustache.render(activeTemplate, curdataObj[i]);
      } else {
        curhtml += Mustache.render(template, curdataObj[i]);
      }
    }
    curhtml += "</div></div></div>";

    document.querySelector("#monthSwiperWrapper").innerHTML = prehtml + curhtml;
    this.monthViewHeight = $(".month-calendar-view").outerHeight(true);
    //内容视图距顶部最大位置等于月视图的高度
    this.contentTopMax = this.monthViewHeight;
    //设置内容视图的位置=月视图的高度-月视图当前距底部的实际距离
    if (this.calendarType == "month") {
      this.contentViewTop = this.monthViewHeight;
    }
    $(".calendar-content-view").css("top", this.contentViewTop + "px");
    this.addMonthEvents();
  }
  /**
   * 为月视图添加点击及滑动事件
   */
  addMonthEvents() {
    let self = this;
    this.monthViewCalendar = new Swiper(".month-calendar-view", {
      initialSlide: 1,
      on: {
        tap: function(event) {
          let _this = event.target.parentNode;

          if (_this.classList.contains("isforbid1")) {
            let date = new Date(_this.getAttribute("date"));
            self.activeDate.year = date.getFullYear();
            self.activeDate.month = self.formatNum(date.getMonth() + 1);
            self.activeDate.day = self.formatNum(date.getDate());
            self.activeDate.date = _this.getAttribute("date");
            let parentE = _this.parentNode;
            let e = parentE.children;
            for (let i = 0; i < e.length; i++) {
              if (e[i] == _this) {
                _this.classList.add("em-calendar-active");
              } else {
                e[i].classList.remove("em-calendar-active");
              }
            }
            //点击刷新周视图数据
            self.refreshWeekCalendar(_this.getAttribute("date"));
            self.calTimeInterval(self.activeDate.date); //计算时间差
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
            let monthDays = self.calDaysByYearMonth(year, month);
            if (day > monthDays) {
              day = monthDays;
            }
            self.activeDate = {
              year: year,
              month: self.formatNum(month),
              day: self.formatNum(day),
              date:
                year + "-" + self.formatNum(month) + "-" + self.formatNum(day)
            };

            //根据选中日期刷新周视图数据,注意首次加载不要执行
            self.refreshWeekCalendar(self.activeDate.date);
            self.calTimeInterval(self.activeDate.date); //计算时间差
          }
          //设置选中项
          let activeDate =
            self.activeDate.year +
            "-" +
            self.formatNum(self.activeDate.month) +
            "-" +
            self.formatNum(self.activeDate.day);

          //设置月视图中选中项
          let el = this.el.children[0].children;
          let activeEl: any;
          for (let i = 0; i < el.length; i++) {
            if (el[i].classList.contains("swiper-slide-active")) {
              activeEl = el[i].children[0].children[0].children;
              break;
            }
          }

          for (let i = 0; i < activeEl.length; i++) {
            if (activeEl[i].getAttribute("date") == activeDate) {
              activeEl[i].classList.add("em-calendar-active");
            } else {
              activeEl[i].classList.remove("em-calendar-active");
            }
          }
          //向左滑动，月份递增
          let lastDate = self.allDate[self.allDate.length - 1];
          let nextYear = lastDate.year;
          let nextMonth = parseInt(lastDate.month) + 1;
          if (nextMonth == 13) {
            nextYear++;
            nextMonth = 1;
          }
          //向月视图仓库中添加数据
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
          let monthDays = self.calDaysByYearMonth(year, month);
          if (day > monthDays) {
            day = monthDays;
          }
          self.activeDate = {
            year: year,
            month: self.formatNum(month),
            day: self.formatNum(day),
            date: year + "-" + self.formatNum(month) + "-" + self.formatNum(day)
          };
          self.calTimeInterval(self.activeDate.date); //计算时间差
          //设置选中项
          let activeDate =
            self.activeDate.year +
            "-" +
            self.formatNum(self.activeDate.month) +
            "-" +
            self.formatNum(self.activeDate.day);
          //根据选中日期刷新周视图数据
          self.refreshWeekCalendar(activeDate);
          //设置选中项
          let el = this.el.children[0].children;
          let activeEl: any;
          for (let i = 0; i < el.length; i++) {
            if (el[i].classList.contains("swiper-slide-active")) {
              activeEl = el[i].children[0].children[0].children;
              break;
            }
          }

          for (let i = 0; i < activeEl.length; i++) {
            if (activeEl[i].getAttribute("date") == activeDate) {
              activeEl[i].classList.add("em-calendar-active");
            } else {
              activeEl[i].classList.remove("em-calendar-active");
            }
          }

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
        }
      }
    });
  }
  //组装月视图数据
  assembleData(dateObj?) {
    let dataObj = [];
    let date = new Date();
    let nowYear = date.getFullYear();
    let nowMonth = date.getMonth() + 1;

    if (dateObj) {
      nowYear = dateObj.year;
      nowMonth = dateObj.month;
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
        dateTime: preYear + "-" + month + "-" + day,
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
  /**
   * 计算周视图数据
   * @param dateParam 出入String格式日期参数
   */
  weekCalendarData(strDate?) {
    //默认当前月
    let date = new Date();
    if (strDate) {
      date = new Date(strDate);
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    //但前月总天数
    let curMonthDays = parseInt(this.calDaysByYearMonth(year, month));
    //获取当前week位置0代表周日
    let week = date.getDay();
    let dataObj = [];
    if (day - week < 1) {
      //获取上月总天数
      let preYear = year;
      let preMonth = month - 1;
      if (preMonth == 0) {
        preYear--;
        preMonth = 12;
      }
      let preMonthDays = parseInt(this.calDaysByYearMonth(preYear, preMonth));
      for (let i = week - day; i >= 0; i--) {
        dataObj.push({
          year: preYear,
          month: preMonth,
          day: preMonthDays - i,
          lundar: ""
        });
      }
      let len = dataObj.length;
      for (let i = 1; i <= 7 - len; i++) {
        dataObj.push({ year: year, month: month, day: i });
      }
    } else if (day + 6 - week > curMonthDays) {
      for (let i = week; i > 0; i--) {
        dataObj.push({ year: year, month: month, day: day - i });
      }
      for (let i = day; i <= curMonthDays; i++) {
        dataObj.push({ year: year, month: month, day: i });
      }
      let nextYear = year;
      let nextMonth = month + 1;
      if (nextMonth == 13) {
        nextYear++;
        nextMonth = 1;
      }
      let len2 = dataObj.length;
      for (let i = 1; i <= 7 - len2; i++) {
        dataObj.push({ year: nextYear, month: nextMonth, day: i });
      }
    } else {
      for (let i = day - week; i < day - week + 7; i++) {
        dataObj.push({ year: year, month: month, day: i });
      }
    }
    for (let i = 0; i < dataObj.length; i++) {
      let lunar = calendarUtils.solar2lunar(
        dataObj[i].year,
        dataObj[i].month,
        dataObj[i].day
      );
      let lunarDay = lunar.IDayCn;
      if (lunar.lDay == 1) {
        lunarDay = lunar.IMonthCn;
      }
      dataObj[i].lunar = lunarDay;
      dataObj[i].month = this.formatNum(dataObj[i].month);
      dataObj[i].day = this.formatNum(dataObj[i].day);
      dataObj[i].dateTime =
        year + "-" + dataObj[i].month + "-" + dataObj[i].day;
    }
    return dataObj;
  }
  //渲染周视图
  renderWeekViewCalendar(dataObj, template) {
    let html =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";

    for (let i = 0; i < dataObj.length; i++) {
      html += Mustache.render(template, dataObj[i]);
    }
    html += "</div></div></div>";
    return html;
  }
  //初始化周视图
  initWeekView(dateStr?) {
    let date = new Date();
    if (dateStr) {
      date = new Date(dateStr);
    }
    let activeDate =
      date.getFullYear() +
      "-" +
      this.formatNum(date.getMonth() + 1) +
      "-" +
      this.formatNum(date.getDate());
    this.activeDate = {
      year: date.getFullYear(),
      month: this.formatNum(date.getMonth() + 1),
      day: this.formatNum(date.getDate()),
      date: activeDate
    };
    let curWeekData = this.weekCalendarData(activeDate);
    //前一周
    let curDateFirst = curWeekData[0];
    let firstDate: any = new Date(curDateFirst.dateTime);
    let preDate = this.getDateOfAdd(firstDate, -7);
    let preWeekData = this.weekCalendarData(
      preDate.getFullYear() +
        "-" +
        (preDate.getMonth() + 1) +
        "-" +
        preDate.getDate()
    );
    this.allWeekData = [];
    this.allWeekData.push(preWeekData);
    this.allWeekData.push(curWeekData);
    let template = this.getHtmlTemplate();
    let prehtml =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";
    for (let i = 0; i < preWeekData.length; i++) {
      prehtml += Mustache.render(template, preWeekData[i]);
    }
    prehtml += "</div></div></div>";

    let curhtml =
      "<div class='swiper-slide'><div class='em-calendar-content'><div class='em-calendar-wrapper'>";
    for (let i = 0; i < curWeekData.length; i++) {
      if (this.curDateTime == curWeekData[i].dateTime) {
        let activeTemplate =
          '<div class="em-calendar-item em-calendar-active em-calendar-curd  isforbid{{isforbid}}" date="{{dateTime}}"><span class="day"> {{day}} </span><p class="lunar">今天</p></div>';
        curhtml += Mustache.render(activeTemplate, curWeekData[i]);
      } else {
        curhtml += Mustache.render(template, curWeekData[i]);
      }
    }
    curhtml += "</div></div></div>";
    document.querySelector("#weekSwiperWrapper").innerHTML = prehtml + curhtml;
    this.weekViewHeight = $(".week-calendar-view").outerHeight(true);
    this.addWeekViewEvents();
  }
  //周视图添加事件
  addWeekViewEvents() {
    let self = this;
    this.weekViewCalendar = new Swiper(".week-calendar-view", {
      initialSlide: 1,
      on: {
        tap: function(event) {
          let _this = event.target.parentNode;
          self.activeDate.date = _this.getAttribute("date");
          let parentE = _this.parentNode;
          let e = parentE.children;
          for (let i = 0; i < e.length; i++) {
            if (e[i] == _this) {
              _this.classList.add("em-calendar-active");
            } else {
              e[i].classList.remove("em-calendar-active");
            }
          }
          //根据周视图选中日期刷新月视图数据
          self.refreshMonthCalendar(_this.getAttribute("date"));
          self.calTimeInterval(self.activeDate.date); //计算时间差
        },
        slideNextTransitionStart: function() {
          if (self.allWeekData.length > 2) {
            let date = self.getDateOfAdd(new Date(self.activeDate.date), 7);
            self.activeDate.year = date.getFullYear();
            self.activeDate.month = self.formatNum(date.getMonth() + 1);
            self.activeDate.day = self.formatNum(date.getDate());
            self.activeDate.date =
              date.getFullYear() +
              "-" +
              self.formatNum(date.getMonth() + 1) +
              "-" +
              self.formatNum(date.getDate());

            //根据周视图选中日期刷新月视图数据,注意首次加载不要执行
            self.refreshMonthCalendar(self.activeDate.date);
            self.calTimeInterval(self.activeDate.date); //计算时间差
          }

          //设置选中项
          let el = this.el.children[0].children;

          let activeEl: any;
          for (let i = 0; i < el.length; i++) {
            if (el[i].classList.contains("swiper-slide-active")) {
              activeEl = el[i].children[0].children[0].children;
              break;
            }
          }

          for (let i = 0; i < activeEl.length; i++) {
            if (activeEl[i].getAttribute("date") == self.activeDate.date) {
              activeEl[i].classList.add("em-calendar-active");
            } else {
              activeEl[i].classList.remove("em-calendar-active");
            }
          }

          //递加
          let weekData = self.allWeekData[self.allWeekData.length - 1];
          let lastDateOfWeek = weekData[weekData.length - 1].dateTime;
          let lastWeekDate: any = new Date(lastDateOfWeek);
          let nextWeekDate = self.getDateOfAdd(lastWeekDate, 7);
          let nextWeek = self.weekCalendarData(
            nextWeekDate.getFullYear() +
              "-" +
              (nextWeekDate.getMonth() + 1) +
              "-" +
              nextWeekDate.getDate()
          );
          self.allWeekData.push(nextWeek);
          let template = self.getHtmlTemplate();
          this.appendSlide(self.renderWeekViewCalendar(nextWeek, template));
        },
        slidePrevTransitionStart: function() {
          let date = self.getDateOfAdd(new Date(self.activeDate.date), -7);
          self.activeDate.year = date.getFullYear();
          self.activeDate.month = self.formatNum(date.getMonth() + 1);
          self.activeDate.day = self.formatNum(date.getDate());
          self.activeDate.date =
            date.getFullYear() +
            "-" +
            self.formatNum(date.getMonth() + 1) +
            "-" +
            self.formatNum(date.getDate());
          //根据周视图选中日期刷新月视图数据
          self.refreshMonthCalendar(self.activeDate.date);
          self.calTimeInterval(self.activeDate.date); //计算时间差
          //设置选中项
          let el = this.el.children[0].children;
          let activeEl: any;
          for (let i = 0; i < el.length; i++) {
            if (el[i].classList.contains("swiper-slide-active")) {
              activeEl = el[i].children[0].children[0].children;
              break;
            }
          }

          for (let i = 0; i < activeEl.length; i++) {
            if (activeEl[i].getAttribute("date") == self.activeDate.date) {
              activeEl[i].classList.add("em-calendar-active");
            } else {
              activeEl[i].classList.remove("em-calendar-active");
            }
          }
          //递减
          let weekData = self.allWeekData[0];
          let firstDateOfWeek = weekData[0].dateTime;
          let firstDate = new Date(firstDateOfWeek);
          let preWeekDate = self.getDateOfAdd(firstDate, -7);
          let preWeek = self.weekCalendarData(
            preWeekDate.getFullYear() +
              "-" +
              (preWeekDate.getMonth() + 1) +
              "-" +
              preWeekDate.getDate()
          );
          let ar = [preWeek];
          self.allWeekData = ar.concat(self.allWeekData);
          let template = self.getHtmlTemplate();
          this.prependSlide(self.renderWeekViewCalendar(preWeek, template));
        }
      }
    });
  }
  /**
   * 获取当前日期前后N天的日期
   * @param addDaysNum
   */
  getDateOfAdd(oldDate: Date, addDaysNum: number) {
    let date = new Date();
    let millisec = oldDate.getTime() + addDaysNum * 24 * 3600 * 1000;
    date.setTime(millisec);
    return date;
  }
  /**
   * 根据当前活动月计算月视图和周视图移动后距顶部的距离
   */
  calMinAndMaxTop() {
    //日历行高
    let rowHeight = $(".week-calendar-view").outerHeight(true);
    //根据当前选择的日期计算月视图及内容视图距离顶部最小距离
    let activeDate = this.activeDate;
    //获取当前选中月的全部数据
    let activeMonth = this.assembleData(activeDate);

    let rowIndex = 0;
    for (let i = 0; i < activeMonth.length; i++) {
      if (activeDate.date == activeMonth[i].dateTime) {
        rowIndex = Math.floor(i / 7);
        break;
      }
    }
    this.monthTopMin = -rowIndex * rowHeight;
    this.contentTopMin = rowHeight;
  }
  //开始滑动
  calendarDragStart(event) {
    //初始化monthViewTop和contentViewTop
    this.monthViewTop = $(".month-calendar-view").position().top;
    this.contentViewTop = $(".calendar-content-view").position().top;
    //计算各视图位置最大与最小值
    this.calMinAndMaxTop();
    //开始滑动时内容视图滚动条的位置
    this.startDargContentScollTop = $(".calendar-content-view").scrollTop();
  }
  //滑动中
  calendarDrag(event) {
    //滑动的距离,向上滑动为负，向下滑动为正
    let deltaY = event.detail.deltaY;
    //下滑至临界点,设置5px缓冲
    if (deltaY > 0) {
      if (deltaY > this.startDargContentScollTop + 5) {
        $(".calendar-content-view").css("overflow-y", "hidden");
        deltaY = deltaY - this.startDargContentScollTop;
        $(".week-calendar-view").css("z-index", -999);
        this.calendarType = "month";
      } else {
        return;
      }
    }
    //上滑临界点,设置5px缓冲,晚5px显示周视图
    if (
      deltaY < 0 &&
      Math.abs(deltaY) > this.contentTopMax - this.weekViewHeight + 5
    ) {
      // 计算内容视图高度并设置为可滚动
      if (($(".month-calendar-view").position().top = this.monthTopMin)) {
        let contentHeight = this.content.contentHeight;
        let contentViewHeight = contentHeight - this.weekViewHeight;
        $(".calendar-content-view").css({
          height: contentViewHeight + "px",
          "overflow-y": "scroll"
        });
        // $(".week-calendar-view").css("z-index", 10);
        this.calendarType = "week";
      }
    }
    let monthViewTop = this.monthViewTop + deltaY;
    if (monthViewTop >= this.monthTopMin && monthViewTop <= this.monthTopMax) {
      $(".month-calendar-view").css("top", monthViewTop + "px");
    }
    let contentViewTop = this.contentViewTop + deltaY;
    if (
      contentViewTop >= this.contentTopMin &&
      contentViewTop <= this.contentTopMax
    ) {
      $(".calendar-content-view").css("top", contentViewTop + "px");
    }
  }
  //滑动结束
  calendarDragEnd(event) {
    let deltaY = event.detail.deltaY;
    console.log("滑动结束:" + deltaY);
    //下滑结束,补足滚动距离显示月视图
    if (deltaY > 0) {
      if (deltaY > this.startDargContentScollTop + 5) {
        this.calendarType = "month";
        $(".month-calendar-view").animate({ top: this.monthTopMax + "px" });
        $(".calendar-content-view").animate({ top: this.contentTopMax + "px" });
      }
    }
    //上滑结束,补足滚动部分显示周视图
    if (deltaY < 0) {
      $(".month-calendar-view").animate(
        { top: this.monthTopMin + "px" },
        () => {
          this.calendarType = "week";
          // 计算内容视图高度并设置为可滚动
          let contentHeight = this.content.contentHeight;
          let contentViewHeight = contentHeight - this.weekViewHeight;
          $(".calendar-content-view").css({
            height: contentViewHeight + "px",
            "overflow-y": "scroll"
          });
          $(".week-calendar-view").css("z-index", 10);
        }
      );
      $(".calendar-content-view").animate({ top: this.contentTopMin + "px" });
    }
  }
  /**
   * 以下方式实现月视图和周视图联动
   */
  /**
   * 根据周视图当前选中日期刷新月视图数据
   */
  refreshMonthCalendar(dateTime: string) {
    if (this.monthViewCalendar) {
      this.monthViewCalendar.destroy(true);
    }
    //重新计算各视图的位置
    this.calMinAndMaxTop();
    $(".month-calendar-view").css("top", this.monthTopMin + "px");
    if (this.calendarType == "week") {
      this.contentViewTop = this.contentTopMin;
    } else {
      this.contentViewTop = this.contentTopMax;
    }
    this.initMonthView(dateTime);
  }
  /**
   * 根据月视图选中日期刷新周视图数据
   */
  refreshWeekCalendar(dateTime: string) {
    if (this.weekViewCalendar) {
      this.weekViewCalendar.destroy(true);
    }
    this.initWeekView(dateTime);
  }

  //监听内容视图滚动事件
  contentViewScroll(event) {
    let scrollTop = event.target.scrollTop;
    if (scrollTop > 0) {
      $(".week-calendar-view").css({
        "border-bottom": "1px solid #c8c7cc",
        "z-index": 15
      });
    } else {
      if (this.calendarType == "week") {
        $(".week-calendar-view").css({
          "border-bottom": "0px solid #c8c7cc",
          "z-index": 10
        });
      } else {
        $(".week-calendar-view").css({
          "border-bottom": "0px solid #c8c7cc",
          "z-index": -999
        });
      }
    }
  }
  //计算选中日期和当前实际日期差
  calTimeInterval(activeDateTime: string) {
    let curDate = new Date(this.curDateTime);
    let activeDate = new Date(activeDateTime);
    let intervalTime = activeDate.getTime() - curDate.getTime();
    if (intervalTime > 0) {
      let interval = Math.floor(intervalTime / (24 * 3600 * 1000));
      if (interval == 1) {
        this.intervalDate = "明天";
      } else if (interval == 2) {
        this.intervalDate = "后天";
      } else {
        this.intervalDate = interval + "天后";
      }
    } else {
      let interval = Math.abs(Math.floor(intervalTime / (24 * 3600 * 1000)));
      if (interval == 1) {
        this.intervalDate = "昨天";
      } else if (interval == 2) {
        this.intervalDate = "前天";
      } else {
        this.intervalDate = interval == 0 ? "" : interval + "天前";
      }
    }
  }
}
