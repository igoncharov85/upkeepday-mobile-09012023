import React, { FC, memo, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import { DaysOfWeek } from './DaysOfWeek';
import { SheduleTable } from './SheduleTable';
import styles from './styles';
import { addDayAndHoursToDate, getStartAndEndOfWeek } from '../../../services/utils/generateDate.util';
import { getWeekDates } from '../../../services/utils/fullDateToValue.util';

interface ISheduleWeekScreen { }



export const SheduleWeekScreen: FC<ISheduleWeekScreen> = memo(() => {

  const today = new Date();
  const weekDates = getWeekDates(today);
  const [startDateWeek, setStartDateWeek] = useState(new Date(weekDates.startDate));
  const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));


  const onPanResponderRelease = (evt: any, gestureState: { dx: number; }) => {
    if (gestureState.dx < -50) {
      goToNextWeek()
    } else if (gestureState.dx > 50) {
      goToPrevWeek()
    }
  }
  const goToNextWeek = () => {
    setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), 7, 0)))
    setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), 7, 0)))
    console.log('next');

  }
  const goToPrevWeek = () => {
    setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), -7, 0)))
    setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), -7, 0)))
    console.log('prev');
  }
  return (
    <View style={styles.container} >
      <DaysOfWeek startOfWeek={startDateWeek} endOfWeek={endDateWeek} />
      <SheduleTable
        startOfWeek={startDateWeek}
        endOfWeek={endDateWeek}
        goToNextWeek={goToNextWeek}
        goToPrevWeek={goToPrevWeek}
      />
    </View>
  );
});
