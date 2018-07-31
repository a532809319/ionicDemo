import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Network } from "@ionic-native/network";
import { OpenNativeSettings } from "@ionic-native/open-native-settings";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
/**
 * Generated class for the GeolocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-geolocation",
  templateUrl: "geolocation.html"
})
export class GeolocationPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public networkInterface: NetworkInterface,
    public network: Network,
    public openNativeSettings: OpenNativeSettings,
    public bluetoothSerial: BluetoothSerial
  ) {}
  latitude: number = 0;
  longitude: number = 0;
  ip: string = "";
  subnet: string = "";
  networkType: string = "";
  ionViewDidLoad() {
    console.log("ionViewDidLoad GeolocationPage");
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("network was disconnected :-(");
    });
    disconnectSubscription.unsubscribe();

    let connectSubscription = this.network.onConnect().subscribe(() => {
      debugger;
      console.log("network connected!");
      // let type = this.network.type;
    });
    connectSubscription.unsubscribe();
    this.networkType = this.network.type;
  }
  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then(res => {
        debugger;
        console.log(res.coords.latitude);
        console.log(res.coords.longitude);
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
      })
      .catch(error => {
        console.log(error);
      });
  }
  getNetworkInterface() {
    this.networkInterface
      .getWiFiIPAddress()
      .then(adress => {
        debugger;
        this.ip = adress.ip;
        this.subnet = adress.subnet;
      })
      .catch(error => {
        console.log(error);
      });
  }
  getNetworkType() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log("network was disconnected :-(");
    });
    disconnectSubscription.unsubscribe();

    let connectSubscription = this.network.onConnect().subscribe(() => {
      debugger;
      console.log("network connected!");
      // let type = this.network.type;
    });
    connectSubscription.unsubscribe();
  }
  openWifi() {
    this.openNativeSettings.open("wifi").then(res => {
      debugger;
      console.log("");
    });
  }
  isEnabled: boolean = false;
  isConnected: boolean = false;
  checkBluetooth() {
    this.bluetoothSerial
      .isEnabled()
      .then(res => {
        debugger;
        this.isEnabled = true;
      })
      .catch(error => {
        debugger;
        this.isEnabled = false;
      });
    this.bluetoothSerial
      .isConnected()
      .then(res => {
        debugger;
        this.isConnected = true;
      })
      .catch(error => {
        debugger;
        this.isConnected = false;
      });
  }
}
