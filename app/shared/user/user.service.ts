import { Injectable } from "@angular/core";
import { User } from "./user";
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class UserService {
  constructor() {}

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
      (result: any) => {
        return JSON.stringify(result);
      },
      (errorMessage: any) => {
        alert(errorMessage);
      }
    );
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    })
    .then((result: any) => {
          // BackendService.token = result.uid;
          // puede ser interesante ver como usa esto
          console.log("vuelve del login", JSON.stringify(result));
          return JSON.stringify(result);
    }, (errorMessage: any) => {
        alert(errorMessage);
    });
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
