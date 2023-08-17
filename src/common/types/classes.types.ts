import { string } from "yup";

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
    EndScheduleType: string;
    EndDate: string;
    EndNumber: number | null;
    MakeupRequired: boolean;
    TrackPrepayment: boolean;
}

export interface IclassesScheduleResponse {
    StartDate: string;
    EndDate: string;
    Sessions: ISession[];
    OtherSessions: ISession[];
}

export type TClassesStatus = 'scheduled' | 'archived';
export type TClassesChange = 'current' | 'future';

export type TClassesId = number;
export type IDeleteSession = {
    sessionId: number;
    classId?: number
}
export type IClassesUpdateStatus = {
    id: TClassesId;
    Status: string;
}
export type IClassesUpdateSession = {
    id: TClassesId;
    change: TClassesChange;
    StartDateTime: string;
    classId?: number
}
export enum EClassesStatus {
    scheduled = 'scheduled',
    archived = 'archived',
}
export enum EClassesChange {
    current = 'current',
    future = 'future'
}

export interface IClassId {
    classId: number;
}
export interface IGeneratedClasses {
    id: TClassesId;
    to: string;
}

export interface IGeneratedClassesRequest extends IGeneratedClasses {
    Sessions: Array<ISessionSubset>;
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