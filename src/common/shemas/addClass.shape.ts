import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';
export const AddClassNameSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name should be at least 3 characters")
        .max(50, "Name should not exceed 50 characters")
        .required("Name is required"),
});
export const AddLocationSchema = Yup.object().shape({
    addressLine: Yup.string().required(),
    state: Yup.string().required(),
    postalCode: Yup.string().min(2),
    country: Yup.string().required(),
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
