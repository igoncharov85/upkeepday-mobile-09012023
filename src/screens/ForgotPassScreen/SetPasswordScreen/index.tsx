import { FormikProps, withFormik } from 'formik';
import React, { FC, memo, useState } from 'react';
import { View } from 'react-native';
import { formicDefaultProps } from '../../../common/constants/styles/form.config';
import {
  EmailShape,
  PasswordConfirmShape,
} from '../../../common/shemas/auth.shape';
import { IConfirmPassword } from '../../../common/types/auth.types';
import {
  INavigationBase,
  TSetPasswordScreen,
} from '../../../common/types/component.styles';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { CustomButton } from '../../../components/UI/CustomButton';
import { CustomInput } from '../../../components/UI/CustomInput';
import { resetPasswordResetAction } from '../../../store/auth/actions';
import { useAppSelector } from '../../../store/hooks';
import { dispatch } from '../../../store/store';

import styles from './styles';

const formInitialValues = {
  password: '',
  passwordConfirmation: '',
};
interface ISetPasswordScreen extends INavigationBase { }
export const SetPasswordScreen: FC<ISetPasswordScreen> = memo(
  ({ navigation, route }) => {
    const { loading } = useAppSelector(state => state.auth);
    const uuidToken = route?.params?.uuid;
    const renderForm = ({
      touched,
      errors,
      values,
      handleBlur,
      handleChange,
      handleSubmit,
      isValid,
    }: FormikProps<typeof formInitialValues>) => {
      return (
        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              touched={!!touched.password}
              validationErrorText={errors.password}
              placeholder={'password'}
              labelText={'Password'}
              secureTextEntry
              isPassword
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.passwordConfirmation}
              touched={!!touched.passwordConfirmation}
              validationErrorText={errors.passwordConfirmation}
              placeholder={'password'}
              labelText={'Repeat password'}
              secureTextEntry
              isPassword
            />
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Confirm'}
              onPress={handleSubmit}
              disabled={!(isValid && !!Object.keys(touched).length)}
              loading={loading}
            />
          </View>
        </View>
      );
    };

    const EmailForm = withFormik<any, typeof formInitialValues>({
      // Transform outer props into form values
      validationSchema: PasswordConfirmShape,

      handleSubmit: values => {
        const data: IConfirmPassword = {
          Password: values.password,
          uuid: uuidToken,
        };
        dispatch(resetPasswordResetAction(data))
      },
      ...formicDefaultProps,
    })(renderForm);

    return (
      <View style={styles.container}>
        <ScreenHeader text="Forgot Password" />
        <EmailForm />
      </View>
    );
  },
);
