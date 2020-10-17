import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "./interceptors/header-inceptor";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LogInComponent } from "./components/registration/log-in/log-in.component";
import { RegisterComponent } from "./components/registration/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { ComposeEmailComponent } from "./components/home/components/compose-email/compose-email.component";
import { MangeEmailsComponent } from "./components/home/components/mange-emails/mange-emails.component";
import { HeaderComponent } from "./components/home/components/header/header.component";
import * as fromCore from "./ngrxState/reducers/index";
import { CoreEffects } from "./ngrxState/effects/core.effects";
import { InboxOutboxEmailsComponent } from './components/home/components/mange-emails/components/inbox-outbox-emails/inbox-outbox-emails.component';
import { SearchEmailComponent } from './components/home/components/mange-emails/components/search-email/search-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    ComposeEmailComponent,
    MangeEmailsComponent,
    HeaderComponent,
    InboxOutboxEmailsComponent,
    SearchEmailComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.reducer, {
      metaReducers: fromCore.metaReducers,
    }),
    EffectsModule.forFeature([CoreEffects]),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
