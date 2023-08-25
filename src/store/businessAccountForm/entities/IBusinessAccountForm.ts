import { ISchool } from "../../businessAccount/entities/ISchool";
import { ITeacher } from "../../businessAccount/entities/ITeacher";

export interface IBusinessAccountForm {
    School: ISchool;
    Teachers: ITeacher[];
};