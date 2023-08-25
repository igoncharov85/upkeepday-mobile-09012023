export interface IClass {
    Name: string;
    StartDate: string;
    EndScheduleType: TEndScheduleType;
    MakeupRequired: true;
    TrackPrepayment: true;
    EndNumber: number;
    EndDate: string;
    PaymentAmount: number;
    PaymentType: string
};

export type TEndScheduleType = 'SpecificEndDate' | 'FixedClassesNumber' | 'FixedWeekNumber' | 'FixedMonthNumber';