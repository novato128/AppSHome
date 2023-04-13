webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sms__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, bluetoothSerial, toastCtrl, sms) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.bluetoothSerial = bluetoothSerial;
        this.toastCtrl = toastCtrl;
        this.sms = sms;
        this.listToggle = false;
        this.pairedDeviceID = 0;
        this.dataSend = "";
        this.dataReceive = "";
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.checkBluetoothEnabled();
    };
    HomePage.prototype.checkBluetoothEnabled = function () {
        var _this = this;
        this.bluetoothSerial.isEnabled().then(function (success) {
            _this.listPairedDevices();
        }, function (error) {
            _this.showError("Por favor habilitar Bluetooth.");
        });
    };
    HomePage.prototype.listPairedDevices = function () {
        var _this = this;
        this.bluetoothSerial.list().then(function (success) {
            _this.pairedList = success;
            _this.listToggle = true;
        }, function (error) {
            _this.showError("Por favor habilitar Bluetooth.");
            _this.listToggle = false;
        });
    };
    HomePage.prototype.enviarSMS = function () {
        this.sms.send('81997319463', 'Hello world!');
    };
    HomePage.prototype.selectDevice = function () {
        var connectedDevice = this.pairedList[this.pairedDeviceID];
        if (!connectedDevice.address) {
            this.showError('Escolha o aparelho a ser conectado.');
            return;
        }
        var address = connectedDevice.address;
        var name = connectedDevice.name;
        this.connect(address);
    };
    HomePage.prototype.connect = function (address) {
        var _this = this;
        // Attempt to connect device with specified address, call app.deviceConnected if success
        this.bluetoothSerial.connect(address).subscribe(function (success) {
            _this.deviceConnected();
            _this.showToast("Conectado com Sucesso!");
            _this.receiveData();
        }, function (error) {
            _this.showError("Error: Conectando ao aparelho.");
        });
    };
    HomePage.prototype.deviceConnected = function () {
        var _this = this;
        // Subscribe to data receiving as soon as the delimiter is read
        this.bluetoothSerial.subscribe('\n').subscribe(function (success) {
            _this.handleData(success);
            _this.showToast("Connected Successfullly");
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.deviceDisconnected = function () {
        // Unsubscribe from data receiving
        this.bluetoothSerial.disconnect();
        this.showToast("Aparelho Desconectado!");
    };
    HomePage.prototype.handleData = function (data) {
        this.showToast(data);
        // this.dataReceive += '\n';
        // this.dataReceive += data;
        this.dataReceive = data;
        this.bluetoothSerial.clear();
    };
    HomePage.prototype.sendData = function () {
        var _this = this;
        this.dataSend += '\n';
        this.showToast(this.dataSend);
        this.bluetoothSerial.write(this.dataSend).then(function (success) {
            _this.showToast(success);
        }, function (error) {
            _this.showError(error);
        });
    };
    HomePage.prototype.showError = function (error) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage.prototype.showToast = function (msj) {
        var toast = this.toastCtrl.create({
            message: msj,
            duration: 500
        });
        toast.present();
    };
    HomePage.prototype.receiveData = function () {
        var _this = this;
        this.bluetoothSerial.read()
            .then(function (data) {
            console.log(data);
            _this.dataReceive += '\n';
            _this.dataReceive += data;
            _this.bluetoothSerial.clear();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\rodrigo.batista\Desktop\sHome-master\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <ion-title>\n      APLICAÇÃO DE TESTES\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button ion-button full class="submit-button" (click)="listPairedDevices()">\n    <ion-icon name="refresh"></ion-icon>&nbsp;Recarregar aparelhos Bluetooth\n  </button>\n  <ion-row>\n    <ion-col>\n      <ion-list radio-group [(ngModel)]="pairedDeviceID" *ngIf="listToggle">\n        <ion-item *ngFor="let i of pairedList;let j=index">\n          <ion-label>{{i.name}}</ion-label>\n          <ion-radio value="{{j}}"></ion-radio>\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n  <button ion-button full class="submit-button" *ngIf="listToggle" (click)="selectDevice()">\n    <ion-icon name="bluetooth"></ion-icon>&nbsp;Connect Bluetooth Devices\n  </button>\n  <br />\n  <br />\n  <!-- <ion-list>\n    <ion-item>\n      <ion-label floating>Escreva o valor a ser enviado</ion-label>\n      <ion-input type="text" name="datasend" [(ngModel)]="dataSend"></ion-input>\n    </ion-item>\n  </ion-list> -->\n  <!-- <button ion-button full class="submit-button" (click)="sendData()">\n    <ion-icon name="send"></ion-icon>&nbsp;Enviar dados Via Bluetooth\n  </button> -->\n\n  <ion-list>\n    <br />\n    <br />\n    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valor Recebido:</p>\n    <br />\n    <!-- <ion-item> -->\n      <ion-input style="border: 1px solid #ccc" rows="11" [(ngModel)]="dataReceive" name="dataReceive" disabled>\n      </ion-input>\n      <!-- <ion-input type="text" name="dataReceive" [(ngModel)]="dataReceive"></ion-input> -->\n    <!-- </ion-item> -->\n  </ion-list>\n  <button ion-button full class="submit-button" (click)="enviarSMS()">\n    <ion-icon name="bluetooth"></ion-icon>&nbsp;Enviar SMS\n  </button>\n</ion-content>'/*ion-inline-end:"C:\Users\rodrigo.batista\Desktop\sHome-master\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_sms__["a" /* SMS */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_bluetooth_serial__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sms__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_sms__["a" /* SMS */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\rodrigo.batista\Desktop\sHome-master\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\rodrigo.batista\Desktop\sHome-master\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map