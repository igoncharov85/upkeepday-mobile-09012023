export interface ILocation {
    Name: string
    Url: string
    LocationType: string,
    AddressLine: string,
    City: string,
    State: string
    PostalCode: string
    Country: string
    LocationId: string
}

export interface ILocationRequest {
    Name: string,
    Url: string,
    LocationType: string,
    AddressLine: string,
    City: string,
    State: string,
    PostalCode: string,
    Country: string
}

export interface IIdRequest {
   Id: string
}