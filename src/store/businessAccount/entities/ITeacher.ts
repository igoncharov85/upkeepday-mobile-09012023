export interface ITeacher {
    TeacherId?:number;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Permission: TPermission;
    Notes?: string;
};

export type TPermission = 'ViewOwnSchedule' | 'ManageOwnSchedule' | 'ManageSchedule' | 'FullAccess';
