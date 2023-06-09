import React, { FC, memo } from 'react';
import { ScheduleCalendar } from './ScheduleCalendar';


interface IScheduleMonthScreen { }



export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  return <ScheduleCalendar startingDayOfWeek={0} />;
});




