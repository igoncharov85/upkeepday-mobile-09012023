import { IUserStudent } from "./user"

export interface IScheduleRequest {
    startDate: string,
    endDate: string
}


export interface IExistingStudent {
    StudentId: number
}
export interface ICreateClassRequest {
    ClassName: string
    ClassLocationType: number,
    ClassLocationId: number,
    StartDate: string,
    EndScheduleType: string,
    EndNumber: number,
    MakeupRequired: boolean,
    TrackPrepayment: boolean,
    ExistingStudents: Array<IExistingStudent>
    NewStudents: Array<IUserStudent>
    WeekTimeSlots: Array<IWeekTimeSlot>
    ScheduledEntries: Array<IGeneratedScheduleEntries>
}

export interface ICreateClassResponse {

}

export interface IGeneratedScheduleResponse {
    GeneratedScheduleEntries: Array<IGeneratedScheduleEntries>
    CurrentScheduledEntries: Array<IGeneratedScheduleEntries>
    WeekTimeSlots: Array<IWeekTimeSlot>
}


//Model that describe field in schedule that will generated
export interface IWeekTimeSlot {
    Duration: number,
    DayOfWeek: number,
    StartTime: string,
}

export interface IGeneratedScheduleEntries {
    StartDateTime: string,
    WeekTimeSlotId: string,
    Duration: number
}
export interface IScheduleItem {
    WeekTimeSlotId: string
    StartDateTime: string | Date
    Duration: number,
    ClassName: string,
    ScheduleEntryId: number
}

export interface IGenerateScheduleRequest {
    ScheduleType: string,
    StartDate: string,
    Number: number,
    WeekTimeSlots: Array<IWeekTimeSlot>
}


