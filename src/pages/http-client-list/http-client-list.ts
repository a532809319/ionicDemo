import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { APP_SERVE_URL } from "../../providers/http-service/constants";
// import { HttpParams } from "@angular/common/http";
import { HttpClientService } from "../../providers/http-service/httpClient";
import { ListService } from "./clientService";
/**
 * Generated class for the HttpClientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-http-client-list",
	templateUrl: "http-client-list.html",
	providers: [ListService]
})
export class HttpClientListPage {
	listData: Array<Object>;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public httpClient: HttpClientService,
		public listService: ListService
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad HttpClientListPage");
		this.getList2();
	}
	getList() {
		let url = APP_SERVE_URL + "/users";
		this.httpClient.get(url).then(res => {
			debugger;
			this.listData = res;
		});
	}

	getList2() {
		//HttpParams对象 定义为const可以防篡改
		// const params = new HttpParams().set("id", 1);
		// const params = new HttpParams({ fromString: 'id=1&&name="ssdjie"' });
		this.listService.getList().then(res => {
			this.listData = res;
		});
	}
}
