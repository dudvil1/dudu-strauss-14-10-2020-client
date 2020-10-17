import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(environment.tokenKey);
  }

  setUserEmail(email: string) {
    localStorage.setItem("userEmail", email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem("userEmail");
  }

  removeUserEmail() {
    localStorage.removeItem("userEmail");
  }
}
