import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
    password: Yup.string().min(8, 'password must contain more than 8 symbols').required('Required').max(64, 'password must contain less than 64 symbols').matches(RegexEnum.PASSWORD, 'password must contain at least one number uppercase letter number and special symbol'),
});

export const EmailShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
});

export const TutorRegistrationShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
    firstName: Yup.string().min(2, 'First Name must contain at least 2 characters').required('Required').max(64, 'firstName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    lastName: Yup.string().min(2, 'Last Name must contain at least 2 characters').required('Required').max(64, 'lastName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    phone: Yup.string().matches(RegexEnum.PHONE, 'Phone number is not valid').required('Required'),
    address: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
});

export const StudentRegistrationShape = Yup.object().shape({
    email: Yup.string().matches(RegexEnum.EMAIL, 'Invalid email format').required('Required'),
    firstName: Yup.string().min(2, 'First Name must contain at least 2 characters').required('Required').max(64, 'firstName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    lastName: Yup.string().min(2, 'Last Name must contain at least 2 characters').required('Required').max(64, 'lastName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    phone: Yup.string().matches(RegexEnum.PHONE, 'Phone number is not valid').required('Required'),
    address: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
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