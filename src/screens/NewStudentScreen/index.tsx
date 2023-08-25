import { FormikProps, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { formicDefaultProps } from '../../common/constants/styles/form.config';
import { NewStudentSchema } from '../../common/shemas/addClass.shape';
import { IExistingStudent } from '../../common/types/schedule.types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomButton } from '../../components/UI/CustomButton';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { useAppSelector } from '../../store/hooks';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';
import { InputForm } from '../AddClassScreen/components/InputForm';
import { removeEmptyObjects } from '../AddStudentsScreen';
import styles from '../AddStudentsScreen/NewStudent/styles';
import { createUserAction } from '../../store/user/actions';

const formInitialValues = {
  FirstName: '',
  LastName: '',
  Email: '',
  Phone: '',
  Notes: '',
};

export const NewStudentScreen: React.FC = () => {
  const { goBack } = useTypedNavigation();
  const renderForm = ({
    touched,
    errors,
    values,
    isValid,
    handleChange,
    handleSubmit,
  }: FormikProps<typeof formInitialValues>) => {

    return (
      <View style={{ height: '100%', flex: 1, justifyContent: 'space-between' }}>
        <ScreenHeader
          text={'Add Students'}
          onBackPress={() => goBack()}
          withBackButton={true}
        />

        <InputForm
          autoCapitalize="words"
          labelText="First Name"
          onChange={handleChange('FirstName')}
          value={values.FirstName}
          //@ts-ignore
          validationErrorText={touched.FirstName && errors.FirstName}
        />

        <InputForm
          autoCapitalize="words"
          labelText="Last Name"
          onChange={handleChange('LastName')}
          value={values.LastName}
          //@ts-ignore
          validationErrorText={touched.LastName && errors.LastName}
        />
        <InputForm
          labelText="Email"
          onChange={handleChange('Email')}
          value={values.Email}
          //@ts-ignore
          validationErrorText={touched.Email && errors.Email}
        />
        <InputForm
          labelText="Phone"
          onChange={handleChange('Phone')}
          value={values.Phone}
          //@ts-ignore
          validationErrorText={touched.Phone && errors.Phone}
        />
        <InputForm
          autoCapitalize="sentences"
          labelText="Notes"
          onChange={handleChange('Notes')}
          value={values.Notes}
        />
        <InputForm labelText="Attachments" />
        <View
          style={{ paddingVertical: 20, justifyContent: 'flex-end' }}>
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
      </View>
    );
  };

  const NewStudentForm = withFormik<any, typeof formInitialValues>({
    validationSchema: NewStudentSchema,

    handleSubmit: (values) => {
      dispatch(createUserAction(
        {
          FirstName: values.FirstName,
          LastName: values.LastName,
          Email: values.Email,
          Phone: values.Phone,
          Notes: values.Notes || '',
        }
      ))
      goBack()
    },
    ...formicDefaultProps,
  })(renderForm);

  return (
    <ScrollView>
      <View style={styles.container}>
        <NewStudentForm />
      </View>
    </ScrollView>
  );
};
