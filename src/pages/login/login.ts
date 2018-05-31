import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from './loginService';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
  username: any;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    let params = {
      username: this.username,
      password: this.password
    }
    debugger;
    this.loginService.login(params).then(res => {

    });
  }
  checkValid() {
    console.log(this.username);
  }
}
