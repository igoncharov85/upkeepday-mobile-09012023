import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DaysOfWeek } from './DaysOfWeek';
import { SheduleTable } from './SheduleTable';
import styles from './styles';
import { getStartAndEndOfWeek } from '../../../services/utils/generateDate.util';
import { getWeekDates } from '../../../services/utils/fullDateToValue.util';

interface ISheduleWeekScreen { }



export const SheduleWeekScreen: FC<ISheduleWeekScreen> = memo(() => {

  const today = new Date();
  const weekDates = getWeekDates(today);

  return (
    <View style={styles.container}>
      <DaysOfWeek />
      <SheduleTable
        startOfWeek={weekDates.startDate}
        endOfWeek={weekDates.endDate}
      />
    </View>
  );
});
