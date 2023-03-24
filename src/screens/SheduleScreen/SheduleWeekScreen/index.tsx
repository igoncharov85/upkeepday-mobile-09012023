import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { dataOfMonth as nestedDataOfMonth } from '..'; // Import the correct dataOfMonth from your data source
import { DaysOfWeek } from './DaysOfWeek';
import { SheduleTable } from './SheduleTable';
import styles from './styles';

interface ISheduleWeekScreen {}

const getStartAndEndOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return { startOfWeek, endOfWeek };
};

export const SheduleWeekScreen: FC<ISheduleWeekScreen> = memo(() => {
  const firstEventDate = new Date(nestedDataOfMonth[0][0].StartDateTime);
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(firstEventDate);
  console.log(startOfWeek,endOfWeek,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7')
  const flattenedDataOfMonth = nestedDataOfMonth.flat();
  console.log(flattenedDataOfMonth,'flattenedDataOfMonth')
  return (
    <View style={styles.container}>
      <DaysOfWeek />
      <SheduleTable
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
        dataOfMonth={flattenedDataOfMonth}
      />
    </View>
  );
});
