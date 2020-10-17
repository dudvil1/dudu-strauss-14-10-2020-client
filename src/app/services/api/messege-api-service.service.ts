import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ComposeEmailModel } from "src/app/models/requestModels/composeEmailRequest.model";
import { CreateEmailResponseModel } from "../../models/responseModels/createEmailResponse.model";
import { GetAllEmailsResponseModel } from "src/app/models/responseModels/getAllEmailsResponse.model";
import { DeleteEmailResponseModel } from 'src/app/models/responseModels/deleteEmailResponse.model';
import { messageApi } from './api-configure'
@Injectable({
  providedIn: "root",
})
export class MessegeApiService {
  constructor(private httpClient: HttpClient) {}

  createEmail(email: ComposeEmailModel): Observable<CreateEmailResponseModel> {
    return this.httpClient.post<CreateEmailResponseModel>(messageApi, email);
  }

  getallMesseges(): Observable<{ messages: GetAllEmailsResponseModel[] }> {
    return this.httpClient.get<{ messages: GetAllEmailsResponseModel[] }>(
      messageApi
    );
  }

  deleteMessege(id: string): Observable<DeleteEmailResponseModel> {
    return this.httpClient.delete<DeleteEmailResponseModel>(
      `${messageApi}/${id}`
    );
  }
}
