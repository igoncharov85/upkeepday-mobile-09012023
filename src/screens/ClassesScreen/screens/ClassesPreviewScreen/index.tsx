import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { IClassesResponse } from '../../../../common/types/classes.types';
import { ScreenHeader } from '../../../../components/ScreenHeader';

import { CustomButton } from '../../../../components/UI/CustomButton';
import { DayScroller } from '../../../../components/UI/DayScroller';
import { ScreenLoading } from '../../../../components/UI/ScreenLoading';
import { useTypedNavigation } from '../../../../hook/useTypedNavigation';
import { getWeekDates } from '../../../../services/utils/fullDateToValue.util';
import { addDayAndHoursToDate } from '../../../../services/utils/generateDate.util';
import {
  fetchClassesSchedule,
  fetchSessionClassesByIdAction,
} from '../../../../store/classes/actions';
import { useAppSelector } from '../../../../store/hooks';
import { dispatch } from '../../../../store/store';
import { DaysOfWeek } from './DaysOfWeek';
import styles from './styles';
import { WeekTable } from './WeekTable';



interface IDatePreviewScreen { }
const ClassesPreviewScreen: React.FC<IDatePreviewScreen> = () => {
  const { navigate, goBack } = useTypedNavigation();
  const route = useRoute();
  const { item } = route.params as { item: IClassesResponse };
  const { loading }: any = useAppSelector(state => state.classes);
  const startLessonDate = moment(item.StartDate).toDate();
  const todayDate = new Date();
  const startOfWeekDate =
    todayDate > startLessonDate ? todayDate : startLessonDate;
  const weekDates = getWeekDates(startOfWeekDate);
  const [startDateWeek, setStartDateWeek] = useState(
    new Date(weekDates.startDate),
  );
  const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));

  const goToNextWeek = () => {
    setStartDateWeek(
      new Date(addDayAndHoursToDate(startDateWeek.toISOString(), 7, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(endDateWeek.toISOString(), 7, 0)),
    );
  };

  const goToPrevWeek = () => {
    setStartDateWeek(
      new Date(addDayAndHoursToDate(startDateWeek.toISOString(), -7, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(endDateWeek.toISOString(), -7, 0)),
    );
  };

  const onSave = () => {
    navigate(NavigationEnum.CLASSES_TAB);
  };

  useEffect(() => {
    // dispatch(fetchSessionClassesByIdAction(item.ClassId));
    dispatch(fetchClassesSchedule({ classId: item.ClassId }));
  }, []);

  return loading ? (
    <ScreenLoading />
  ) : (
    <View style={{ height: '100%' }}>
      <View style={styles.header}>
        <ScreenHeader
          text={'View and Reschedule'}
          onBackPress={goBack}
          withBackButton={true}
        />
      </View>
      <Text style={styles.subTitle}>
        Hold and Drop in the desired spot to reschedule
      </Text>
      <View style={{ marginHorizontal: 20, marginTop: 12 }}>
        <DayScroller
          title={moment(startDateWeek).format('MMMM')}
          onPressLeft={goToPrevWeek}
          onPressRight={goToNextWeek}
        />
        <DaysOfWeek
          startOfWeek={startDateWeek}
          goToNextWeek={goToNextWeek}
          goToPrevWeek={goToPrevWeek}
        />
      </View>
      {
        <View style={{ flex: 1 }}>
          <WeekTable
            classId={item.ClassId}
            startOfWeek={startDateWeek}
            endOfWeek={endDateWeek}
          />
        </View>
      }
      <View style={{ padding: 20, justifyContent: 'flex-end' }}>
        <CustomButton text={'Ok'} onPress={onSave} />
      </View>
    </View>
  );
};

export default ClassesPreviewScreen;
