import { Injectable } from "@angular/core";
import { HttpClientService } from "../../providers/http-service/httpClient";
import { APP_SERVE_URL } from "../../providers/http-service/constants";
@Injectable()
export class LoginService {
  constructor(public httpClientService: HttpClientService) {}
  login(params) {
    let url = APP_SERVE_URL + "/login"
    return this.httpClientService.post(url, params);
  }
}
