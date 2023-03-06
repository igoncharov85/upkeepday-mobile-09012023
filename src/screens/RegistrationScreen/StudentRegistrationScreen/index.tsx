import {FormikProps, withFormik} from 'formik';
import React, {FC, memo, useEffect, useState} from 'react';
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
import {CustomButton} from '../../../components/UI/CustomButton';
import {CustomInput} from '../../../components/UI/CustomInput';
import {
  fetchCountriesAction,
  fetchStatesAction,
  registrationAction,
} from '../../../store/auth/actions';
import RNPickerSelect from 'react-native-picker-select';
import {cacheRegistrationFormAction} from '../../../store/cached';
import {useAppSelector} from '../../../store/hooks';
import {dispatch} from '../../../store/store';
import styles from './styles';
import SelectArrowIcon from '../../../../assets/svg/SelectArrowIcon';
import {CustomSelect} from '../../../components/UI/CustomSelect';

const registrationProps = {
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
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
  ({setScreen, navigation, type}) => {
    const [currentCountry, setCurrentCountry] = useState<string>('');
    const {states, countries} = useAppSelector(state => state.auth);
    const {loading} = useAppSelector(state => state.auth);
    useEffect(() => {
      dispatch(fetchCountriesAction());
    }, []);
    useEffect(() => {
      console.log('countrie', countries);
      console.log('states', states);
      if (currentCountry) {
        dispatch(fetchStatesAction(currentCountry));
      }
    }, [currentCountry]);
    const getAppropriateHeader = () => {
      switch (type) {
        case 'student':
          return 'Student Sign Up';
        case 'teacher':
          return 'Tutor Sign Up';
      }
    };
    const valueToEntries = (values: Array<string>) => {
      values = values?.length ? values : [];
      return values.map(el => ({value: el, key: el}));
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
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
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
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              touched={!!touched.phoneNumber}
              validationErrorText={errors.phoneNumber}
              placeholder={'Phone number'}
              labelText={'Phone number'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <CustomInput
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
              <CustomSelect
                label={'Country'}
                onChange={(value: string) => {
                  handleChange('country')(value)
                  setCurrentCountry(value)
                }}
                value={values.country}
                options={valueToEntries(countries || [])}
                placeholder={'Select country'}
              />
            </View>
            <View style={styles.inputSplitted}>
              <CustomSelect
                label={'State'}
                value={values.state}
                onChange={handleChange('state')}
                options={valueToEntries(states || [])}
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
            />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton
              text={'Sign Up'}
              onPress={handleSubmit}
              loading={loading}
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
        const data: IRegistrationRequest = {
          AddressLine1: values.address,
          Country: values.country,
          FirstName: values.firstName,
          LastName: values.lastName,
          Login: values.email,
          PhoneCountry: values.postalCode,
          PhoneNumber: values.phoneNumber,
          PostalCode: values.postalCode,
          State: values.state,
        };
        dispatch(registrationAction({data, type}));
        dispatch(cacheRegistrationFormAction(data));
        console.log('login worked', data);
      },
      ...formicDefaultProps,
    })(renderForm);
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
            onPress={() => navigation.navigate(NavigationEnum.LOGIN)}>
            I’m an existing user. Login
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  },
);
