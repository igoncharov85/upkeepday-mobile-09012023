import {FormikProps, withFormik} from 'formik';
import React, {FC, memo} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import { keyboardSettings } from '../../../common/constants/styles/keyboard';
import {PasswordConfirmShape} from '../../../common/shemas/auth.shape';
import {IConfirmPassword} from '../../../common/types/auth.types';
import {INavigationBase} from '../../../common/types/component.styles';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {CustomButton} from '../../../components/UI/CustomButton';
import {CustomInput} from '../../../components/UI/CustomInput';
import {confirmRegistrationPasswordAction} from '../../../store/auth/actions';
import {useAppSelector} from '../../../store/hooks';
import {dispatch} from '../../../store/store';
import styles from './styles';

const formInitialValues = {
  passwordConfirmation: '',
  password: '',
};
interface IFinalScreen extends INavigationBase {}
export const FinalRegistrationScreen: FC<IFinalScreen> = memo(
  ({navigation, route}) => {
    const {loading} = useAppSelector(state => state.auth);
    const {registrationForm} = useAppSelector(state => state.cache);
    const uuidToken = route?.params?.uuid;
    console.log('uuidToken!!!!', uuidToken);
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
              disabled={true}
              value={registrationForm?.Login || 'email'}
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
              secureTextEntry
              isPassword
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
              placeholder={'Password confirmation'}
              secureTextEntry
              isPassword
              labelText={'Password confirmation'}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Confirm'}
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
      validationSchema: PasswordConfirmShape,

      handleSubmit: values => {
        // do submitting things
        const data: IConfirmPassword = {
          Password: values.password,
          uuid: uuidToken,
        };

        dispatch(confirmRegistrationPasswordAction(data));
      },
      validateOnChange: true,
    })(renderForm);
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        {...keyboardSettings}>
        <View style={styles.container}>
          <ScreenHeader text={'Finish Registration'} />
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    );
  },
);
