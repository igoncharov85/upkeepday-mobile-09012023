import React, { FC, memo, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import ArrowLeft from '../../../../assets/svg/schedule/ArrowLeft';
import ArrowRight from '../../../../assets/svg/schedule/ArrowRight';
import moment from 'moment';
import styles from './styles';

interface IDayScroller {
  title: string;
  onPressLeft: () => void;
  onPressRight: () => void;
}
export const DayScroller: FC<IDayScroller> = memo(
  ({ title, onPressLeft, onPressRight }) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressLeft} style={{ padding: 4 }}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onPressRight} style={{ padding: 4 }}>
            <ArrowRight />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
