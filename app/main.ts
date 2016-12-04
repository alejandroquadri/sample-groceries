import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { setStatusBarColors } from "./utils/status-bar-util";

import firebase = require("nativescript-plugin-firebase");

firebase.init({
   persist: true
          }).then(
              function (instance) {
                console.log("firebase.init done");
              },
              function (error) {
                console.log("firebase.init error: " + error);
              }
          );

setStatusBarColors();
platformNativeScriptDynamic().bootstrapModule(AppModule);

// import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
// import { AppModule } from "./app.module";
// import firebase = require("nativescript-plugin-firebase");
//
// firebase.init({
//    persist: true
//           }).then(
//               function (instance) {
//                 console.log("firebase.init done");
//               },
//               function (error) {
//                 console.log("firebase.init error: " + error);
//               }
//           );
//
// platformNativeScriptDynamic().bootstrapModule(AppModule);
