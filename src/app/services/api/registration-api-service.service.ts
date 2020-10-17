import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginModel } from "../../models/requestModels/logInRequest.model";
import { RegisterModel } from "../../models/requestModels/registerRequest.model";
import { environment } from "../../../environments/environment";
import { LoginResponseModel } from 'src/app/models/responseModels/loginResponse.model';
import { RegisterResponseModel } from 'src/app/models/responseModels/registerResponse.model';
import { registerApi, loginApi } from "./api-configure";

@Injectable({
  providedIn: "root",
})
export class RegistrationApiService {

  constructor(private httpClient: HttpClient) { }

  login(user: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(loginApi, user);
  }

  register(user: RegisterModel): Observable<RegisterResponseModel> {
    return this.httpClient.post<RegisterResponseModel>(registerApi, user);
  }
}
