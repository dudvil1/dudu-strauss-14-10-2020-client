import { Component, OnInit } from "@angular/core";
import { compose, Store } from "@ngrx/store";
import { ComposeEmailModel } from "../../../../models/requestModels/composeEmailRequest.model";
import { userEmail } from "src/app/ngrxState/reducers";
import { coreCreateEmail } from 'src/app/ngrxState/actions/core.actions';

@Component({
  selector: "app-compose-email",
  templateUrl: "./compose-email.component.html",
  styleUrls: ["./compose-email.component.css"],
})
export class ComposeEmailComponent implements OnInit {
  public email: ComposeEmailModel;
  public emailSender: string;

  constructor(
    private ngrxStore: Store<any>
  ) {}

  ngOnInit() {
    this.resetData();
    this.ngrxStore.select(userEmail).subscribe((email) => {
      this.emailSender = email;
    });
  }

  createEmail() {
    this.email.cretionDate = new Date().toString();
    this.email.sender = this.emailSender;

     this.ngrxStore.dispatch(coreCreateEmail(this.email));
  }

  resetData() {
    this.email = {
      sender: undefined,
      reciver: undefined,
      messege: undefined,
      subject: undefined,
      cretionDate: undefined,
    };
    this.emailSender = "";
  }
}
