import { Component, ViewChild } from "@angular/core";
import {
  Platform,
  App,
  Nav,
  ToastController,
  Keyboard,
  MenuController,
  AlertController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";
import { AppVersion } from "@ionic-native/app-version";

// import { TabsPage } from "../pages/tabs/tabs";
// import { WelcomePage } from "../pages/welcome/welcome";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { ListPage } from "../pages/list/list";

declare var screen: any;
@Component({
  templateUrl: "app.html"
})
export class DemoApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any; //= TabsPage;

  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    public app: App,
    public toastCtrl: ToastController,
    public appVersion: AppVersion,
    public keyboard: Keyboard,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // debugger;
      // statusBar.overlaysWebView(true);
      statusBar.styleDefault();
      // statusBar.styleLightContent();
      statusBar.backgroundColorByHexString("#f8f8f8");
      splashScreen.hide();

      if (window.hasOwnProperty("cordova")) {
        //固定竖屏
        screen.orientation.lock("portrait-primary");

        this.appVersion.getVersionNumber().then(vNum => {
          console.log("getVersionNumber:" + vNum);
          //第一次进入加载引导页
          this.storage.get("firstIn_" + vNum).then(result => {
            // result=false;
            if (result) {
              this.storage.get("gesture_pwd").then(res => {
                if (res) {
                  // this.rootPage = "LockPage";
                  this.rootPage = "TabsPage";
                } else {
                  this.rootPage = "TabsPage";
                }
              });
            } else {
              this.storage.set("firstIn_" + vNum, true);

              this.rootPage = "WelcomePage";
            }
          });
        });
      } else {
        //第一次进入加载引导页
        this.storage.get("firstIn_").then(result => {
          // result=false;
          if (result) {
            this.storage.get("gesture_pwd").then(res => {
              if (res) {
                // this.rootPage = "LockPage";
                this.rootPage = "TabsPage";
              } else {
                this.rootPage = "TabsPage";
              }
            });
          } else {
            this.storage.set("firstIn_", true);
            this.rootPage = "WelcomePage";
          }
        });
      }
      this.registerBackButtonAction();
    });
  }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      let activePortal =
        this.app._appRoot._modalPortal.getActive() ||
        this.app._appRoot._overlayPortal.getActive();
      let loadingPortal = this.app._appRoot._loadingPortal.getActive();
      if (activePortal) {
        //如果是确认弹出框(Alert)则返回键无效
        let componentName = activePortal.component.name;
        if (componentName === "AlertCmp") {
          return;
        }
        //其他的关闭
        activePortal.dismiss().catch(() => {});
        activePortal.onDidDismiss(() => {});
        return;
      }
      if (this.menuCtrl.isOpen()) {
        return this.menuCtrl.close();
      }
      if (loadingPortal) {
        //loading的话，返回键无效
        return;
      }
      let activeNav = this.app.getActiveNavs()[0];
      let page = activeNav.getActive().instance;
      if (
        page instanceof HomePage ||
        page instanceof AboutPage ||
        page instanceof ListPage ||
        page instanceof ContactPage
      ) {
        //通过menu侧边栏打开的页面通过下面的方式返回
        if (this.nav.canGoBack()) {
          return this.nav.pop();
        }
        return this.exitApp();
      } else {
        this.app.goBack();
      }
    }, 10);
  }
  //退出应用
  registerBackButton;
  exitApp() {
    if (this.registerBackButton) {
      this.platform.exitApp();
    } else {
      this.registerBackButton = true;
      this.toastCtrl
        .create({
          message: "再按一次退出应用",
          duration: 2000,
          position: "bottom",
          cssClass: "toast-black"
        })
        .present();
      setTimeout(() => {
        this.registerBackButton = false;
      }, 2000); //2秒内未再次点击
    }
  }
}
