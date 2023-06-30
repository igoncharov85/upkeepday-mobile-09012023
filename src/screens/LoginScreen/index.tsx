import { FormikProps, withFormik } from 'formik';
import React, { FC, memo, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import CalendarSvg from '../../../assets/svg/CalendarSvg';
import { NavigationEnum } from '../../common/constants/navigation';
import { keyboardSettings } from '../../common/constants/styles/keyboard';
import { LoginSchema } from '../../common/shemas/auth.shape';
import { ILoginRequest } from '../../common/types/auth.types';
import { INavigationBase } from '../../common/types/component.styles';
import { KeyboardDismissHOC } from '../../components/hoc/KeyboardDismissHOC';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomButton } from '../../components/UI/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput';
import NavigationActions from '../../services/navigation-service';
import { loginAction } from '../../store/auth/actions';
import { useAppSelector } from '../../store/hooks';
import { dispatch } from '../../store/store';
import styles from './styles';

const formInitialValues = {
  email: '',
  password: '',
};
interface ILoginScreen extends INavigationBase { }
export const LoginScreen: FC<ILoginScreen> = memo(({ navigation }) => {
  const { loading } = useAppSelector(state => state.auth);
  const onForgotPassRedirect = () => {
    navigation.navigate(NavigationEnum.FORGOT_PASSWORD_SEND_EMAIL);
  };
  const onRegistrationRedirect = () => {
    navigation.navigate(NavigationEnum.REGISTRATION);
  };
  useEffect(() => {
    NavigationActions.setNavigator(navigation);
  }, []);
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
      console.log('login worked', data);
    },
    validateOnChange: true,
  })(renderForm);
  return (
    <KeyboardAvoidingView style={styles.container} {...keyboardSettings} keyboardVerticalOffset={100}>
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
