import {FormikProps, withFormik} from 'formik';
import React, {FC, memo, ReactNode} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {formicDefaultProps} from '../../../common/constants/styles/form.config';
import {StudentRegistrationShape} from '../../../common/shemas/auth.shape';
import {TRegistrationScreen} from '../../../common/types/component.styles';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {CustomButton} from '../../../components/UI/CustomButton';
import {CustomInput} from '../../../components/UI/CustomInput';
import styles from './styles';

const registrationProps = {
  email: '',
  password: '',
  passwordConfirmation: '',
};
interface IStudentRegistrationScreen {
  setScreen: (screen: TRegistrationScreen) => any;
}
export const TutorRegistrationScreen: FC<IStudentRegistrationScreen> = memo(
  ({setScreen}) => {
    const renderForm = ({
      touched,
      errors,
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      isValid,
    }: FormikProps<typeof registrationProps>) => {
      return (
        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              touched={!!touched.email}
              validationErrorText={errors.email}
              placeholder={'Email'}
              labelText={'Email'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              touched={!!touched.password}
              validationErrorText={errors.password}
              placeholder={'Password'}
              labelText={'Password'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              touched={!!touched.passwordConfirmation}
              validationErrorText={errors.passwordConfirmation}
              placeholder={'Repeat password'}
              labelText={'Repeat password'}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Sign Up'}
              onPress={handleSubmit}
              disabled={!(isValid && !!Object.keys(touched).length)}
            />
          </View>
        </View>
      );
    };
    const RegistrationForm = withFormik<any, typeof registrationProps>({
      // Transform outer props into form values
      validationSchema: StudentRegistrationShape,

      handleSubmit: values => {
        // do submitting things
        console.log('login!!!', values);
      },
      ...formicDefaultProps,
    })(renderForm);
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scroll}>
        <ScreenHeader text={'Tutor Sign Up'} />
        <RegistrationForm />
        <Text style={styles.text}>I’m an existing user. Login</Text>
      </ScrollView>
    );
  },
);
