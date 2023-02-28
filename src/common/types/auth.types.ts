export interface ILoginRequest {
    login: string
    password: string
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

export interface IStatusResponse {
    status: string
}
export interface IResetItemRequest {
    reset_item: string
}
export interface IResetItemData {
    password: string
}
export type TRole = 'student' | 'teacher'
