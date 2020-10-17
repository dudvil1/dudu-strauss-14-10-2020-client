import { Component, OnInit } from "@angular/core";
import { NavigatorService } from "../../../services/navigation-service.service";
import { LoginModel } from "../../../models/requestModels/logInRequest.model";
import { Store } from "@ngrx/store";
import { coreLogin } from "src/app/ngrxState/actions/core.actions";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  public userData: LoginModel;

  constructor(
    private ngrxStore: Store<any>,
    private navigateService: NavigatorService
  ) {}

  ngOnInit() {
    this.resetData();
  }

  login() {
    this.ngrxStore.dispatch(coreLogin(this.userData));
  }

  goToRegisterPage() {
    this.navigateService.goToRegister();
  }

  resetData() {
    this.userData = {
      email: undefined,
      password: undefined,
    };
  }
}
