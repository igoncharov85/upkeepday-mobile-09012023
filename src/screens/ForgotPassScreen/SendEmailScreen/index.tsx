import {FormikProps, withFormik} from 'formik';
import React, {FC, memo, useState} from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import {formicDefaultProps} from '../../../common/constants/styles/form.config';
import { keyboardSettings } from '../../../common/constants/styles/keyboard';
import {EmailShape} from '../../../common/shemas/auth.shape';
import {
  INavigationBase,
  TSetPasswordScreen,
} from '../../../common/types/component.styles';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {CustomButton} from '../../../components/UI/CustomButton';
import {CustomInput} from '../../../components/UI/CustomInput';
import { resetPasswordSendEmailAction } from '../../../store/auth/actions';
import { useAppSelector } from '../../../store/hooks';
import { dispatch } from '../../../store/store';

import styles from './styles';

const formInitialValues = {
  email: '',
};
interface ISendEmailScreen extends INavigationBase {
}

export const SendEmailScreen: FC<ISendEmailScreen> = memo(
  ({navigation}) => {
    const {loading} = useAppSelector(state => state.auth);
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
          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Continue'}
              onPress={handleSubmit}
              disabled={!isValid}
              loading={loading}
            />
          </View>
        </View>
      );
    };

    const EmailForm = withFormik<any, typeof formInitialValues>({
      // Transform outer props into form values
      validationSchema: EmailShape,

      handleSubmit: values => {
        dispatch(resetPasswordSendEmailAction(values.email))
      },
      ...formicDefaultProps,
    })(renderForm);

    return (
      <KeyboardAvoidingView style={styles.container} {...keyboardSettings}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scroll}>
          <ScreenHeader
            text={'Forgot Password'}
            withBackButton={true}
            onBackPress={() => navigation.goBack()}
          />
          <EmailForm />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  },
);
