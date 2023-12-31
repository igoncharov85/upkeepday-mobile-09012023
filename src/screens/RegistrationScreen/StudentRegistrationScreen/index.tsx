import {FormikProps, withFormik} from 'formik';
import React, {FC, memo, useEffect, useMemo} from 'react';
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import {NavigationEnum} from '../../../common/constants/navigation';
import {formicDefaultProps} from '../../../common/constants/styles/form.config';
import {keyboardSettings} from '../../../common/constants/styles/keyboard';
import {StudentRegistrationShape} from '../../../common/shemas/auth.shape';
import {IRegistrationRequest, TRole} from '../../../common/types/auth.types';
import {
  INavigationBase,
  TRegistrationScreen,
} from '../../../common/types/component.styles';
import {ScreenHeader} from '../../../components/ScreenHeader';
import {CountrySelect} from '../../../components/UI/CountrySelect';
import {CustomButton} from '../../../components/UI/CustomButton';
import {CustomInput} from '../../../components/UI/CustomInput';
import {StateSelect} from '../../../components/UI/StateSelect';
// import {useTypedNavigation} from '../../../hook/useTypedNavigation';
import {setStatesAction} from '../../../store/auth';
import {
  fetchCountriesAction,
  registrationAction,
} from '../../../store/auth/actions';
import {cacheRegistrationFormAction} from '../../../store/cached';
import {useAppSelector} from '../../../store/hooks';
import {dispatch} from '../../../store/store';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const registrationProps = {
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  phone: '',
  address: '',
  postalCode: '',
  country: '',
  state: '',
};

interface IStudentRegistrationScreen extends INavigationBase {
  setScreen: (screen: TRegistrationScreen) => any;
  type: TRole;
}
export const StudentRegistrationScreen: FC<IStudentRegistrationScreen> = memo(
  ({setScreen, type}) => {
    const {loading} = useAppSelector(state => state.auth);
    const {navigate} = useNavigation<NativeStackNavigationProp<any>>();
    useEffect(() => {
      dispatch(setStatesAction([]));
      dispatch(fetchCountriesAction());
    }, []);

    const getAppropriateHeader = () => {
      switch (type) {
        case 'student':
          return 'Student Sign Up';
        case 'teacher':
          return 'Tutor Sign Up';
      }
    };

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
              inputMode="email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              autoCapitalize="words"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              touched={!!touched.firstName}
              validationErrorText={errors.firstName}
              placeholder={'First name'}
              labelText={'First name'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              autoCapitalize="words"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              touched={!!touched.lastName}
              validationErrorText={errors.lastName}
              placeholder={'Last name'}
              labelText={'Last name'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              touched={!!touched.phone}
              validationErrorText={errors.phone}
              placeholder={'Phone number (optional)'}
              labelText={'Phone number (optional)'}
              inputMode="tel"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              autoCapitalize="words"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              touched={!!touched.address}
              validationErrorText={errors.address}
              placeholder={'Address'}
              labelText={'Address'}
            />
          </View>
          <View style={styles.rowInput}>
            <View style={styles.inputSplitted}>
              <CountrySelect
                label={'Country'}
                onChange={handleChange('country')}
                value={values.country}
                placeholder={'Select country'}
              />
            </View>
            <View style={styles.inputSplitted}>
              <StateSelect
                label={'State'}
                value={values.state}
                onChange={handleChange('state')}
                placeholder={'Select state'}
              />
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
              onChangeText={handleChange('postalCode')}
              onBlur={handleBlur('postalCode')}
              value={values.postalCode}
              touched={!!touched.postalCode}
              validationErrorText={errors.postalCode}
              placeholder={'Postal code'}
              labelText={'Postal code'}
              inputMode="numeric"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Sign Up'}
              //@ts-ignore
              onPress={handleSubmit}
              loading={false}
              disabled={!(isValid && !!Object.keys(touched).length)}
            />
          </View>
        </View>
      );
    };
    const RegistrationForm = useMemo(
      () =>
        withFormik<any, typeof registrationProps>({
          // Transform outer props into form values
          validationSchema: StudentRegistrationShape,

          handleSubmit: values => {
            const data: IRegistrationRequest = {
              AddressLine1: values.address,
              Country: values.country,
              FirstName: values.firstName,
              LastName: values.lastName,
              Login: values.email,
              PhoneCountry: values.postalCode,
              Phone: values.phone,
              PostalCode: values.postalCode,
              State: values.state,
            };
            dispatch(registrationAction({data, type}));
            dispatch(cacheRegistrationFormAction(data));
          },
          ...formicDefaultProps,
          enableReinitialize: false,
          validateOnBlur: true,
        })(renderForm),
      [loading],
    );

    return (
      <KeyboardAvoidingView style={styles.container} {...keyboardSettings}>
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.scroll}>
          <ScreenHeader
            text={getAppropriateHeader()}
            withBackButton={true}
            onBackPress={() => setScreen('type')}
          />
          <RegistrationForm />
          <Text
            style={styles.text}
            onPress={() => navigate(NavigationEnum.LOGIN)}>
            I’m an existing user. Login
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  },
);
