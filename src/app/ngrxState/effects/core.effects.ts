import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import {
  switchMap,
  map,
  mergeMap,
  concatMap,
  withLatestFrom,
} from "rxjs/operators";
import * as CoreActions from "../actions/core.actions";
import { Action, Store } from "@ngrx/store";
import { of } from "rxjs";
import { CoreState } from "../reducers";
import { RegistrationApiService } from "src/app/services/api/registration-api-service.service";
import { NavigatorService } from "src/app/services/navigation-service.service";
import { StorageService } from "src/app/services/storage-service.service";
import { MessegeApiService } from "src/app/services/api/messege-api-service.service";
import { MessagesHendlerService } from '../../services/messages-hendler.service';

@Injectable()
export class CoreEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<{ core: CoreState }>,
    private registerApi: RegistrationApiService,
    private messegeApi: MessegeApiService,
    private storageService: StorageService,
    private navigateService: NavigatorService,
    private messageHandler: MessagesHendlerService
  ) {}

  ngrxOnInitEffects(): Action {
    return CoreActions.coreInit();
  }

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreInit),
      switchMap((action) => {
        const token = this.storageService.getToken();
        const userEmail = this.storageService.getUserEmail();
        const data = { token, userEmail };
        return [CoreActions.coreInitComplete(data)];
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreRegister),
      switchMap((action) => {
        return this.registerApi.register(action);
      }),
      mergeMap((data) => {
        if (data) {
          this.messageHandler.registerOK();
          this.navigateService.goToLogin();
          return [CoreActions.coreRegisterComlete()];
        }
        return [CoreActions.coreRegisterFail()];
      })
    )
  );

  createEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreCreateEmail),
      switchMap((action) => {
        return this.messegeApi.createEmail(action);
      }),
      mergeMap((data) => {
        if (data) {
          this.messageHandler.composeEmailOk();
          this.navigateService.goToMangeEmails();
          return [CoreActions.coreCreateEmailComlete()];
        }
        return [CoreActions.coreCreateEmailFail()];
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreLogin),
      switchMap((action) => {
        return this.registerApi.login(action);
      }),
      mergeMap((data) => {
        if (data) {
          this.storageService.setToken(data.token);
          this.storageService.setUserEmail(data.user.email);
          this.navigateService.goToHome();
          return [
            CoreActions.coreLoginComlete({
              token: data.token,
              userEmail: data.user.email,
            }),
          ];
        }
        return [CoreActions.coreLoginFail()];
      })
    )
  );

  getAllEmails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreGetAllEmails),
      switchMap((action) => {
        return this.messegeApi.getallMesseges();
      }),
      mergeMap((data) => {
        if (data) {
          this.navigateService.goToMangeEmails();
          return [
            CoreActions.coreGetAllEmailsComplete({
              allEmails: data.messages.map((i) => ({
                ...i,
                isReadingMessage: false,
              })),
            }),
          ];
        }
        return [CoreActions.coreCreateEmailFail()];
      })
    )
  );

  deleteEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.coreDeleteEmail),
      switchMap((action) => {
        return this.messegeApi
          .deleteMessege(action.id)
          .pipe(map((data) => ({ data, id: action.id })));
      }),
      mergeMap((res) => {
        if (res.data) {
          this.messageHandler.deleteEmailOk();
          return [CoreActions.coreDeleteEmailComlete({ id: res.id })];
        }
        return [CoreActions.coreCreateEmailFail()];
      })
    )
  );
}
