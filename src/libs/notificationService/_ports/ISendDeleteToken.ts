import { IResponse } from "../../requester/IRequester/IResponse";

export interface ISendDeleteToken {
    deleteToken: (token: string) => Promise<IResponse>;
}
