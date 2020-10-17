export class FilterEmailsCollectionModel {
  _id: string;
  sender: string;
  reciver: string;
  messege: string;
  subject: string;
  cretionDate: string;
  isReadingMessage: boolean = false;
}
