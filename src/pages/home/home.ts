import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController, ToastController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";
  dataReceive: string = "";

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private toastCtrl: ToastController, private sms: SMS) {
  }
  
  ionViewDidEnter(){
    this.checkBluetoothEnabled();
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showError("Por favor habilitar Bluetooth.")
    });
  }

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.showError("Por favor habilitar Bluetooth.")
      this.listToggle = false;
    });
  }

  enviarSMS(){
    this.sms.send('81997319463', 'Hello world!');
  }

  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.showError('Escolha o aparelho a ser conectado.');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
      this.showToast("Conectado com Sucesso!");
      this.receiveData();
    }, error => {
      this.showError("Error: Conectando ao aparelho.");
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      
      this.handleData(success);
      this.showToast("Connected Successfullly");
    }, error => {
      this.showError(error);
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.showToast("Aparelho Desconectado!");
  }

  handleData(data) {
    this.showToast(data);
    // this.dataReceive += '\n';
    // this.dataReceive += data;
    this.dataReceive = data;
    this.bluetoothSerial.clear();
  }

  sendData() {
    this.dataSend += '\n';
    this.showToast(this.dataSend);

    this.bluetoothSerial.write(this.dataSend).then(success => {
      this.showToast(success);
    }, error => {
      this.showError(error)
    });
  }

  showError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 500
    });
    toast.present();

  }

  receiveData() {
    this.bluetoothSerial.read()
      .then((data: any) => {
        console.log(data);
        this.dataReceive += '\n';
        this.dataReceive += data;
        this.bluetoothSerial.clear();
      });
  }

}

interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}