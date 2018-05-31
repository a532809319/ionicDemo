import { Injectable } from "@angular/core";
import { HttpClientService } from "../../providers/http-service/httpClient";
import { APP_SERVE_URL } from "../../providers/http-service/constants";
@Injectable()
export class ListService {
	constructor(public httpClientService: HttpClientService) {}
	getList(params?: any) {
		let url = APP_SERVE_URL + "/users";
		return this.httpClientService.get(url, params);
	}
}
