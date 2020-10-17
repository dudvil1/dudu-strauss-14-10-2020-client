import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NavigatorService } from "./navigation-service.service";
import { StorageService } from "./storage-service.service";
import { token } from "../ngrxState/reducers";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GuardService implements CanActivate {
  constructor(
    private navigateService: NavigatorService,
    private store: Store<any>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isJwtNeeded = route.data["jwtNeeded"];
    return this.store.select(token).pipe(
      map((token) => {
        const isTokenExist = token == null ? false : true;

        if (isJwtNeeded && !isTokenExist) {
          this.navigateService.goToLogin();
        }
        if (!isJwtNeeded && isTokenExist) {
          this.navigateService.goToHome();
        }

        return isJwtNeeded ? isTokenExist : !isTokenExist;
      })
    );
  }
}
