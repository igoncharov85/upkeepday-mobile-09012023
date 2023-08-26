import { useIsFocused } from '@react-navigation/native';
import React, { FC, memo, useEffect, useState } from 'react';
import { View } from 'react-native';

import {
  fetchCountriesAction,
  fetchStatesAction,
} from '../../store/auth/actions';
import { fetchLocationAction } from '../../store/location/actions';
import { dispatch } from '../../store/store';
import { fetchUsersAction } from '../../store/user/actions';
import { ScheduleNavigation } from './components/SheduleNavigation';

import styles from './styles';

export const ScheduleScreen: FC = memo(() => {
  const [key, setKey] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    setKey(key);
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchLocationAction());
    dispatch(fetchStatesAction('USA'));
    dispatch(fetchCountriesAction());
  }, []);
  return (
    <View style={styles.container}>
      <ScheduleNavigation />
    </View>
  );
});
