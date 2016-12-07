import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";

import { Grocery} from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import * as SocialShare from "nativescript-social-share";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
  groceryList: Array<Grocery> = [];
  grocery = "";
  isLoading = true;
  listLoaded = true;
  lista;

  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(
    private groceryListService: GroceryListService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.groceryListService.groceryList
    .subscribe((data) => {
      this.lista = data;
      console.log("Lista", JSON.stringify(this.lista));
      this.isLoading = false;
    });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery)
    .then((ret) => {
      console.log("vuelve", ret);
      this.grocery = "";
    });
  }

  delete(grocery) {
    this.groceryListService.delete(grocery);
  }

  share() {
    let list = [];
    for (let i = 0, size = this.groceryList.length; i < size ; i++) {
      list.push(this.groceryList[i].name);
    }
    let listString = list.join(", ").trim();
    SocialShare.shareText(listString);
  }
}
