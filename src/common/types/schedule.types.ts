export interface IScheduleRequest {
    startDate: string,
    endDate: string
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
