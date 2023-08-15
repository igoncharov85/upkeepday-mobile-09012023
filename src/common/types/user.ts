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
}
export interface IStudentRequest {
    StudentId: number,

}
export interface IStudentsRequest {
    status: string,

}
export interface IDeleteUserRequest {
    StudentId: number,
    Classes: Array<number>,
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
    PastSessions: number;
    Name: string;
    StartDate: string;
    EndDate: string;
    Attended: number;
    Scheduled: number;
    Slots: ISlot[];
    Balance: number;
    PaymentType: string;
}

export interface IPaymentsTableParams {
    StudentId: string;
    ClassId: number;
}

export interface IPaymentsTableTransaction {
    TransactionId: number,
    Amount: number,
    Date: string,
    TimeStamp: Date
}

export interface IPaymentsTableResponse {
    Total: number,
    ClassId: number,
    Name: string,
    TransactionUid: string,
    Transactions: Array<IPaymentsTableTransaction>
}

export interface IStudentPaymentRequest {
    StudentId: number;
    ClassId: number;
    TransactionUid: string;
    TransactionType: string;
    Amount: number;
    Date: string;
}
