import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  corefilterEmailsByUserEmail,
  coreGetAllEmails,
  coreInitCurrentEmails,
} from "src/app/ngrxState/actions/core.actions";
import { allEmails } from "src/app/ngrxState/reducers";
import { EmailsFilterService } from "./services/emails-filter.service";

@Component({
  selector: "app-mange-emails",
  templateUrl: "./mange-emails.component.html",
  styleUrls: ["./mange-emails.component.css"],
})
export class MangeEmailsComponent implements OnInit {
  key: string = "";
  clickOnSearchTab: boolean = false;
  
  constructor(
    private ngrxStore: Store<any>,
    private filterSevice: EmailsFilterService
  ) {}

  ngOnInit() {
    this.ngrxStore.dispatch(coreGetAllEmails());
    this.ngrxStore.select(allEmails).subscribe((_) => {
      this.onChangetoInbox();
    });
  }

  onChangetoInbox() {
    this.clickOnSearchTab = false;
    const { func, key } = this.filterSevice.getInboxEmailsData();
    this.ngrxStore.dispatch(corefilterEmailsByUserEmail({ filterFunc: func }));
    this.key = key;
  }

  onChangetoOutbox() {
    this.clickOnSearchTab = false;
    const { func, key } = this.filterSevice.getOutboxEmailsData();
    this.ngrxStore.dispatch(corefilterEmailsByUserEmail({ filterFunc: func }));
    this.key = key;
  }

  onSearch() {
    this.clickOnSearchTab = true;
    this.ngrxStore.dispatch(coreInitCurrentEmails());
  }
}
