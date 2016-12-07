import { Injectable, NgZone } from "@angular/core";
import { Config } from "../config";
import { Grocery } from "./grocery";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class GroceryListService {

  groceryList = new BehaviorSubject([]);

  constructor(
    private ngZone: NgZone
  ) {
    this.load();
  }

  load() {
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

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
