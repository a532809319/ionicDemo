import { Component, ViewChild } from "@angular/core";
import {
    NavController,
    IonicPage,
    NavParams,
    Navbar,
    Platform,
    ViewController,
    App
} from "ionic-angular";

@IonicPage({
    name: "listDetailPage",
    segment: "listDetail/:id"
})
@Component({
    selector: "page-listDetail",
    templateUrl: "listDetail.html"
})
/**
 *let 作用域为定义的程序块；var 作用域不太好控制；const 定义时必须赋值并不可更改；
 **/
export class ListDetailPage {
    personInfo: Object;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public viewCtrl: ViewController,
        public app: App
    ) {
        this.personInfo = this.navParams.get("personInfo");
    }

    @ViewChild(Navbar) navBar: Navbar;

    ionViewDidLoad() {
        debugger;
        // this.event.publish("hideTabs");
        this.navBar.setBackButtonText("返回");
        // this.navBar.backButtonClick = this.backButtonClick;
    }

    //回调传参
    backButtonClick = () => {
        // do something
        let callback = this.navParams.get("callback");
        let params = {
            refresh: true
        };
        callback(params).then(
            result => {
                //返回成功
                this.navCtrl.pop();
            },
            err => {
                //失败
                console.log(err);
            }
        );
    };
}
