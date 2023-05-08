import React, { FC, memo, useEffect, useState } from 'react';
import { PanResponder, Text, View } from 'react-native';
import { INavigationBase } from '../../common/types/component.styles';
import NavigationActions from '../../services/navigation-service';

import {
  fetchCountriesAction,
  fetchStatesAction,
  logoutAction,
} from '../../store/auth/actions';
import {
  addLocationAction,
  fetchLocationAction,
} from '../../store/location/actions';
import {
  createScheduleAction,
  generateScheduleAction,
} from '../../store/shedule/actions';
import { dispatch } from '../../store/store';
import { fetchUsersAction } from '../../store/user/actions';
import { SheduleHeader } from './components/SheduleHeader';
import { ScheduleNavigation } from './components/SheduleNavigation';
import { BottomTab } from '../../components/BottomTab';
import { SchedulePlus } from './components/SchedulePlus';
import { NavigationEnum } from '../../common/constants/navigation';

import styles from './styles';

interface IHomeScreen extends INavigationBase { }
export const ScheduleScreen: FC<IHomeScreen> = memo(({ navigation }) => {
  const [swipeUpCount, setSwipeUpCount] = useState(0);
  const [swipeDownCount, setSwipeDownCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const onPlusPress = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.ADD_CLASS_SCREEN);
  };
  useEffect(() => {
    NavigationActions.setNavigator(navigation);
  }, []);

  const handleSwipeLeft = () => {
    setActivePage(activePage != 0 ? activePage - 1 : activePage);
  };

  const handleSwipeRight = () => {
    setActivePage(activePage != 2 ? activePage + 1 : activePage);
  };
  console.log(activePage, 'activePage');

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return true;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        setSwipeUpCount(swipeUpCount + 1);
        handleSwipeRight();
      } else if (gestureState.dx > 50) {
        setSwipeDownCount(swipeDownCount + 1);
        handleSwipeLeft();
      }
    },
  });

  useEffect(() => {
    console.log('worked');
    dispatch(fetchUsersAction());
    dispatch(fetchStatesAction('USA'));
    dispatch(fetchCountriesAction());
  }, []);
  return (
    // <View style={styles.container} {...panResponder.panHandlers}>
    <View style={styles.container}>
      <SheduleHeader text="Schedule" />
      <ScheduleNavigation activePage={activePage} />

      <BottomTab />
      <SchedulePlus onButtonPress={onPlusPress} />
    </View >
  );
});
