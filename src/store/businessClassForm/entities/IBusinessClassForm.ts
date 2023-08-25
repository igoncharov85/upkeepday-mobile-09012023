import { IClass } from "./IClass";
import { IStudent } from "./IStudent";

export interface IBusinessClassForm {
    Teacher: {
        TeacherId?: number;
    };
    Class: IClass;
    Location: IClassLocation;
    Room: {
        RoomId?: number;
    };
    Slots: {
        DayOfWeek: number;
        StartTime: string;
        Duration: number;
        SlotUid: string;
    }[];
    Sessions: {
        SlotUid: string;
        StartDateTime: string;
        Duration: number;
    }[];
    Students: IStudent[];
    numberOf: number | null;
};

export interface IClassLocation {
    LocationId?: number;
    LocationType?: 'Online' | 'Office';
    Url?: string;
};