import { IFormDataRequest } from "./IFormDataRequest";
import { IRestDelete } from "./IRestDelete";
import { IRestGet } from "./IRestGet";
import { IRestPost } from "./IRestPost";

export interface IRequester extends IRestPost, IRestGet, IFormDataRequest, IRestDelete { }
