
export interface IScheduleRequest {
    startDate: string,
    endDate: string
}
export interface IDeleteScheduleRequest {
    startDate: string,
    endDate: string,
    AllDay: boolean
}


export interface IExistingStudent {
    Id?: number,
    FirstName?: string
    LastName?: string,
    Email?: string,
    Phone?: string,
    Notes?: string
}
export interface ICreateClassRequest {

    Class: IClass
    Location: ILocation,
    Students: Array<IStudents>,
    Slots: Array<IWeekTimeSlot>,
    Sessions: Array<IGeneratedScheduleEntries>
    PaymentAmount: number,
    PaymentType: string,
}

export interface IClass {
    Name?: string
    StartDate?: string,
    EndDate?: string,
    EndNumber?: number,
    EndScheduleType?: string,
    MakeupRequired?: boolean,
    TrackPrepayment?: boolean,

}
export interface ILocation {
    Name?: string
    Url?: string
    LocationType?: string,
    AddressLine?: string,
    City?: string,
    State?: string
    PostalCode?: string
    Country?: string
    LocationId?: number
}
export interface IStudents {
    Id?: number,
    FirstName?: string
    LastName?: string,
    Email?: string,
    Phone?: number,
    Notes?: string
}
export interface IGeneratedScheduleResponse {
    GeneratedSessions: Array<IGeneratedScheduleEntries>
    CurrentSessions: Array<IGeneratedScheduleEntries>
    Slots: Array<IWeekTimeSlot>
}


//Model that describe field in schedule that will generated
export interface IWeekTimeSlot {
    Duration: number,
    DayOfWeek: number,
    StartTime: string,
}

export interface IGeneratedScheduleEntries {
    StartDateTime: string,
    SlotUid: string,
    Duration: number
}
export interface IScheduleItem {
    SlotUid: string
    StartDateTime: string | Date
    Duration: number,
    ClassName: string,
    ScheduleEntryId: number
}

export interface IGenerateScheduleRequest {
    ScheduleType: string,
    StartDate: string,
    EndDate: string,
    Number: number,
    Slots: Array<IWeekTimeSlot>
}


