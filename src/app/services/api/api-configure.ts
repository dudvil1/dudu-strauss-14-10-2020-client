import { environment } from "../../../environments/environment";

const baseUrl = environment.baseUrl;
const registrationBaseUrl = baseUrl + "/registraion";

export const messageApi = baseUrl +"/messege";
export const registerApi = registrationBaseUrl + "/register";
export const loginApi = registrationBaseUrl + "/login";



