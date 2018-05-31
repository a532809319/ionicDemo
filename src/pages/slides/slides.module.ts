import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SlidesDemo } from "./slides";

@NgModule({
	declarations: [SlidesDemo],
	imports: [IonicPageModule.forChild(SlidesDemo)]
})
export class SlidesDemoModule {}
