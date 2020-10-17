import { createAction, props } from "@ngrx/store";
import { FilterEmailsCollectionModel } from "src/app/models/componentsModels/inbox-outbox-collection.model";
import { ComposeEmailModel } from "src/app/models/requestModels/composeEmailRequest.model";
import { GetAllEmailsResponseModel } from "src/app/models/responseModels/getAllEmailsResponse.model";
import { LoginModel } from "../../models/requestModels/logInRequest.model";
import { RegisterModel } from "../../models/requestModels/registerRequest.model";

export const coreInit = createAction("[Core] init");
export const coreInitComplete = createAction(
  "[Core] init complete",
  props<{ token; userEmail }>()
);
export const coreInitFail = createAction("[Core] init fail");

export const coreLogin = createAction("[Core] login", props<LoginModel>());
export const coreLoginComlete = createAction(
  "[Core] login complete",
  props<{ token: string; userEmail: string }>()
);
export const coreLoginFail = createAction("[Core] login fail");

export const coreRegister = createAction(
  "[Core] register",
  props<RegisterModel>()
);
export const coreRegisterComlete = createAction("[Core] register complete");
export const coreRegisterFail = createAction("[Core] register fail");

export const coreCreateEmail = createAction(
  "[core] create Email",
  props<ComposeEmailModel>()
);
export const coreCreateEmailComlete = createAction(
  "[Core] Create Email complete"
);
export const coreCreateEmailFail = createAction("[Core] CreateEmail fail");

export const coreGetAllEmails = createAction("[core] GetAllEmails");
export const coreGetAllEmailsComplete = createAction(
  "[Core] Get All Emails complete",
  props<{ allEmails: FilterEmailsCollectionModel[] }>()
);
export const coreGetAllEmailsFail = createAction("[Core] GetAllEmails fail");

export const coreDeleteEmail = createAction(
  "[core] Delete Email",
  props<{ id: string }>()
);
export const coreDeleteEmailComlete = createAction(
  "[Core] Delete Email complete",
  props<{ id: string }>()
);
export const coreDeleteEmailFail = createAction("[Core] DeleteEmail fail");

export const corefilterEmailsByUserEmail = createAction(
  "[core] filter Emails By User Email",
  props<{
    filterFunc: (
      collection: FilterEmailsCollectionModel[],
      userEmail: string
    ) => FilterEmailsCollectionModel[];
  }>()
);

export const coreSetSearchField = createAction(
  "[Core] set search field",
  props<{ searchField: string }>()
);

export const coreInitCurrentEmails = createAction("[Core] current-emails collection");

export const coreSerchEmails = createAction(
  "[Core] search emails start",
  props<{
    filterFunc: (
      collection: FilterEmailsCollectionModel[],
      filter: string
    ) => FilterEmailsCollectionModel[];
  }>()
);
