import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root",
})
export class NavigatorService {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(["/register"]);
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
  goToHome() {
    this.router.navigate(["/home"]);
  }
  goToComposeEmail() {
    this.router.navigate(["/home","composeEmail"]);
  }
  goToMangeEmails() {
    this.router.navigate(["/home", "MangeEmails"]);
  }
}
