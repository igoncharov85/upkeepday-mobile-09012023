import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export const DaysOfWeekItem = ({
  daysOfWeek,
  number,
  isToday,
}: {
  daysOfWeek: string;
  number: string;
  isToday: boolean;
}) => (
  <View style={styles.container}>
    {isToday ? (
      <>
        <View style={styles.background} />
        <Text style={styles.daysOfWeek}>Today</Text>
      </>
    ) : (
      <Text style={styles.daysOfWeek}>{daysOfWeek}</Text>
    )}

    <Text style={styles.number}>{number}</Text>
  </View>
);
