import React, {memo, useState} from 'react';
import {
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';

import {dataOfMonth} from '..';
import {INavigationBase} from '../../../common/types/component.styles';
import {ScheduleScroller} from '../components/ScheduleScroller';
import {SessionItemList} from './SessionList';

import styles from './styles';

enum LessonType {
  Lesson,
  Trial,
}

interface IScheduleDayScreen {}

export const ScheduleDayScreen: React.FC<IScheduleDayScreen> = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(new Date().getDate() - 1);
  const [currentDayData, setCurrentDayData] = useState(
    dataOfMonth[new Date().getDate() - 1],
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextDay = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCurrentDayData(dataOfMonth[newIndex]);
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    console.log(`New index: ${newIndex}`);
  };

  const handlePrevDay = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentDayData(dataOfMonth[newIndex]);
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    console.log(`New index: ${newIndex}`);
  };

  const date = currentDate.toLocaleDateString('default', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const today = new Date();
  console.log(today, 'today');
  return (
    <View>
      <ScheduleScroller
        title={date}
        onPressLeft={handlePrevDay}
        onPressRight={handleNextDay}
      />
      <SessionItemList data={currentDayData} />
    </View>
  );
});
