import React, { FC, memo } from 'react';
import { PanResponder, View } from 'react-native';
import { DaysOfWeekItem } from './DaysOfWeekItem';
import styles from './styles';
interface IDaysOfWeek {
  startOfWeek: Date;

  goToNextWeek: () => void;
  goToPrevWeek: () => void;
}

export const DaysOfWeek: FC<IDaysOfWeek> = memo(({ startOfWeek, goToNextWeek, goToPrevWeek }) => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return true;
    },
    onPanResponderRelease: (evt, gestureState) => {

      if (gestureState.dx < -50) {
        goToNextWeek();
      } else if (gestureState.dx > 50) {
        goToPrevWeek();
      }
    },
  });
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
    <View style={styles.containerWekk} {...panResponder.panHandlers}>
      {daysWeek.map((item, index) => (
        <DaysOfWeekItem
          key={`${item.dayOfMonth}-${item.dayOfWeek}-${index}`}
          daysOfWeek={item.dayOfWeek}
          number={item.dayOfMonth}
          isToday={item.isToday}
        />
      ))}
    </View>
  );
});
