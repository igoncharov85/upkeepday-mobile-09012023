export interface ILoginRequest {
    Login: string
    Password: string
}

export interface IRegistrationRequest {
    Login: string;
    FirstName: string;
    LastName: string;
    PhoneCountry: string;
    PhoneNumber: string;
    AddressLine1: string;
    Country: string;
    State: string;
    PostalCode: string;
}

export interface IRegistrationDto {
    data: IRegistrationRequest,
    type: TRole
}

export interface IConfirmPassword {
    Password: string
    uuid: string
}

export interface IStatusResponse {
    status: string
}
export interface ITokenResponse {
    token: string
}
export interface IResetItemRequest {
    Password: string
}
export interface IResetItemData {
    Password: string
}
export type TRole = 'student' | 'teacher'
