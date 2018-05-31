import { Component } from "@angular/core";
import { NavController, LoadingController, IonicPage } from "ionic-angular";
import { ListService } from "./listService";
@IonicPage({
  name: "ListPage"
})
@Component({
  selector: "page-list",
  templateUrl: "list.html"
})
export class ListPage {
  //依赖注入
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public listService: ListService
  ) {}
  items = [
    "Pokémon Yellow",
    "Super Metroid",
    "Mega Man X",
    "The Legend of Zelda",
    "Pac-Man",
    "Super Mario World",
    "Street Fighter II",
    "Half Life",
    "Final Fantasy VII",
    "Star Fox",
    "Tetris",
    "Donkey Kong III",
    "GoldenEye 007",
    "Doom",
    "Fallout",
    "GTA",
    "Halo"
  ];
  //接收返回值
  listData: Array<Object>;
  //跳转回调方法
  listDetailCallback = params => {
    return new Promise((resolve, reject) => {
      console.log("调用了回调函数");
      if (typeof params != "undefined") {
        console.log(params);
        if (params.refresh) {
          this.getListData();
        }
      }
      resolve();
    });
  };
  goToDetailPage(detailInfo) {
    console.log(detailInfo);
    this.navCtrl.push("listDetailPage", {
      id: detailInfo.id,
      personInfo: detailInfo,
      callback: this.listDetailCallback
    });
  }
  //下拉刷新
  doRefresh(refresher) {
    this.listService.refreshList().then(data => {
      console.log(data);
      this.listData = data;
      refresher.complete();
    });
  }

  //上拉加载
  loadMore(infinite) {
    this.listService.refreshList().then(data => {
      this.listData.push.apply(this.listData, data);
      infinite.complete();
    });
  }
  //资源加载完毕
  ionViewDidLoad() {
    // this.getListData();
  }
  ionViewDidEnter() {
    this.getListData();
  }
  getListData() {
    console.log("请求网络数据");
    this.listService.getList().then(data => {
      this.listData = data;
    });
  }
}
