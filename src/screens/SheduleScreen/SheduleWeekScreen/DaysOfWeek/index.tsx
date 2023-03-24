import React, {FC, memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DaysOfWeekItem} from './DaysOfWeekItem';
import styles from './styles';
interface IDaysOfWeek {}

export const DaysOfWeek: FC<IDaysOfWeek> = memo(() => {
  const today = new Date(); // get the current date
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // get the start date of the week (Sunday)
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // get the end date of the week (Saturday)
  const daysWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayOfWeek = daysOfWeek[i];
    const dayOfMonth = day.getDate().toString();
    const isToday = day.toDateString() === new Date().toDateString(); // check if the current day is today
    daysWeek.push({ dayOfWeek, dayOfMonth, isToday });
  }

  return (
    <View style={styles.containerWekk}>
      {daysWeek.map((item) => (
        <DaysOfWeekItem
          daysOfWeek={item.dayOfWeek}
          number={item.dayOfMonth}
          isToday={item.isToday}
        />
      ))}
    </View>
  );
});

