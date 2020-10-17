import { Injectable } from "@angular/core";
import { FilterEmailsCollectionModel } from 'src/app/models/componentsModels/inbox-outbox-collection.model';


@Injectable({
  providedIn: "root",
})
export class EmailsFilterService {
  constructor() {}

  getInboxEmailsData(): { func: any; key: string } {
    return { func: this.getInboxEmails, key: "sender" };
  }
  getOutboxEmailsData(): { func: any; key: string } {
    return { func: this.getOutboxEmails, key: "reciver" };
  }
  SearchingInEmails(
    collection: FilterEmailsCollectionModel[],
    searchField: string
  ): FilterEmailsCollectionModel[] {
    return collection.filter(
      (item) =>
        item.sender.toLocaleLowerCase().includes(searchField.toLowerCase()) ||
        item.reciver.toLocaleLowerCase().includes(searchField.toLowerCase())
    );
  }

  private getInboxEmails(
    collection: FilterEmailsCollectionModel[],
    userEmail: string
  ): FilterEmailsCollectionModel[] {
    return collection.filter((item) => item.reciver == userEmail);
  }
  private getOutboxEmails(
    collection: FilterEmailsCollectionModel[],
    userEmail: string
  ): FilterEmailsCollectionModel[] {
    return collection.filter((item) => item.sender == userEmail);
  }
}
