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
    Phone: string,
    StudentId?: number,
    EnrolledClasses: Array<IEnrolledClass>
    Notes?: string
}
export interface IStudentsResponse {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,
    Notes: string
}
export interface IUserStudentResponse {
    StudentId: number,
    FirstName: string
    LastName: string,
}

export interface IUserCreateRequest {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,
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
    sessionId: ICheckinsId,
    schoolId?: number,
}
export interface IStudentRequest {
    StudentId: number,
    schoolId?: number,
}
export interface IStudentsRequest {
    status: string,
    schoolId?: number,
}
export interface IDeleteUserRequest {
    StudentId: number,
    Classes: Array<number>,
    schoolId?: number,
}
export interface IStudent {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,
    Notes: string
}
export interface IUpdateStudent {
    StudentId: number,
    ExistingStudents: Array<number>,
    NewStudents: Array<IStudent>,
    schoolId?: number,
}
export interface ICheckinUser {
    FirstName: string,
    LastName: string,
    StudentId: number,
    CheckInStatus: TCheckinsStatus,
}

export interface IStudentResponse {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,
    Notes: string,
    StudentId: number,
    EnrolledClasses: Array<any>,
    Balance: number
}
export interface ISlot {
    SlotUid: string;
    DayOfWeek: number;
    StartTime: string;
    Duration: number;
}
export interface IStudentByIdResponse {
    Status: string;
    ClassId: number;
    Name: string;
    StartDate: string;
    EndDate: string;
    Attended: number;
    Scheduled: number;
    Slots: ISlot[];
}