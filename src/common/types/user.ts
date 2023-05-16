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
    PhoneNumber: string,
    StudentId?: number,
    EnrolledClasses: Array<IEnrolledClass>
    Notes?: string
}

export interface IUserCreateRequest {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneCountry: string,
    PhoneNumber: string,
    Notes: string
}
