export interface IStudent {
    StudentId: number;
    FullName: string;
}

export interface ILocation {
    LocationId: number;
    LocationType: string;
    Address: string;
}
export interface ISession {
    ClassName: string;
    Duration: number;
    SessionId: number;
    SlotUid: string;
    StartDateTime: string;
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
    EndScheduleType: string;
    EndDate: string;
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
}
export type IClassesUpdateSession = {
    id: TClassesId;
    change: TClassesChange;
    StartDateTime: string;
}
export enum EClassesStatus {
    scheduled = 'scheduled',
    archived = 'archived'
}
export enum EClassesChange {
    current = 'current',
    future = 'future'
}