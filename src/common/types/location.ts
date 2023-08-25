export interface ILocation {
    Name: string
    Url: string
    LocationType: 'Online' | 'Office',
    AddressLine: string,
    City: string,
    State: string,
    PostalCode: string,
    Country: string,
    LocationId: string,
    rooms?: {
        Name: string,
        Capacity: number,
        RoomId: number,
    }[];
};

export interface ILocationRequest {
    Name?: string,
    Url?: string,
    LocationType: string,
    AddressLine?: string,
    City?: string,
    State?: string,
    PostalCode?: string,
    Country?: string,
    Rooms?: {
        Name: string,
        Capacity: number,
        RoomId: number
    }[],
    schoolId?: number
}

export interface IIdRequest {
    Id: string
}