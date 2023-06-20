import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { DaysOfWeekItem } from './DaysOfWeekItem';
import styles from './styles';
interface IDaysOfWeek {
  startOfWeek: Date
}

export const DaysOfWeek: FC<IDaysOfWeek> = memo(({ startOfWeek }) => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const daysWeek = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayOfWeek = daysOfWeek[i];
    const dayOfMonth = day.getDate().toString();
    const isToday = day.toDateString() === new Date().toDateString();
    daysWeek.push({ dayOfWeek, dayOfMonth, isToday });
  }

  return (
    <View style={styles.containerWekk}>
      {daysWeek.map((item, index) => (
        <DaysOfWeekItem
          key={`${item.dayOfMonth}`}
          daysOfWeek={item.dayOfWeek}
          number={item.dayOfMonth}
          isToday={item.isToday}
        />
      ))}
    </View>
  );
});
