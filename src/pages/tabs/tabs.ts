import { Component, ElementRef, Renderer, ViewChild } from "@angular/core";
import { Events, Tabs, IonicPage, NavController, App } from "ionic-angular";
@IonicPage({
  name: "TabsPage"
})
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  @ViewChild("homeTabs")
  tabRef: Tabs;
  mb: any;
  tab1Root = "HomePage";
  tab2Root = "AboutPage";
  tab3Root = "ContactPage";
  tab4Root = "ListPage";
  tab5Root = "HttpClientListPage";
  menuList;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private event: Events,
    public navCtrl: NavController,
    public app: App
  ) {}
  ionViewDidLoad() {
    this.initMenu();
    let tabs = this.queryElement(this.elementRef.nativeElement, ".tabbar");
    this.event.subscribe("hideTabs", () => {
      this.renderer.setElementStyle(tabs, "display", "none");
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, ".scroll-content");
      this.mb = content.style["margin-bottom"];
      this.renderer.setElementStyle(content, "margin-bottom", "0");
    });
    this.event.subscribe("showTabs", () => {
      this.renderer.setElementStyle(tabs, "display", "");
      let SelectTab = this.tabRef.getSelected()._elementRef.nativeElement;
      let content = this.queryElement(SelectTab, ".scroll-content");
      this.renderer.setElementStyle(content, "margin-bottom", this.mb);
    });
  }
  queryElement(elem: HTMLElement, q: string): HTMLElement {
    return <HTMLElement>elem.querySelector(q);
  }
  initMenu() {
    this.menuList = [
      { title: "Action Sheets", component: "ActionSheetsPage", icon: "" },
      { title: "Echarts Demo", component: "EchartsDemoPage", icon: "" },
      { title: "Alerts", component: "AlertsPage", icon: "" },
      { title: "Buttons", component: "ButtonsPage", icon: "" },
      { title: "AppUpdate", component: "AppupdatePage", icon: "" },
      { title: "Gantt Chart", component: "GanttPage", icon: "" },
      { title: "Galendar", component: "CalendarPage", icon: "" },
      { title: "Share", component: "SharePage", icon: "" },
      { title: "VideoPlay", component: "VideoPage", icon: "" },
      { title: "Geolocation", component: "GeolocationPage", icon: "" },
      { title: "Galendar2", component: "Calendar2Page", icon: "" },
      { title: "SwiperCalendar", component: "SwiperCalendarPage", icon: "" },
      { title: "Gestures", component: "GesturesPage", icon: "" }
    ];
  }

  openPage(page) {
    this.navCtrl.push(page.component);
  }
}
