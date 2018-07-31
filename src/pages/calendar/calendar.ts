import { Component, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { IonicPage, NavController, NavParams, Slides } from "ionic-angular";
import { Calendar } from "@ionic-native/calendar";
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild("box1") box1: ElementRef;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private renderer2: Renderer2
  ) {}

  value: Date;
  titleLable: string = "";
  titleValue: number[] = [];
  isLoad: boolean = true;
  listData: Array<Array<string>>;
  listData2: Array<Array<string>>;
  zh: any;
  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarPage");
    this.calendar.createCalendar("myCalendar").then(
      msg => {
        console.log(msg);
      },
      err => {
        console.log(err);
      }
    );
    this.init();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    this.calendarData(year, month, day);
    this.initPrimeng();
  }
  ngOnInit() {
    this.initPrimeng();
  }
  initPrimeng() {
    this.zh = {
      firstDayOfWeek: 0,
      dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      monthNamesShort: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      today: "今日",
      clear: "清除"
    };
  }
  openCalendar() {
    this.calendar.openCalendar(new Date());
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
  //组装日历
  showCalendar(year, month, day, firstDay) {
    let monthDay = this.getMonthDays(year, month);
    let showStr = "";
    let className = "";
    let today = new Date();

    showStr = "<table width='100%'><thead>";
    showStr +=
      "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
    showStr += "</thead><tbody><tr>";
    if (month == 1) {
      let preMonthDays = this.getMonthDays(year - 1, 12);
      for (let i = firstDay - 1; i >= 0; i--) {
        showStr += "<td class='cld-old'>" + (preMonthDays - i) + "</td>";
      }
    } else {
      let preMonthDays = this.getMonthDays(year, month - 1);
      //上个月后几天
      for (let i = firstDay - 1; i >= 0; i--) {
        showStr +=
          "<td class='cld-old'(click)='leftSlide()'>" +
          (preMonthDays - i) +
          "</td>";
      }
    }

    for (let i = 1; i <= monthDay; i++) {
      if (
        year === today.getFullYear() &&
        month === today.getMonth() + 1 &&
        i === today.getDate()
      ) {
        className = "cld-cur";
      } else {
        className = "cld-day";
      }
      // if (
      //   day === i &&
      //   (year > today.getFullYear() || month > today.getMonth() + 1)
      // ) {
      //   className = "cld-cur";
      // }
      showStr +=
        "<td value='" +
        year +
        "-" +
        month +
        "-" +
        i +
        "'><div class=" +
        className +
        " >" +
        i +
        "</div></td>";
      firstDay = (firstDay + 1) % 7;
      if (firstDay === 0 && i !== monthDay) {
        showStr += "</tr><tr>";
      }
    }
    //最后一行下个月头几日
    if (firstDay !== 0) {
      for (let i = 1; i <= 7 - firstDay; i++) {
        showStr += "<td class='cld-old' (click)='rightSlide()'>" + i + "</td>";
      }
    }
    showStr += "</tr></tbody></table>";

    return showStr;
  }
  //初始化
  init() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    this.titleLable = year + "年" + month + "月" + day + "日";
    this.titleValue = [year, month, day];
    this.initBox1(year, month, day);
    if (month == 12) {
      this.initBox2(year + 1, 1, day);
    } else {
      this.initBox2(year, month + 1, day);
    }
  }
  //监听滑动
  slideChanged() {
    if (this.isLoad) {
      this.isLoad = false;
      return;
    }
    let currentIndex = this.slides.getActiveIndex();
    let preIndex = this.slides.getPreviousIndex();
    let isBeginning = this.slides.isBeginning();
    let isEnd = this.slides.isEnd();

    let year = this.titleValue[0];
    let month = this.titleValue[1];
    let day = this.titleValue[2];

    if (currentIndex > preIndex) {
      if (month === 12) {
        ++year;
        month = 1;
      } else {
        ++month;
      }
      // this.titleValue = [year, month, day];
      // this.titleLable = year + "年" + month + "月" + day + "日";
      // if (isEnd) {
      //   this.initBox1(year, month, day);
      // } else {
      //   this.initBox2(year, month, day);
      // }
    } else {
      if (month === 1) {
        --year;
        month = 12;
      } else {
        --month;
      }
      // this.titleValue = [year, month, day];
      // this.titleLable = year + "年" + month + "月" + day + "日";
      // if (isBeginning) {
      //   this.initBox2(year, month, day);
      // } else {
      //   this.initBox1(year, month, day);
      // }
    }
    // this.titleValue = [year, month, day];
    // this.titleLable = year + "年" + month + "月" + day + "日";
    // this.calendarData(year, month, day);
    this.slides.slideTo(currentIndex, 300);
  }
  calendar1: string;
  calendar2: string;
  initBox1(year, month, day) {
    let firstDay = this.getFirstDay(year, month);
    let str = this.showCalendar(year, month, day, firstDay);
    let box1 = document.getElementsByClassName("box1");
    for (let i = 0; i < box1.length; i++) {
      box1[i].innerHTML = str;
      // this.calendar1 = str;
      // this.box1.nativeElement.innerHTML = str;
      this.renderer2.listen(box1[i], "click", event => {
        console.log(event.currentTarget.className);

        // debugger;
      });
    }
    // debugger;
    // let table = this.box1.nativeElement.querySelectorAll(".cld-day");
    // table.forEach(element => {
    //   this.renderer2.listen(element, "click", event => {
    //     console.log(event.currentTarget.className);

    //     // debugger;
    //   });
    // });
  }
  initBox2(year, month, day) {
    let firstDay = this.getFirstDay(year, month);
    let str = this.showCalendar(year, month, day, firstDay);
    let box2 = document.getElementsByClassName("box2");
    for (let i = 0; i < box2.length; i++) {
      box2[i].innerHTML = str;
      // this.calendar2 = str;
      // this.box1.nativeElement.innerHTML = str;
      this.renderer2.listen(box2[i], "click", event => {
        console.log(event.currentTarget.className);

        // debugger;
      });
    }
    // let table = this.box1.nativeElement.querySelectorAll(".cld-day");
    // table.forEach(element => {
    //   this.renderer2.listen(element, "click", event => {
    //     console.log(event.currentTarget.className);

    //     // debugger;
    //   });
    // });
  }
  leftSlide() {
    this.slides.slidePrev(300);
  }
  rightSlide() {
    this.slides.slideNext(300);
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
    // this.listData2 = list;
    this.titleLable = year + "年" + month + "月" + day + "日";
    this.titleValue = [year, month, day];
    // this.slides.update();
    this.slides.resize();
  }
  slideWillChange() {
    if (this.isLoad) {
      this.isLoad = false;
      return;
    }
    let currentIndex = this.slides.getActiveIndex();
    let preIndex = this.slides.getPreviousIndex();
    let isBeginning = this.slides.isBeginning();
    let isEnd = this.slides.isEnd();

    let year = this.titleValue[0];
    let month = this.titleValue[1];
    let day = this.titleValue[2];

    if (currentIndex > preIndex) {
      if (month === 12) {
        ++year;
        month = 1;
      } else {
        ++month;
      }
      // this.titleValue = [year, month, day];
      // this.titleLable = year + "年" + month + "月" + day + "日";
      // if (isEnd) {
      //   this.initBox1(year, month, day);
      // } else {
      //   this.initBox2(year, month, day);
      // }
    } else {
      if (month === 1) {
        --year;
        month = 12;
      } else {
        --month;
      }
      // this.titleValue = [year, month, day];
      // this.titleLable = year + "年" + month + "月" + day + "日";
      // if (isBeginning) {
      //   this.initBox2(year, month, day);
      // } else {
      //   this.initBox1(year, month, day);
      // }
    }
    this.titleValue = [year, month, day];
    this.titleLable = year + "年" + month + "月" + day + "日";
    this.calendarData(year, month, day);
  }
}
