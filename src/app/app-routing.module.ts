import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { GuardService } from "./services/guard-service.service";
import { LogInComponent } from "./components/registration/log-in/log-in.component";
import { RegisterComponent } from "./components/registration/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { ComposeEmailComponent } from "./components/home/components/compose-email/compose-email.component";
import { MangeEmailsComponent } from "./components/home/components/mange-emails/mange-emails.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LogInComponent,
    canActivate: [GuardService],
    data: { jwtNeeded: false },
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [GuardService],
    data: { jwtNeeded: false },
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [GuardService],
    data: { jwtNeeded: true },
    children: [
      { path: "", redirectTo: "MangeEmails", pathMatch: "full" },
      {
        path: "composeEmail",
        component: ComposeEmailComponent,
      },
      {
        path: "MangeEmails",
        component: MangeEmailsComponent,
      },
      { path: "**", redirectTo: "MangeEmails" },
    ],
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
