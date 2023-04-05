import React, { FC, memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import { INavigationBase } from '../../common/types/component.styles';
import { CustomButton } from '../../components/UI/CustomButton';
import NavigationActions from '../../services/navigation-service';
import { logoutAction } from '../../store/auth/actions';
import { dispatch } from '../../store/store';
import { ScheduleDayScreen } from './SheduleDayScreen';
import styles from './styles';
import { SheduleHeader } from './components/SheduleHeader';
import { ScheduleNavigation } from './components/SheduleNavigation';
import { BottomTab } from '../../components/BottomTab';
import { SchedulePlus } from './components/SchedulePlus';
import { SheduleWeekScreen } from './SheduleWeekScreen';
import { ScheduleMonthScreen } from './ScheduleMonthScreen';
import { CancellationScreen } from '../CancellationScreen';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';

interface IHomeScreen extends INavigationBase { }
export const ScheduleScreen: FC<IHomeScreen> = memo(() => {
  const navigation = useNavigation();
  const onPlusPress = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.ADD_CLASS_SCREEN)
  }

  return (
    <View style={styles.container}>
      <SheduleHeader text="Schedule" />
      <ScheduleNavigation />

      <BottomTab />
      <SchedulePlus onButtonPress={onPlusPress} />
    </View>
  );
});

export const dataOfMonth = [
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 60,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 60,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T10:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-20T10:00:00.866Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-20T14:30:00.000Z',
      Duration: 45,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-21T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-21T9:15:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: ' Class 1',
    },
    {
      StartDateTime: '2023-03-21T12:45:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-21T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-22T15:30:00.000Z',
      Duration: 30,
      type: 'trial',
      className: 'Trial with Anna',
    },
  ],
  [
    {
      StartDateTime: '2023-03-23T10:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-23T14:00:00.866Z',
      Duration: 90,
      type: 'Trial',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-23T16:00:00.866Z',
      Duration: 60,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
  [
    {
      StartDateTime: '2023-03-24T06:00:00.866Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T08:30:00.000Z',
      Duration: 60,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T10:15:00.000Z',
      Duration: 90,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T13:45:00.000Z',
      Duration: 120,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T16:20:00.000Z',
      Duration: 30,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
    {
      StartDateTime: '2023-03-24T18:00:00.000Z',
      Duration: 75,
      type: 'trial',
      className: 'Trial with Anna Asol',
    },
    {
      StartDateTime: '2023-03-24T20:35:00.000Z',
      Duration: 45,
      type: 'lesson',
      className: 'Lesson Dance Class 1',
    },
  ],
];
