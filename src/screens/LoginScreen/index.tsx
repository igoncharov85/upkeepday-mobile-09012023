import {FormikProps, withFormik} from 'formik';
import React, {FC, memo} from 'react';
import {Text, View} from 'react-native';
import CalendarSvg from '../../../assets/svg/CalendarSvg';
import {NavigationEnum} from '../../common/constants/navigation';
import {LoginSchema} from '../../common/shemas/auth.shape';
import {INavigationBase} from '../../common/types/component.styles';
import {ScreenHeader} from '../../components/ScreenHeader';
import {CustomButton} from '../../components/UI/CustomButton';
import {CustomInput} from '../../components/UI/CustomInput';
import styles from './styles';

const formInitialValues = {
  email: '',
  password: '',
};
interface ILoginScreen extends INavigationBase {}
export const LoginScreen: FC<ILoginScreen> = memo(({navigation}) => {
  const onForgotPassRedirect = () => {
    navigation.navigate(NavigationEnum.FORGOT_PASSWORD);
  };
  const onRegistrationRedirect = () => {
    navigation.navigate(NavigationEnum.REGISTRATION);
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
            disabled={!(isValid && !!(Object.keys(touched).length))}
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
      console.log('login!!!', values);
    },
    validateOnChange: true,
  })(renderForm);
  return (
    <View style={styles.container}>
      <ScreenHeader text={'Login'} />
      <View style={styles.imgWrapper}>
        <CalendarSvg />
      </View>

      <LoginForm />
      <View style={styles.forgotPassword}>
        <Text onPress={onForgotPassRedirect} style={styles.forgotPasswordText}>
          Forgot Password
        </Text>
      </View>

      <View style={styles.footerWrapper}>
        <Text onPress={onRegistrationRedirect} style={styles.footerText}>
          I’m a new user. Registration
        </Text>
      </View>
    </View>
  );
});
