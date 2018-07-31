import { NgModule, ErrorHandler } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { DemoApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Network } from "@ionic-native/network";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
//拦截器
import {
  HttpInterceptorModule,
  HttpInterceptorService
} from "ng-http-interceptor";
import { HttpServiceProvider } from "../providers/http-service/http-service";
import { ListService } from "../pages/list/listService";
import { Camera } from "@ionic-native/camera";
import { Keyboard } from "@ionic-native/keyboard";
import { AppVersion } from "@ionic-native/app-version";
import { StreamingMedia } from "@ionic-native/streaming-media";
// import { AppUpdate } from "@ionic-native/app-update";
import { Calendar } from "@ionic-native/calendar";
import { HttpClientService } from "../providers/http-service/httpClient";

@NgModule({
  declarations: [DemoApp],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpInterceptorModule,
    HttpClientModule,
    IonicModule.forRoot(DemoApp, {
      backButtonText: "",
      tabsHideOnSubPages: "true", //ionic3隐藏全部子页面tabs
      mode: "ios" //把所有平台设置为iOS风格：
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [DemoApp],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    HttpInterceptorModule,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    HttpServiceProvider,
    ListService,
    Camera,
    Keyboard,
    AppVersion,
    Calendar,
    HttpClientService,
    StreamingMedia,
    Geolocation,
    NetworkInterface,
    Network,
    OpenNativeSettings,
    BluetoothSerial
  ]
})
export class AppModule {
  constructor(http: Http, httpInterceptor: HttpInterceptorService) {
    //请求添加拦截器
    httpInterceptor.request().addInterceptor((data, method) => {
      return data;
    });
    httpInterceptor.response().addInterceptor((res, method) => {
      return res;
    });
  }
}
