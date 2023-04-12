import React, { FC, memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScheduleCalendar } from './ScheduleCalendar';

import styles from './styles';

interface IScheduleMonthScreen { }



export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  return <ScheduleCalendar startingDayOfWeek={0} />;
});
