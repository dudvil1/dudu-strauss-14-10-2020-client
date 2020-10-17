import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class MessagesHendlerService {
  constructor(private toastr: ToastrService) {}

  registerOK() {
    this.toastr.success("thanks, you can login now");
  }
  registerAlreadyExist() {
    this.toastr.error("user already Exist");
  }
  loginFail() {
     this.toastr.error("username or password is wrong");
  }
  composeEmailOk() {
    this.toastr.success("email created");
  }
  deleteEmailOk() {
    this.toastr.success("email deleted");
  }
}
