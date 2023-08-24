import {useRoute} from '@react-navigation/native';
import {FormikProps, withFormik} from 'formik';
import moment from 'moment';
import React, {memo, useState} from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {NavigationEnum} from '../../../../common/constants/navigation';
import {ScreenHeader} from '../../../../components/ScreenHeader';
import {CustomButton} from '../../../../components/UI/CustomButton';
import {useTypedNavigation} from '../../../../hook/useTypedNavigation';
import {convertDate} from '../../../../services/utils/fullDateToValue.util';
import {fetchGeneratedClassesAction} from '../../../../store/classes/actions';
import {dispatch} from '../../../../store/store';
import {InputForm} from '../../../AddClassScreen/components/InputForm';
import {ListButtons} from '../../../AddClassScreen/components/ListButtons';
import {ListGradientCircleButtons} from '../../../AddClassScreen/components/ListGradientCircleButtons';
import CalendarComponent from '../../../SheduleScreen/components/CalendarComponent';

import styles from './styles';

enum TypeDate {
  FixedNumberOfClasses = 0,
  OnSpecificDate = 1,
  FixedWeekNumber = 2,
  FixedMonthNumber = 3,
}

export enum EndScheduleType {
  FixedClassesNumber = 'FixedClassesNumber',
  SpecificEndDate = 'SpecificEndDate',
  FixedWeekNumber = 'FixedWeekNumber',
  FixedMonthNumber = 'FixedMonthNumber',
}

interface ISelectDateScreen {}

let windowHeight: any;
if (Platform.OS === 'ios') {
  windowHeight = Dimensions.get('window').height - 80;
} else {
  windowHeight = Dimensions.get('window').height - 20;
}
export const ClassesEditDateScreen: React.FC<ISelectDateScreen> = memo(() => {
  const route = useRoute();
  const {item}: any = route.params;

  const formInitialValues = {
    endScheduleType: '',
    startDate: item.StartDate,
    totalClasses: item.EndNumber || 0,
    finishDate: item.EndDate || '',
    numberOf: item.EndNumber || 0,
  };
  const {navigate, goBack} = useTypedNavigation();
  const endScheduleType = item.EndScheduleType;

  const SelectDateForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    isValid,
  }: FormikProps<typeof formInitialValues>) => {
    const getTypeDate = (type: string) => {
      switch (type) {
        case EndScheduleType.FixedClassesNumber:
          return TypeDate.FixedNumberOfClasses;
        case EndScheduleType.SpecificEndDate:
          return TypeDate.OnSpecificDate;
        case EndScheduleType.FixedWeekNumber:
          return TypeDate.FixedWeekNumber;
        case EndScheduleType.FixedMonthNumber:
          return TypeDate.FixedWeekNumber;
      }
    };

    return (
      <View
        style={[
          styles.container,
          {minHeight: windowHeight, justifyContent: 'flex-start'},
        ]}>
        <ScreenHeader
          onBackPress={goBack}
          text="Update Finish Date (Extend)"
          withBackButton={true}
        />
        <View>
          <ListButtons
            disabled
            buttons={[
              ' Fixed number of sessions',
              'On Specific Date',
              ' Fixed period in time',
            ]}
            label="Class Type"
            onPress={() => {}}
            index={getTypeDate(endScheduleType)}
          />
          {endScheduleType == EndScheduleType.FixedClassesNumber && (
            <InputForm
              keyboardType="numeric"
              labelText="Enter Total Number of Sessions"
              onChangeText={handleChange('totalClasses')}
              value={values.totalClasses.toString()}
            />
          )}
          {endScheduleType == EndScheduleType.SpecificEndDate && (
            <InputWithDate
              labelText={'Enter Finish Date'}
              handleChange={setFieldValue}
              nameField="finishDate"
              dateValue={values.finishDate}
            />
          )}

          {endScheduleType == EndScheduleType.FixedMonthNumber ||
            (endScheduleType == EndScheduleType.FixedWeekNumber && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <InputForm
                  keyboardType="numeric"
                  labelText="Number of"
                  onChangeText={handleChange('numberOf')}
                  value={values.numberOf.toString()}
                  style={{width: 180, marginRight: 24}}
                />
                <ListGradientCircleButtons
                  onPress={() => {}}
                  buttons={['Weeks', 'Months']}
                />
              </View>
            ))}
        </View>

        <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
          <CustomButton
            text={'Next Step'}
            //@ts-ignore
            onPress={handleSubmit}
            disabled={!isValid}
          />
        </View>
      </View>
    );
  };

  const FormikSelectDateScreen = withFormik<any, typeof formInitialValues>({
    mapPropsToValues: () => {
      return formInitialValues;
    },
    validationSchema: () => {
      return Yup.object().shape({
        startDate: Yup.string().required(''),
        totalClasses:
          endScheduleType == EndScheduleType.FixedClassesNumber
            ? Yup.number()
                .min(1, 'Total number of sessions should be greater than 0')
                .required('')
            : Yup.number(),
        finishDate:
          endScheduleType == EndScheduleType.SpecificEndDate
            ? Yup.string()
                .test(
                  'endDate',
                  'Finish date should be greater than start date',
                  function (value: any) {
                    const {startDate}: any = this.parent;

                    return new Date(value) > new Date(startDate);
                  },
                )
                .required('start date')
            : Yup.string(),
        numberOf:
          endScheduleType == EndScheduleType.FixedWeekNumber ||
          endScheduleType == EndScheduleType.FixedMonthNumber
            ? Yup.number().min(1, 'NumberOf ').required('')
            : Yup.number(),
      });
    },
    handleSubmit: values => {
      let sendString = '';
      switch (endScheduleType) {
        case EndScheduleType.FixedClassesNumber:
          sendString = values.totalClasses;
          break;
        case EndScheduleType.SpecificEndDate:
          sendString = values.finishDate;
          break;
        case EndScheduleType.FixedWeekNumber:
        case EndScheduleType.FixedMonthNumber:
          sendString = values.numberOf;
          break;
      }
      dispatch(fetchGeneratedClassesAction({id: item.ClassId, to: sendString}));
      navigate(NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN, {
        item,
        sendString,
      });
    },
  })(SelectDateForm);

  return (
    <ScrollView style={{height: '100%'}}>
      <FormikSelectDateScreen />
    </ScrollView>
  );
});

const InputWithDate = ({
  labelText,
  nameField,
  handleChange,
  dateValue,
}: {
  labelText: string;
  nameField: string;
  handleChange: any;
  dateValue?: any;
}) => {
  const [date, setDate] = useState(
    dateValue
      ? convertDate(moment(dateValue, 'YYYY-MM-DD').format('MMM D, YYYY'))[1]
      : '',
  );
  const [visible, setVisible] = useState(false);

  const handleChangeVisible = () => setVisible(!visible);

  const handleChangeDate = (date: string) => {
    setDate(convertDate(date)[1]);
    handleChangeVisible();
    handleChange(nameField, convertDate(date)[0]);
  };
  function convertDateFormat(dateString: string) {
    const dateArr = dateString.split('/');
    [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];

    const newDateString = dateArr[0] ? dateArr.join('/') : '';

    return newDateString;
  }

  return (
    <View>
      <Text style={styles.label}>{labelText && labelText}</Text>
      <TouchableOpacity onPress={handleChangeVisible} activeOpacity={1}>
        <View style={styles.interactive}>
          <Text>{convertDateFormat(date)}</Text>
        </View>
      </TouchableOpacity>
      <CalendarComponent
        visible={visible}
        date={dateValue}
        onDayPress={handleChangeDate}
      />
    </View>
  );
};

export default ClassesEditDateScreen;
