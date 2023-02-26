import * as Yup from 'yup'
import { RegexEnum } from '../constants/validation/regex.enum';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4, 'password must contain more than 4 symbols').required('Required').max(64, 'password must contain less than 64 symbols'),
});

export const EmailShape = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
});

export const TutorRegistrationShape = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4, 'password must contain more than 4 symbols').required('Required').max(64, 'password must contain less than 64 symbols'),
    firstName: Yup.string().min(4, 'firstName must contain more than 4 symbols').required('Required').max(64, 'firstName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    lastName: Yup.string().min(4, 'lastName must contain more than 4 symbols').required('Required').max(64, 'lastName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    phoneNumber: Yup.string().matches(RegexEnum.PHONE, 'Phone number is not valid').required('Required'),
    address: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
});

export const StudentRegistrationShape = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4, 'password must contain more than 4 symbols').required('Required').max(64, 'password must contain less than 64 symbols'),
    firstName: Yup.string().min(4, 'firstName must contain more than 4 symbols').required('Required').max(64, 'firstName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    lastName: Yup.string().min(4, 'lastName must contain more than 4 symbols').required('Required').max(64, 'lastName must contain less than 64 symbols').matches(/^[a-zA-Z]+$/, 'must contain only letters'),
    phoneNumber: Yup.string().matches(RegexEnum.PHONE, 'Phone number is not valid').required('Required'),
    address: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
});

export const RegistrationGeneralShape = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4, 'password must contain more than 4 symbols').required('Required').max(64, 'password must contain less than 64 symbols'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
})

export const PasswordConfirmShape = Yup.object().shape({
    password: Yup.string().min(4, 'password must contain more than 4 symbols').required('Required').max(64, 'password must contain less than 64 symbols'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
})