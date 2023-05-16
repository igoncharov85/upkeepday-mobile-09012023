import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { dispatch } from '../../../store/store';
import { createUserAction } from '../../../store/user/actions';
import { InputForm } from '../../AddClassScreen/components/InputForm';
import styles from './styles';
import { FormikProps, withFormik } from 'formik';
import { IUserCreateRequest, IUserStudent } from '../../../common/types/user';
import { NewStudentSchema } from '../../../common/shemas/addClass.shape';
import { formicDefaultProps } from '../../../common/constants/styles/form.config';
import { useAppSelector } from '../../../store/hooks';
import { updateCurrentClassRequestAction } from '../../../store/shedule';
import { CustomButton } from '../../../components/UI/CustomButton';
import { IExistingStudent } from '../../../common/types/schedule.types';

interface INewStudentProps {
    handleTypeChange: () => void
    onAddNewStudent: (student: IExistingStudent) => void
}

const formInitialValues = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Notes: ''
};
function splitPhoneNumber(phoneNumber: string): [string, string] {
    const countryCode = phoneNumber?.slice(0, 4);
    const phoneNumberWithoutCode = phoneNumber?.slice(4);
    return [countryCode, phoneNumberWithoutCode];
}
export const NewStudent: React.FC<INewStudentProps> = ({ handleTypeChange, onAddNewStudent }) => {
    const { students } = useAppSelector(state => state.user);
    const [newUser, setNewUser] = useState<IExistingStudent>();
    const [id, setId] = useState(students[students?.length - 1]?.StudentId || 0)

    const onSave = (handleSubmit: any) => {
        handleSubmit();
        handleTypeChange()
    }
    useEffect(() => {
        onAddNewStudent(newUser || {});
    }, [newUser]);

    const renderForm = ({
        touched,
        errors,
        values,
        handleChange,
        handleSubmit,
    }: FormikProps<typeof formInitialValues>) => {

        return (
            <>
                <InputForm
                    labelText='First Name'
                    onChange={handleChange('FirstName')}
                    value={values.FirstName}
                    //@ts-ignore
                    validationErrorText={touched.FirstName && errors.FirstName}
                />

                <InputForm
                    labelText='Last Name'
                    onChange={handleChange('LastName')}
                    value={values.LastName}
                    //@ts-ignore
                    validationErrorText={touched.LastName && errors.LastName}
                />
                <InputForm
                    labelText='Email'
                    onChange={handleChange('Email')}
                    value={values.Email}
                    //@ts-ignore
                    validationErrorText={touched.Email && errors.Email}
                />
                <InputForm
                    labelText='Phone'
                    onChange={handleChange('Phone')}
                    value={values.Phone}
                    //@ts-ignore
                    validationErrorText={touched.Phone && errors.Phone}
                />
                <InputForm
                    labelText='Notes'
                    onChange={handleChange('Notes')}
                    value={values.Notes}
                />
                <InputForm labelText='Attachments' />
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.addMore}>Add One More</Text>
                </TouchableOpacity>
                <View style={{ paddingVertical: 20, height: 92, flex: 1, justifyContent: 'flex-end' }}>
                    <CustomButton text={'Save'} onPress={() => onSave(handleSubmit)} />
                </View>


            </>
        )
    }
    const NewStudentForm = withFormik<any, typeof formInitialValues>({
        validationSchema: NewStudentSchema,

        handleSubmit: (values, { resetForm, }) => {
            setId(id + 1);
            console.log('values', values);

            const [phoneCountry, phoneNumber] = splitPhoneNumber(values.Phone)
            setNewUser({
                FirstName: values.FirstName,
                LastName: values.LastName,
                Email: values.Email,
                Phone: values.Phone,
                Notes: values.Notes || '',
            })
            resetForm();


        },
        ...formicDefaultProps,
    })(renderForm);
    return (
        <ScrollView>
            <View style={styles.container}>
                <NewStudentForm />
            </View>
        </ScrollView>
    )
}