import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Conflict from '../../../assets/svg/Conflict';
import { NavigationEnum } from '../../common/constants/navigation';
import { IGeneratedScheduleEntries } from '../../common/types/schedule.types';
import { ScreenHeader } from '../../components/ScreenHeader';

import { CustomButton } from '../../components/UI/CustomButton';
import { DayScroller } from '../../components/UI/DayScroller';
import { ScreenLoading } from '../../components/UI/ScreenLoading';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { findScheduleConflicts } from '../../services/utils/findConflict.util';
import { addDayAndHoursToDate } from '../../services/utils/generateDate.util';
import { useAppSelector } from '../../store/hooks';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';
import { DaysOfWeek } from './DaysOfWeek';
import styles from './styles';
import { WeekTable } from './WeekTable';
import { getWeekDates } from '../../services/utils/fullDateToValue.util';


function findAdjacentEvent(
  events: any[],
  referenceDate: Date,
  direction: boolean,
) {
  const referenceTime = referenceDate.getTime();

  const filteredEvents = events.filter(event => {
    const eventTime = new Date(event.StartDateTime).getTime();
    return direction ? eventTime > referenceTime : eventTime < referenceTime;
  });

  if (filteredEvents.length === 0) {
    return null; // Нет событий
  }

  filteredEvents.sort((a, b) => {
    const timeA = new Date(a.StartDateTime).getTime();
    const timeB = new Date(b.StartDateTime).getTime();
    return direction ? timeA - timeB : timeB - timeA;
  });

  return filteredEvents[0].StartDateTime;
}
interface IDatePreviewScreen { }
export const DatePreviewScreen: React.FC<IDatePreviewScreen> = () => {
  const { navigate, goBack } = useTypedNavigation();
  const {
    CurrentScheduledEntries,
    WeekTimeSlots,
    GeneratedScheduleEntries,
    loading,
  } = useAppSelector(state => state.schedule);

  const today = new Date();
  const weekDates = getWeekDates(today);


  const [startDateWeek, setStartDateWeek] = useState(
    weekDates.startDate,
  );
  const [endDateWeek, setEndDateWeek] = useState(
    weekDates.endDate
  );
  const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(GeneratedScheduleEntries);
  const [conflict, setConflict] = useState<IGeneratedScheduleEntries[]>(
    findScheduleConflicts(slots, CurrentScheduledEntries),
  );

  const nextConflictWeek = findAdjacentEvent(conflict, endDateWeek, true);
  const prevConflictWeek = findAdjacentEvent(conflict, startDateWeek, false);

  const handeScheduleSlots = (slots: IGeneratedScheduleEntries[]) => {

    setSlots(slots);
    setConflict(findScheduleConflicts(slots, CurrentScheduledEntries));
  };

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
  const goToPrevWeekConflict = () => {
    const getConflict = getWeekDates(moment(prevConflictWeek).toDate());
    setStartDateWeek(
      new Date(addDayAndHoursToDate(getConflict.startDate.toISOString(), 0, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(getConflict.endDate.toISOString(), 0, 0)),
    );
  };
  const goToNextWeekConflict = () => {
    const getConflict = getWeekDates(moment(nextConflictWeek).toDate());
    setStartDateWeek(
      new Date(addDayAndHoursToDate(getConflict.startDate.toISOString(), 0, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(getConflict.endDate.toISOString(), 0, 0)),
    );
  };

  const onSave = () => {
    dispatch(
      updateCurrentClassRequestAction({
        Sessions: slots,
        Slots: WeekTimeSlots,
        //@ts-ignore
        Class: {
          EndNumber: slots.length,
        },
      }),
    );

    navigate(NavigationEnum.ADD_STUDENTS_SCREEN);
  };
  useEffect(() => {
    const today = new Date()
    const firstSessionStartTime = moment(GeneratedScheduleEntries[0]?.StartDateTime).toDate()
    const weekDates = getWeekDates(today > firstSessionStartTime ? today : firstSessionStartTime);
    setStartDateWeek(weekDates.startDate)
    setEndDateWeek(weekDates.endDate)
  }, [GeneratedScheduleEntries]);

  const lessonHasConflict = conflict.length > 0;
  return loading ? (
    <ScreenLoading />
  ) : (
    <View style={{ height: '100%' }}>
      <View style={styles.header}>
        <ScreenHeader
          text={'Preview Day and Time'}
          onBackPress={goBack}
          withBackButton={true}
        />
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 12 }}>
        <DayScroller
          title={moment(startDateWeek).format('MMMM, yyyy')}
          onPressLeft={goToPrevWeek}
          onPressRight={goToNextWeek}
        />
        <DaysOfWeek startOfWeek={startDateWeek} />
      </View>
      <View style={{ flex: 1 }}>
        <WeekTable
          startOfWeek={startDateWeek}
          endOfWeek={endDateWeek}
          onHandleData={handeScheduleSlots}
          conflict={conflict}
        />
      </View>
      <View
        style={[
          styles.conflictContainer,
          { marginBottom: lessonHasConflict ? 0 : -30, zIndex: 100 },
        ]}>
        <View>
          <CustomButton
            text={'<'}
            onPress={prevConflictWeek ? goToPrevWeekConflict : goToPrevWeek}
            style={styles.arrowBtn}
            errorColor={prevConflictWeek}
          />
        </View>
        {lessonHasConflict && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Conflict />
            <Text style={styles.textConflict}>
              You have a conflict. Please check each week
            </Text>
          </View>
        )}
        <View>
          <CustomButton
            text={'>'}
            onPress={nextConflictWeek ? goToNextWeekConflict : goToNextWeek}
            style={styles.arrowBtn}
            errorColor={nextConflictWeek}
          />
        </View>
      </View>
      <Text style={{ textAlign: 'center' }}>
        <Text style={{ fontSize: 17, lineHeight: 34, fontWeight: '700' }}>
          Scheduled Classes:{' '}
        </Text>
        <Text style={{ opacity: 0.4 }}>
          {slots.length || GeneratedScheduleEntries.length || 0}
        </Text>
      </Text>
      <View style={{ padding: 20, justifyContent: 'flex-end' }}>
        <CustomButton
          text={'Next Step'}
          onPress={!lessonHasConflict ? onSave : () => { }}
          disabled={lessonHasConflict}
        />
      </View>
    </View>
  );
};
