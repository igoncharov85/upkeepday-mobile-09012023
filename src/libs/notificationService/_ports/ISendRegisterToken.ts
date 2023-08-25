import { IResponse } from "../../requester/IRequester/IResponse";

export interface ISendRegisterToken {
    registerToken: (userId: number, token: string, language: string) => Promise<IResponse>;
}
