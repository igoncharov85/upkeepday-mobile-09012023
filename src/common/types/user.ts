export interface IEnrolledClass {
    ClassId: string | number,
    Name: string,
    StartDate: string,
    EndDate: string,
    Notes: string
}

export interface IUserStudent {
    FirstName: string
    LastName: string,
    Email: string,
    PhoneCountry: string | number,
    PhoneNumber: string,
    StudentId?: number,
    EnrolledClasses: Array<IEnrolledClass>
    Notes?: string
}


export interface IUserCreateRequest {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneCountry: string,
    PhoneNumber: string,
    Notes: string
}
export interface ICheckinsId {
    sessionId: number
}
export type TCheckinsStatus = 'Present' | 'Absent' | 'Empty'
export enum ECheckinsStatus {
    Present = 'Present',
    Absent = 'Absent',
    Empty = 'Empty'
}
export interface IUserCheckins {
    StudentId: number,
    CheckInStatus: TCheckinsStatus,
}
export interface IUserCheckinsRequest {
    chekins: Array<IUserCheckins>,
}
// export interface IUserCheckins {
//     chekins: Array<IUserCheckins>,
//     sessionId: TCheckinsId
// }
export interface ICheckinUser {
    FirstName: string,
    LastName: string,
    StudentId: number,
    CheckInStatus: TCheckinsStatus,
}