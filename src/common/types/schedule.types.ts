export interface IScheduleRequest {
    startDate: string,
    endDate: string
}

export interface ICreateClassRequest {

}

export interface ICreateClassResponse {

}

export interface IGeneratedScheduleResponse {
    GeneratedScheduleEntries: Array<IGeneratedScheduleEntries>,
    CurrentScheduledEntries: Array<any>,
    WeekTimeSlots: Array<IWeekTimeSlot>
}

export interface WeekTimeSlots {
    WeekTimeSlotId: string,
    Duration: number,
    DayOfWeek: 1,
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

export interface IWeekTimeSlot {
    DayOfWeek: number,
    StartTime: string,
    Duration: number,
    WeekTimeSlotId: string,
}
export interface IGenerateScheduleRequest {
    TeacherId: number,
    ScheduleType: string,
    StartDate: string, //2023-03-24
    Number: number,
    EndDate: string,
    WeekTimeSlots: Array<IWeekTimeSlot>
}

