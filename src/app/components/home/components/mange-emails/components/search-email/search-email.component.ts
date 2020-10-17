import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { FilterEmailsCollectionModel } from "src/app/models/componentsModels/inbox-outbox-collection.model";
import {
  coreInitCurrentEmails,
  coreSerchEmails,
  coreSetSearchField,
} from "src/app/ngrxState/actions/core.actions";
import { currentEmails } from "src/app/ngrxState/reducers";
import { EmailsFilterService } from "../../services/emails-filter.service";

@Component({
  selector: "app-search-email",
  templateUrl: "./search-email.component.html",
  styleUrls: ["./search-email.component.css"],
})
export class SearchEmailComponent implements OnInit {
  searchForm: string;
  searchEmails: FilterEmailsCollectionModel[];
  
  constructor(
    private ngrxStore: Store<any>,
    private filterSevice: EmailsFilterService
  ) {}

  ngOnInit() {
    this.ngrxStore.select(currentEmails).subscribe((data) => {
      this.searchEmails = data.map((item) => ({ ...item }));
    });
  }

  onSearching() {
    this.searchProsses(this.searchForm);
  }

  clearSearch() {
    this.searchForm = "";
    this.ngrxStore.dispatch(coreInitCurrentEmails());
  }

  readMessege(item: FilterEmailsCollectionModel) {
    item.isReadingMessage = !item.isReadingMessage;
  }

  searchProsses(searchField: string) {
    this.ngrxStore.dispatch(coreSetSearchField({ searchField: searchField }));
    this.ngrxStore.dispatch(
      coreSerchEmails({ filterFunc: this.filterSevice.SearchingInEmails })
    );
  }
}
