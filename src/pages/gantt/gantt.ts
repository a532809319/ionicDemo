import { Component, ElementRef, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as echarts from "echarts";
/**
 * Generated class for the GanttPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-gantt",
	templateUrl: "gantt.html"
})
export class GanttPage {
	@ViewChild("ganttDiv") container: ElementRef;
	chart: any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		let ctx = this.container.nativeElement;
		this.chart = echarts.init(ctx);
		let option = {
			title: {
				text: "项目实施进度表",
				left: 10
			},
			legend: {
				data: ["计划实施时间", "实际实施时间"]
			},
			grid: {
				containLabel: true,
				left: 20
			},
			xAxis: {
				type: "time"
			},

			yAxis: {
				data: [
					"任务一",
					"任务二",
					"任务三",
					"任务四",
					"任务五",
					"任务六",
					"任务七"
				]
			},
			tooltip: {
				trigger: "axis",
				formatter: function(params) {
					var res = params[0].name + "</br>";
					var date0 = params[0].data;
					var date1 = params[1].data;
					var date2 = params[2].data;
					var date3 = params[3].data;
					date0 =
						date0.getFullYear() +
						"-" +
						(date0.getMonth() + 1) +
						"-" +
						date0.getDate();
					date1 =
						date1.getFullYear() +
						"-" +
						(date1.getMonth() + 1) +
						"-" +
						date1.getDate();
					date2 =
						date2.getFullYear() +
						"-" +
						(date2.getMonth() + 1) +
						"-" +
						date2.getDate();
					date3 =
						date3.getFullYear() +
						"-" +
						(date3.getMonth() + 1) +
						"-" +
						date3.getDate();
					res +=
						params[0].seriesName +
						"~" +
						params[1].seriesName +
						":</br>" +
						date0 +
						"~" +
						date1 +
						"</br>";
					res +=
						params[2].seriesName +
						"~" +
						params[3].seriesName +
						":</br>" +
						date2 +
						"~" +
						date3 +
						"</br>";
					console.log(params[0]);
					return res;
				}
			},
			series: [
				{
					name: "计划开始时间",
					type: "bar",
					xAxisIndex: 0,
					stack: "计划",
					itemStyle: {
						color: "rgba(0,0,0,0)"
					},
					data: [
						new Date("2015/09/2"),
						new Date("2015/09/15"),
						new Date("2015/09/15"),
						new Date("2015/10/03"),
						new Date("2015/10/04"),
						new Date("2015/10/05"),
						new Date("2015/10/06")
					]
				},
				{
					name: "计划完成时间",
					type: "bar",
					xAxisIndex: 0,
					stack: "计划",
					data: [
						new Date("2015/09/12"),
						new Date("2015/09/20"),
						new Date("2015/09/25"),
						new Date("2015/10/05"),
						new Date("2015/10/07"),
						new Date("2015/10/09"),
						new Date("2015/10/12")
					]
				},
				{
					name: "实际开始时间",
					type: "bar",
					stack: "实际",
					itemStyle: {
						normal: {
							color: "rgba(0,0,0,0)"
						}
					},
					data: [
						new Date("2015/09/2"),
						new Date("2015/09/15"),
						new Date("2015/09/15"),
						new Date("2015/10/03"),
						new Date("2015/10/04"),
						new Date("2015/10/05"),
						new Date("2015/10/06")
					]
				},
				{
					name: "实际完成时间",
					type: "bar",
					stack: "实际",
					data: [
						new Date("2015/09/6"),
						new Date("2015/09/20"),
						new Date("2015/09/27"),
						new Date("2015/10/11"),
						new Date("2015/10/16"),
						new Date("2015/10/18"),
						new Date("2015/10/17")
					]
				}
			]
		};
		this.chart.setOption(option);
	}
}
