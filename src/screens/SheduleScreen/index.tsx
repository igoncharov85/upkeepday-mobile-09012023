import React, { FC, memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { INavigationBase } from '../../common/types/component.styles';
import NavigationActions from '../../services/navigation-service';

import {
  fetchCountriesAction,
  fetchStatesAction,
} from '../../store/auth/actions';
import { dispatch } from '../../store/store';
import { fetchUsersAction } from '../../store/user/actions';
import { fetchLocationAction } from '../../store/location/actions';
import { SheduleHeader } from './components/SheduleHeader';
import { ScheduleNavigation } from './components/SheduleNavigation';
import { BottomTab } from '../../components/BottomTab';
import { SchedulePlus } from './components/SchedulePlus';
import { NavigationEnum } from '../../common/constants/navigation';

import styles from './styles';
import { useRoute } from '@react-navigation/native';

interface IHomeScreen extends INavigationBase { }
export const ScheduleScreen: FC<IHomeScreen> = memo(({ navigation }) => {
  const route = useRoute();
  const onPlusPress = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.ADD_CLASS_SCREEN);
  };
  const key = route.params;
  useEffect(() => {
    console.log('key', key);
  }, [key]);
  useEffect(() => {
    NavigationActions.setNavigator(navigation);
  }, []);

  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchLocationAction());
    dispatch(fetchStatesAction('USA'));
    dispatch(fetchCountriesAction());
  }, []);
  return (
    <View style={styles.container}>
      <SheduleHeader text="Schedule" />
      <ScheduleNavigation />

      <BottomTab />
      <SchedulePlus onButtonPress={onPlusPress} />
    </View >
  );
});

