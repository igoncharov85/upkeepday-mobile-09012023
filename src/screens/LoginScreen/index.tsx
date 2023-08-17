import { FormikProps, withFormik } from 'formik';
import React, { FC, memo } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import CalendarSvg from '../../../assets/svg/CalendarSvg';
import { NavigationEnum } from '../../common/constants/navigation';
import { keyboardSettings } from '../../common/constants/styles/keyboard';
import { LoginSchema } from '../../common/shemas/auth.shape';
import { ILoginRequest } from '../../common/types/auth.types';
import { KeyboardDismissHOC } from '../../components/hoc/KeyboardDismissHOC';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomButton } from '../../components/UI/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { loginAction } from '../../store/auth/actions';
import { useAppSelector } from '../../store/hooks';
import { dispatch } from '../../store/store';
import styles from './styles';

const formInitialValues = {
  email: '',
  password: '',
};
export const LoginScreen: FC = memo(() => {
  const { loading } = useAppSelector(state => state.auth);
  const { navigate } = useTypedNavigation();
  const onForgotPassRedirect = () => {
    navigate(NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL);
  };
  const onRegistrationRedirect = () => {
    navigate(NavigationEnum.REGISTRATION);
  };
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
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            touched={!!touched.email}
            validationErrorText={errors.email}
            placeholder={'Email'}
            labelText={'Email'}
            inputMode="email"
            keyboardType="email-address"
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
            secureTextEntry
            isPassword
            labelText={'Password'}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            text={'Login'}
            //@ts-ignore
            onPress={handleSubmit}
            loading={loading}
            disabled={!(isValid && !!Object.keys(touched).length)}
          />
        </View>
      </View>
    );
  };
  const LoginForm = withFormik<any, typeof formInitialValues>({
    // Transform outer props into form values
    validationSchema: LoginSchema,

    handleSubmit: values => {
      // do submitting things
      const data: ILoginRequest = {
        Login: values.email,
        Password: values.password,
      };
      dispatch(loginAction(data));
      navigate(NavigationEnum.HOME_SCREEN);
    },
    validateOnChange: true,
  })(renderForm);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      {...keyboardSettings}
      keyboardVerticalOffset={100}>
      <KeyboardDismissHOC extraStyles={styles.contentWrapper}>
        <ScreenHeader text={'Login'} />
        <View style={styles.imgWrapper}>
          <CalendarSvg />
        </View>

        <LoginForm />
        <View style={styles.forgotPassword}>
          <Text
            onPress={onForgotPassRedirect}
            style={styles.forgotPasswordText}>
            Forgot Password
          </Text>
        </View>
      </KeyboardDismissHOC>

      <View style={styles.footerWrapper}>
        <Text onPress={onRegistrationRedirect} style={styles.footerText}>
          I’m a new user. Registration
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
});
