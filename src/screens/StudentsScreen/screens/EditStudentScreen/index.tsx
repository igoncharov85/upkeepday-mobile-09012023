import { useRoute } from '@react-navigation/native';
import { FormikProps, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { formicDefaultProps } from '../../../../common/constants/styles/form.config';
import { NewStudentSchema } from '../../../../common/shemas/addClass.shape';
import { IExistingStudent } from '../../../../common/types/schedule.types';
import { ScreenHeader } from '../../../../components/ScreenHeader';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { useTypedNavigation } from '../../../../hook/useTypedNavigation';
import { useAppSelector } from '../../../../store/hooks';
import { dispatch } from '../../../../store/store';
import {
  fetchStudentsByIdAction,
  updateStudentAction,
} from '../../../../store/user/actions';
import { InputForm } from '../../../AddClassScreen/components/InputForm';
import styles from './styles';

interface INewStudentProps { }

export const EditStudentScreen: React.FC<INewStudentProps> = () => {
  const { students } = useAppSelector(state => state.user);
  const [newUser, setNewUser] = useState<IExistingStudent>();
  const { goBack, navigate } = useTypedNavigation();
  const route = useRoute();
  const { item } = route.params as any;
  console.log(item.Status, '\n\n\n\nitem');

  const formInitialValues = {
    FirstName: item.FirstName || '',
    LastName: item.LastName || '',
    Email: item.Email || '',
    Phone: item.Phone || '',
    Notes: item.Notes || '',
  };
  useEffect(() => {
    dispatch(fetchStudentsByIdAction({ StudentId: item.StudentId }));
  }, []);

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
          labelText="First Name"
          placeholder="Student's First Name"
          onChange={handleChange('FirstName')}
          value={values.FirstName}
          //@ts-ignore
          validationErrorText={touched.FirstName && errors.FirstName}
        />

        <InputForm
          labelText="Last Name"
          placeholder="Student's Last Name"
          onChange={handleChange('LastName')}
          value={values.LastName}
          //@ts-ignore
          validationErrorText={touched.LastName && errors.LastName}
        />
        <InputForm
          labelText="Email"
          placeholder="Email"
          onChange={handleChange('Email')}
          value={values.Email}
          //@ts-ignore
          validationErrorText={touched.Email && errors.Email}
        />
        <InputForm
          labelText="Phone (optional)"
          placeholder={'Phone number (optional)'}
          onChange={handleChange('Phone')}
          value={values.Phone}
          //@ts-ignore
          validationErrorText={touched.Phone && errors.Phone}
        />
        <InputForm
          labelText="Notes (optional)"
          placeholder={'Some Notes (optional)'}
          onChange={handleChange('Notes')}
          value={values.Notes}
        />
        {/*<InputForm labelText="Attachments" />*/}
        <View
          style={{
            paddingVertical: 20,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <CustomButton
            text={'Save'}
            onPress={handleSubmit}
            disabled={!isValid}
          />
          <View style={{ height: 12 }} />
          <CustomButton
            text={'Cancel'}
            onPress={goBack}
            backgroundColor={'#FA6B6B'}
          />
        </View>
      </>
    );
  };

  const NewStudentForm = withFormik<any, typeof formInitialValues>({
    validationSchema: NewStudentSchema,
    mapPropsToValues: () => {
      return formInitialValues;
    },
    handleSubmit: (values, { resetForm }) => {
      dispatch(
        updateStudentAction({
          StudentId: item.StudentId,
          FirstName: values.FirstName,
          LastName: values.LastName,
          Email: values.Email,
          Phone: values.Phone || '',
          Notes: values.Notes || '',
          status: item.Status
        }),
      );
      navigate(NavigationEnum.STUDENTS_TAB);
    },
    ...formicDefaultProps,
  })(renderForm);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 1,
          maxWidth: '50%',
          padding: 20,
          paddingBottom: 0,
        }}>
        <ScreenHeader
          text={'Edit Student'}
          onBackPress={goBack}
          withBackButton={true}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <NewStudentForm />
        </View>
      </ScrollView>
    </>
  );
};
