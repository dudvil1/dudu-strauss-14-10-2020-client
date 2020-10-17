import { Component, OnInit } from "@angular/core";
import { NavigatorService } from "../../../services/navigation-service.service";
import { RegisterModel } from '../../../models/requestModels/registerRequest.model';
import { Store } from "@ngrx/store";
import { coreRegister } from "src/app/ngrxState/actions/core.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public userData: RegisterModel;

  constructor(
    private ngrxStore: Store<any>,
    private navigateService: NavigatorService,
  ) {}

  ngOnInit() {
    this.resetData();
  }

  register() {
    this.ngrxStore.dispatch(coreRegister(this.userData));
  }

  goToLoginPage() {
    this.navigateService.goToLogin();
  }

  resetData() {
    this.userData = {
      name: undefined,
      email: undefined,
      password: undefined,
    };
  }
}
