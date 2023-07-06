import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { dispatch } from '../../../../store/store';
import { createUserAction, updateStudentAction } from '../../../../store/user/actions';
import styles from './styles';
import { Formik, FormikProps, withFormik } from 'formik';
import { IUserCreateRequest, IUserStudent } from '../../../../common/types/user';
import { NewStudentSchema } from '../../../../common/shemas/addClass.shape';
import { formicDefaultProps } from '../../../../common/constants/styles/form.config';
import { useAppSelector } from '../../../../store/hooks';
import { updateCurrentClassRequestAction } from '../../../../store/shedule';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { IExistingStudent } from '../../../../common/types/schedule.types';
import { InputForm } from '../../../AddClassScreen/components/InputForm';
import { ScreenHeader } from '../../../../components/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native';

interface INewStudentProps {
}





export const EditStudentScreen: React.FC<INewStudentProps> = () => {
    const { students } = useAppSelector(state => state.user);
    const [newUser, setNewUser] = useState<IExistingStudent>();
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params as any;
    const formInitialValues = {
        FirstName: item.FirstName || '',
        LastName: item.LastName || '',
        Email: item.Email || '',
        Phone: item.PhoneNumber || '',
        Notes: item.Notes || '',
    };
    const goBack = () => {
        navigation.goBack();
    };
    const handleTypeChange = () => { };
    const renderForm = ({
        touched,
        errors,
        values,
        isValid,
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
                <View style={{ paddingVertical: 20, height: 124, flex: 1, justifyContent: 'flex-end' }}>
                    <CustomButton text={'Save'} onPress={handleSubmit} disabled={!isValid} />
                    <TouchableOpacity onPress={goBack} disabled={!isValid}>
                        <Text style={styles.addMore}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    const NewStudentForm = withFormik<any, typeof formInitialValues>({
        validationSchema: NewStudentSchema,
        // initialValues: formInitialValues,
        mapPropsToValues: () => {
            return formInitialValues
        },
        handleSubmit: (values, { resetForm }) => {
            dispatch(updateStudentAction({
                StudentId: item.StudentId,
                FirstName: values.FirstName,
                LastName: values.LastName,
                Email: values.Email,
                PhoneNumber: values.Phone,
                Notes: values.Notes || '',

            }));

            resetForm();
        },
        ...formicDefaultProps,
    })(renderForm);

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%', padding: 20, paddingBottom: 0 }}>
                <ScreenHeader text={'Edit Student'} onBackPress={goBack} withBackButton={true} />
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <NewStudentForm />
                </View>

            </ScrollView>
        </>
    );
};
