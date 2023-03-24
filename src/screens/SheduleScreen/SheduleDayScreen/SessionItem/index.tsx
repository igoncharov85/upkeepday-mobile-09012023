import React, {memo} from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

enum typeLesson {
  lesson,
  trial,
}

interface ISessionItem {
  id: string;
  name: string;
  timeStart: string;
  timeСontinued: string;
  type: typeLesson;
}

export const SessionItem: React.FC<ISessionItem> = memo(
  ({name, timeСontinued, timeStart, type}) => (
    <View style={styles.container}>
      <Text style={styles.timeStart}>{timeStart}</Text>
      <View
        style={[
          styles.item,
          type == typeLesson.trial ? styles.item_trial : styles.item_lesson,
        ]}>
        <View
          style={[
            styles.decorItemLine,
            type == typeLesson.trial
              ? styles.decorItemLine_trial
              : styles.decorItemLine_lesson,
          ]}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.time}>{timeСontinued}</Text>
        </View>
      </View>
    </View>
  ),
);
