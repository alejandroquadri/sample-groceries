import { Injectable, NgZone } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Config } from "../config";
import { Grocery } from "./grocery";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";

import firebase = require("nativescript-plugin-firebase");
// declare var zonedCallback: Function;

@Injectable()
export class GroceryListService {

  groceryList = new BehaviorSubject([]);

  constructor(
    private http: Http,
    private ngZone: NgZone
  ) {
    this.load();
  }

  load() {
    // firebase.addValueEventListener(zonedCallback(this.onQueryEvent.bind(this)), "/list");
    firebase.addValueEventListener((result: any) => {
      this.ngZone.run(() => {
        this.onQueryEvent(result);
      });
    }, "/list")
    .then(ret => console.log("retorno", JSON.stringify(ret)));
  }

  onQueryEvent(result: any) {
    let list = [];
    if (result.value) {
      Object.keys(result.value).forEach((key) => {
        let entry = result.value[key];
        let newItem = {
          key: key,
          name: entry.name
        };
        list.push(newItem);
      });
    }
    this.groceryList.next(list);
    return Promise.resolve();
  }

  add(name: string) {
    return firebase.push(
        "/list",
        { "name": name, "Date": 0 - Date.now() }
      )
      .catch(this.handleErrors);
  }

  delete(item) {
    console.log("item id", item.key);
    return firebase.remove("/list/" + item.key)
    .then(() => console.log("borrado ", item.key))
    .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}
