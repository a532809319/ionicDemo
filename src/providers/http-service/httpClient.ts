import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoadingController, ToastController } from "ionic-angular";
@Injectable()
export class HttpClientService {
	toastView: any;
	loadView: any;
	constructor(
		public http: HttpClient,
		public toastCtrl: ToastController,
		private loadCtrl: LoadingController
	) {}

	public get(url: string, params?: any) {
		if (params == undefined || params.showLoading != false) {
			this.openLoadingView();
		}
		return this.http
			.get(url, { params })
			.toPromise()
			.then(res => this.handleSuccess(res))
			.catch(error => this.handleError(error));
	}
	public post(url: string, params: any) {
		if (params == undefined || params.showLoading != false) {
			this.openLoadingView();
		}
		return this.http
			.post(url, params)
			.toPromise()
			.then(res => this.handleSuccess(res))
			.catch(error => this.handleError(error));
	}
	private handleSuccess(result) {
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
	openLoadingView() {
		this.loadView = this.loadCtrl.create({
			content: "加载中",
			dismissOnPageChange: false
		});
		this.loadView.present();
	}
	closeLoadView() {
		this.loadView.dismiss();
	}
}
