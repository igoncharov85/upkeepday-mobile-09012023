import React, { FC, memo, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ArrowLeft from '../../../../../assets/svg/schedule/ArrowLeft';
import ArrowRight from '../../../../../assets/svg/schedule/ArrowRight';

import styles from './styles';

interface IScheduleScroller {
  title: string;
  onPressLeft: () => void;
  onPressRight: () => void;
}
export const ScheduleScroller: FC<IScheduleScroller> = memo(
  ({ title, onPressLeft, onPressRight }) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressLeft}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onPressRight}>
            <ArrowRight />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
