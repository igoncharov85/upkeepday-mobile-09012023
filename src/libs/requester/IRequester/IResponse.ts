export interface IResponse {
    isError: boolean;
    message: string | { [key: string]: string };
    data: any;
}
