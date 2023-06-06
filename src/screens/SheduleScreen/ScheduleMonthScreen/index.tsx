import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScheduleCalendar } from './ScheduleCalendar';

// import styles from './styles';

interface IScheduleMonthScreen { }



export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  return <ScheduleCalendar startingDayOfWeek={0} />;
});


type Month = {
  key: string;
  name: string;
  days: number;
  firstDay: number;
};


