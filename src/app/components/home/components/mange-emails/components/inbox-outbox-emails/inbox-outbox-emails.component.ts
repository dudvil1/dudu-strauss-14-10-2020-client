import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FilterEmailsCollectionModel } from "src/app/models/componentsModels/inbox-outbox-collection.model";
import { coreDeleteEmail } from "src/app/ngrxState/actions/core.actions";
import { currentEmails } from "src/app/ngrxState/reducers";

@Component({
  selector: "app-inbox-outbox-emails",
  templateUrl: "./inbox-outbox-emails.component.html",
  styleUrls: ["./inbox-outbox-emails.component.css"],
})
export class InboxOutboxEmailsComponent implements OnInit {
  public inboxOutboxEmails: FilterEmailsCollectionModel[];
  @Input() key; //e.g key = reciver || sender
  isHaveMessages: boolean = false;
  constructor(private ngrxStore: Store<any>) {}

  ngOnInit() {
    this.ngrxStore.select(currentEmails).subscribe((data) => {
      this.inboxOutboxEmails = data.map((item) => ({ ...item }));

      if (this.inboxOutboxEmails.length === 0) this.isHaveMessages = false;
      else this.isHaveMessages = true;
    });
  }

  readMessege(item: FilterEmailsCollectionModel) {
    item.isReadingMessage = !item.isReadingMessage;
  }

  onDelete(id: string) {
    this.ngrxStore.dispatch(coreDeleteEmail({ id }));
  }
}
