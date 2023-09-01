import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
    password: Yup.string().min(8, 'password must contain more than 8 symbols').required('Required').max(64, 'password must contain less than 64 symbols').matches(RegexEnum.PASSWORD, 'password must contain at least one number uppercase letter number and special symbol'),
});

export const EmailShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
});

export const StudentRegistrationShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Email is required'),
    firstName: Yup.string().min(2, 'First Name should be at least 2 characters').required('First Name is required').max(64, 'First Name should be less than 64 symbols').matches(RegexEnum.FIRST_AND_LAST_NAMES, 'First Name is not valid'),
    lastName: Yup.string().min(2, 'Last Name should be at least 2 characters').required('Last Name is required').max(64, 'Last Name should be less than 64 symbols').matches(RegexEnum.FIRST_AND_LAST_NAMES, 'Last Name is not valid'),
    phone: Yup.string().matches(RegexEnum.PHONE, 'Phone number is not valid'),
    address: Yup.string().required('Address is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    country: Yup.string().required('Select your Country'),
    state: Yup.string().required('Select your state'),
});

export const RegistrationGeneralShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
    password: Yup.string().min(8, 'password must contain more than 8 symbols').required('Required').max(64, 'password must contain less than 64 symbols').matches(RegexEnum.PASSWORD, 'password must contain at least one number uppercase letter number and special symbol'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
})

export const PasswordConfirmShape = Yup.object().shape({
    password: Yup.string().min(8, 'password must contain more than 8 symbols').required('Required').max(64, 'password must contain less than 64 symbols').matches(RegexEnum.PASSWORD, 'password must contain at least one number uppercase letter number and special symbol'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
})
