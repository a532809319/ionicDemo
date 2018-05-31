import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { APP_SERVE_URL } from "../../providers/http-service/constants";

@Injectable()
export class ListService {
	constructor(public httpService: HttpServiceProvider) {}
	getList() {
		console.log("请求list数据");
		return this.httpService.get(APP_SERVE_URL + "/users");
	}

	refreshList() {
		console.log("刷新list数据");
		return this.httpService.get(APP_SERVE_URL + "/users", {
			showLoading: false
		});
	}
}
