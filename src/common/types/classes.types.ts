export interface IStudent {
    StudentId: number;
    FullName: string;
}
export interface ILocation {
    LocationId: number;
    LocationType: string;
    Url: string;
    AddressLine: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
}
export interface ISession {
    ClassName: string;
    Duration: number;
    SessionId: number;
    SlotUid: string;
    StartDateTime: string;
}
export interface ISessionSubset extends Pick<ISession, 'StartDateTime' | 'SlotUid' | 'Duration'> {
}
export interface IGeneratedClassesResponse {
    GeneratedSessions: Array<ISessionSubset>;
    CurrentSessions: Array<ISession>
}
export interface IClassesResponse {
    Status: string;
    TotalClassesHeld: number;
    ScheduledClasses: number;
    Students: IStudent[];
    Location: ILocation;
    ClassId: number;
    Name: string;
    StartDate: string;
    StartDateTime: string;
    EndScheduleType: string;
    EndDate: string;
    EndDateTime: string;
    EndNumber: number | null;
    MakeupRequired: boolean;
    TrackPrepayment: boolean;
}


export type TClassesStatus = 'scheduled' | 'archived';
export type TClassesChange = 'current' | 'future';

export type TClassesId = number;

export type IClassesUpdateStatus = {
    id: TClassesId;
    Status: string;
    schoolId?: number;
}
export type IClassesUpdateSession = {
    id: TClassesId;
    change: TClassesChange;
    StartDateTime: string;
    schoolId?: number;
}
export enum EClassesStatus {
    scheduled = 'scheduled',
    archived = 'archived',
}
export enum EClassesChange {
    current = 'current',
    future = 'future'
}


export interface IGeneratedClasses {
    id: TClassesId;
    to: string;
    schoolId?: number;
}

export interface IGeneratedClassesRequest extends IGeneratedClasses {
    Sessions: Array<ISessionSubset>;
    schoolId?: number;
}
export interface IClassesEditName {
    id: TClassesId;
    Class: {
        Name: string;
    },
    Location: {
        LocationId: number;
        Url?: string;
    }
}
