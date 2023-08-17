import {FormikProps, withFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {formicDefaultProps} from '../../common/constants/styles/form.config';
import {NewStudentSchema} from '../../common/shemas/addClass.shape';
import {IExistingStudent} from '../../common/types/schedule.types';
import {ScreenHeader} from '../../components/ScreenHeader';
import {CustomButton} from '../../components/UI/CustomButton';
import {useTypedNavigation} from '../../hook/useTypedNavigation';
import {useAppSelector} from '../../store/hooks';
import {updateCurrentClassRequestAction} from '../../store/shedule';
import {dispatch} from '../../store/store';
import {InputForm} from '../AddClassScreen/components/InputForm';
import {removeEmptyObjects} from '../AddStudentsScreen';
import styles from '../AddStudentsScreen/NewStudent/styles';

const formInitialValues = {
  FirstName: '',
  LastName: '',
  Email: '',
  Phone: '',
  Notes: '',
};

export const NewStudentScreen: React.FC = () => {
  const {goBack} = useTypedNavigation();
  const [newUser, setNewUser] = useState<IExistingStudent>();

  useEffect(() => {
    newUser && goBack();
  }, [newUser]);

  const renderForm = ({
    touched,
    errors,
    values,
    isValid,
    handleChange,
    handleSubmit,
  }: FormikProps<typeof formInitialValues>) => {
    const {students} = useAppSelector(state => state.user);

    const handleSave = () => {
      handleSubmit();
      if (isValid) {
        console.log(newUser, 'newUser');
        setTimeout(() => {
          dispatch(
            updateCurrentClassRequestAction({
              Students: removeEmptyObjects([...students, newUser]) as any,
            }),
          );
        }, 1000);
      }
    };

    return (
      <View style={{height: '100%', flex: 1, justifyContent: 'space-between'}}>
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
        <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
          <Text style={styles.addMore}>Add One More</Text>
        </TouchableOpacity>
        <View
          style={{paddingVertical: 20, height: 92, justifyContent: 'flex-end'}}>
          <CustomButton
            text={'Save'}
            onPress={handleSave}
            disabled={!isValid}
          />
        </View>
      </View>
    );
  };

  const NewStudentForm = withFormik<any, typeof formInitialValues>({
    validationSchema: NewStudentSchema,

    handleSubmit: (values, {resetForm}) => {
      setNewUser({
        FirstName: values.FirstName,
        LastName: values.LastName,
        Email: values.Email,
        Phone: values.Phone,
        Notes: values.Notes || '',
      });
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
  );
};
