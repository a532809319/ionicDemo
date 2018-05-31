import { Component, ElementRef, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
/**
 * Generated class for the LockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
	name: "LockPage",
	segment: "lock-page"
})
@Component({
	selector: "page-lock",
	templateUrl: "lock.html"
})
export class LockPage {
	@ViewChild("lockContainer") lockContainerRef: ElementRef;
	@ViewChild("lockcontent") lockcontent: ElementRef;
	@ViewChild("message") msgEl: ElementRef;
	@ViewChild("button_grid") buttonGrid: ElementRef;
	gesturePwd: any = {
		//模式:1 验证密码；2 设置密码 3 再次设置密码
		model: 1,
		pwd: "",
		tempPwd: []
	};
	timer: number;
	msgInfo: string = "";
	//画出n*n个圆
	n: number = 3;
	//存储圆半径
	r: number = 0;
	//用来存储所有圆的位置
	circles: Array<any> = [];
	//存储已触摸到的圆
	touchCircles: Array<any> = [];
	//存储未触摸到的圆
	restCircles: Array<any> = [];
	//判断是否touch到circle
	touchFlag: boolean = false;
	//判断是否需要重绘
	restDraw: boolean = false;
	canvas: any;
	canvas2: any;
	ctx: any;
	ctx2: any;
	width: number = 300;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage,
		public statusBar: StatusBar
	) {
		// this.statusBar.styleLightContent();
	}
	ionViewDidLoad() {
		this.createCanvas();
		this.createCircles();
		this.createListener();
		this.initPass();
	}

	createCanvas() {
		let container = this.lockContainerRef.nativeElement;
		let lockcontent = this.lockcontent.nativeElement;
		let elRect = lockcontent.getBoundingClientRect();
		this.width = elRect.width < 300 ? 300 : elRect.width;
		let canvas = document.createElement("canvas");
		canvas.width = canvas.height = this.width;
		container.appendChild(canvas);

		let canvas2 = document.createElement("canvas");
		canvas2.width = canvas2.height = this.width;
		canvas2.style.position = "absolute";
		canvas2.style.top = "80";
		canvas2.style.left = "0";
		container.appendChild(canvas2);

		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;

		this.ctx2 = canvas2.getContext("2d");
		this.ctx2.strokeStyle = "#f3b739";
		this.canvas2 = canvas2;
	}

	//创建密码所需的圆
	createCircles() {
		let n = this.n;
		let r = Math.floor(this.ctx.canvas.width / (2 + 4 * n));
		this.r = r;
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				let p = {
					x: j * 4 * r + 3 * r,
					y: i * 4 * r + 3 * r,
					id: i * 3 + j
				};
				this.circles.push(p);
				this.restCircles.push(p);
			}
		}
		this.drawCircles();
	}
	//画圆函数
	drawCircle(x, y, color) {
		this.ctx.strokeStyle = color ? color : "#f3b739";
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
		this.ctx.stroke();
		this.ctx.closePath();
	}
	//画所有圆
	drawCircles() {
		//防止重画
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.circles.forEach(res => {
			this.drawCircle(res.x, res.y, "#f3b739");
		});
	}
	//end时重绘已touch的圆
	drawEndCircles(color) {
		this.touchCircles.forEach(res => {
			this.drawCircle(res.x, res.y, color);
		});
	}
	//画折线函数
	drawLine() {
		let len = this.touchCircles.length;
		if (len >= 2) {
			this.ctx.beginPath();
			this.ctx.lineWidth = 3;
			this.ctx.moveTo(
				this.touchCircles[len - 2].x,
				this.touchCircles[len - 2].y
			);
			this.ctx.lineTo(
				this.touchCircles[len - 1].x,
				this.touchCircles[len - 1].y
			);
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}
	drawLine2TouchPos(p) {
		let len = this.touchCircles.length;
		if (len >= 1) {
			this.ctx2.clearRect(0, 0, this.width, this.width);
			this.ctx2.beginPath();
			this.ctx2.lineWidth = 3;
			this.ctx2.moveTo(
				this.touchCircles[len - 1].x,
				this.touchCircles[len - 1].y
			);
			this.ctx2.lineTo(p.x, p.y);
			this.ctx2.stroke();
			this.ctx2.closePath();
		}
	}
	//画实心点
	drawPoints() {
		let i = this.touchCircles.length - 1;
		if (i >= 0) {
			this.ctx.fillStyle = "#ff3095";
			this.ctx.beginPath();
			this.ctx.arc(
				this.touchCircles[i].x,
				this.touchCircles[i].y,
				this.r / 2,
				0,
				Math.PI * 2,
				true
			);
			this.ctx.closePath();
			this.ctx.fill();
		}
	}
	//获得触点相对位置
	getTouchPos(e) {
		let rect = e.target.getBoundingClientRect();
		let p = {
			x: e.touches[0].clientX - rect.left,
			y: e.touches[0].clientY - rect.top
		};
		return p;
	}
	//判断触点是否在圆内
	checkPos(p) {
		for (let i = 0; i < this.restCircles.length; i++) {
			let temp = this.restCircles[i];
			if (
				Math.abs(p.x - temp.x) < this.r &&
				Math.abs(p.y - temp.y) < this.r
			) {
				this.touchCircles.push(temp);
				this.restCircles.splice(i, 1);
				this.touchFlag = true;
				this.restDraw = true;
				break;
			}
		}
	}
	// 更新 touchmove
	update(p) {
		this.checkPos(p);
		this.drawLine2TouchPos(p);
		if (this.restDraw) {
			this.restDraw = false;
			this.drawPoints();
			this.drawLine();
		}
	}
	//重置
	rest() {
		this.drawCircles();
		this.ctx2.clearRect(0, 0, this.width, this.width);
	}
	//创建监听事件
	createListener() {
		this.canvas2.addEventListener(
			"touchstart",
			e => {
				let p = this.getTouchPos(e);
				this.restCircles = this.restCircles.concat(
					this.touchCircles.splice(0)
				);
				this.checkPos(p);
			},
			false
		);
		this.canvas2.addEventListener(
			"touchmove",
			e => {
				let p = this.getTouchPos(e);
				if (this.touchFlag) {
					this.update(p);
				} else {
					this.checkPos(p);
				}
			},
			false
		);
		this.canvas2.addEventListener(
			"touchend",
			e => {
				if (this.touchFlag) {
					this.touchFlag = false;
					this.checkPass();
					//清空touchCircle
					this.restCircles = this.restCircles.concat(
						this.touchCircles.splice(0)
					);
					this.ctx2.clearRect(0, 0, this.width, this.width);
					setTimeout(() => {
						this.rest();
					}, 300);
				}
			},
			false
		);
	}
	//初始化密码模式
	initPass() {
		this.storage.get("gesture_pwd").then(result => {
			console.log("存储的密码：" + result);
			if (result) {
				//验证密码
				this.gesturePwd.model = 1;
				//密码存储在本地时使用‘-’隔开
				this.gesturePwd.pwd = result.split("-");
			} else {
				//设置密码
				this.gesturePwd.model = 2;
			}
		});
	}
	//根据密码模式操作
	checkPass() {
		let model = this.gesturePwd.model;
		console.log("当前模式：" + model);
		//验证密码
		if (model == 1) {
			let flag = true;
			let localPwd = this.gesturePwd.pwd;
			let touchPwd = this.touchCircles;
			//长度不一致
			if (localPwd.length != touchPwd.length) {
				flag = false;
			} else {
				for (let i = 0, len = localPwd.length; i < len; i++) {
					if (localPwd[i] != touchPwd[i].id) {
						flag = false;
					}
				}
			}
			if (flag) {
				this.showInfo("密码正确");
				this.drawEndCircles("green"); // 绿色
				this.navCtrl.setRoot("TabsPage");
			} else {
				this.showInfo("密码错误");
				this.drawEndCircles("red"); // 红色
			}
		} else if (model == 2) {
			this.showInfo("请设置手势密码");
			if (this.touchCircles.length < 4) {
				this.showInfo("请最少连接4个点");
			} else {
				//将密码临时储存
				this.touchCircles.forEach(res => {
					this.gesturePwd.tempPwd.push(res.id);
				});
				//模式设置为3
				this.gesturePwd.model = 3;
				this.showInfo("请再次设置手势密码");
			}
		} else {
			let flag = true;
			let touchPwd = this.touchCircles;
			let tempPwd = this.gesturePwd.tempPwd;
			if (touchPwd.length != tempPwd.length) {
				flag = false;
			} else {
				for (let i = 0, len = tempPwd.length; i < len; i++) {
					if (tempPwd[i] != touchPwd[i].id) {
						flag = false;
					}
				}
			}
			if (flag) {
				this.gesturePwd.pwd = tempPwd;
				this.storage.set("gesture_pwd", tempPwd.join("-"));
				this.gesturePwd.model = 1;
				this.showInfo("设置成功");
				this.navCtrl.setRoot("TabsPage");
			} else {
				this.showInfo("两次密码不一致，请重新设置!");
				this.gesturePwd.model = 2;
			}
			this.gesturePwd.tempPwd = [];
		}
	}
	//显示提示信息
	showInfo(info) {
		clearTimeout(this.timer);
		this.msgInfo = info;
		this.timer = setTimeout(() => {
			this.msgInfo = "";
		}, 2000);
	}
	//清除密码
	removePwd() {
		this.storage.remove("gesture_pwd");
		this.gesturePwd.model = 2;
	}
}
