import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';

export const AddLocationSchema = Yup.object().shape({
    Name: Yup.string().min(2),
    Url: Yup.string(),
    LocationType: Yup.string(),
    AddressLine: Yup.string(),
    City: Yup.string(),
    State: Yup.string(),
    PostalCode: Yup.string().min(2),
    Country: Yup.string(),
})
export const SelectedDateSchema = Yup.object().shape({
    startDate: Yup.string().required("Start date is required"),
    totalClasses: Yup.string(),
    finishDate: Yup.string(),
    numberOf: Yup.string(),
})
export const AddClassSchema = Yup.object().shape({
    Name: Yup.string(),
    Url: Yup.string(),
    LocationType: Yup.string(),
    AddressLine: Yup.string(),
    City: Yup.string(),
    State: Yup.string(),
    PostalCode: Yup.string(),
    Country: Yup.string(),
})
export const NewStudentSchema = Yup.object().shape({
    FirstName: Yup.string()
        .min(2)
        .max(64)
        .matches(/^[a-zA-Z]+$/),
    LastName: Yup.string()
        .min(2)
        .max(64)
        .matches(/^[a-zA-Z]+$/),
    Email: Yup.string()
        .email()
        .required(),
    Phone: Yup.string()
        .matches(RegexEnum.PHONE)
        .required(),
});
