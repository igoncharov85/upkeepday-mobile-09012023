import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';
function compareDates(date1: string, date2: string) {
    var a = new Date(date1);
    var b = new Date(date2);

    if (a.getTime() < b.getTime()) {
        return true
    }
    else {
        return false;
    }
}
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
    startDate: Yup.string().required(''),
    totalClasses: Yup.number().min(1, "Number of totalClasses should be greater than 0"),
    finishDate: Yup.string(),
    numberOf: Yup.number()
        .min(1, "Number of numberOf should be greater than 0"),
})
export const SelectedDateForNumberOfSchema = Yup.object().shape({
    numberOf: Yup.number().required(),
})
export const SelectedDateForFinishDateSchema = Yup.object().shape({
    finishDate: Yup.string().required(),
})
export const SelectedDateForTotalClassesSchema = Yup.object().shape({
    totalClasses: Yup.number().required(),
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
