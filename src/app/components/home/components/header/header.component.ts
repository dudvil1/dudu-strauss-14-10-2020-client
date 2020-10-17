import { Component, OnInit } from '@angular/core';
import { NavigatorService } from '../../../../services/navigation-service.service';
import { StorageService } from '../../../../services/storage-service.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private navigator: NavigatorService,
    private storege: StorageService
  ) { }

  ngOnInit() {}

  goToComposeEmail() {
    this.navigator.goToComposeEmail();
  }
  goToMangeEmails() {
    this.navigator.goToMangeEmails();
  }

  userLogout() {
    this.storege.removeToken();
    this.storege.removeUserEmail();
  }
}
