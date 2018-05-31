import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "ionic-angular";
import "rxjs/add/operator/toPromise";
/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  loadingView: any;
  // showLoading: boolean = false;
  toastView: any;
  constructor(
    public http: Http,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}
  //格式化请求参数，支持数组和对象
  public get(url: string, paramObj?: any) {
    if (paramObj == undefined || paramObj.showLoading != false) {
      this.showLoadingView();
    }
    return this.http
      .get(url + this.toQueryString(paramObj))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public post(url: string, paramObj?: any) {
    let headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(
        url,
        this.toBodyString(paramObj),
        new RequestOptions({ headers: headers })
      )
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  public postBody(url: string, paramObj?: any) {
    let headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(url, paramObj, new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  private handleSuccess(result) {
    if (result && !result.success) {
      //由于和后台约定好,所有请求均返回一个包含success,msg,data三个属性的对象,所以这里可以这样处理
      // alert(result.msg);//这里使用ToastController
    }
    this.closeLoadView();
    return result;
  }

  private handleError(error: Response | any) {
    let msg = "请求失败";
    if (error.status == 0) {
      msg = "请求地址错误";
    }
    if (error.status == 400) {
      msg = "请求无效";
      console.log("请检查参数类型是否匹配");
    }
    if (error.status == 404) {
      msg = "请求资源不存在";
      console.error(msg + "，请检查路径是否正确");
    }
    console.log(error);
    this.toastView = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "middle",
      dismissOnPageChange: true
    });
    this.toastView.present();
    this.closeLoadView();
    return { success: false, msg: msg };
  }

  /**
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'王小二',city:'beijing'};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E7%8E%8B%E5%B0%8F%E4%BA%8C&city=beijing"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        //数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else {
        //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return "?" + ret.join("&");
  }

  /**
   *
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'王小二',city:'beijing'};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E7%8E%8B%E5%B0%8F%E4%BA%8C&city=beijing"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        //数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else {
        //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join("&");
  }

  private toQueryPair(key, value) {
    if (typeof value == "undefined") {
      return key;
    }
    return key + "=" + encodeURIComponent(value === null ? "" : String(value));
  }

  showLoadingView() {
    this.loadingView = this.loadingCtrl.create({
      content: "加载中..",
      dismissOnPageChange: false
    });
    this.loadingView.present();
    // this.showLoading = true;
  }
  closeLoadView() {
    this.loadingView.dismiss();
    // this.showLoading = false;
  }
}
