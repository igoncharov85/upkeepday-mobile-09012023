import React, {FC, memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CancellationModal} from '../../components/CancellationModal';
import styles from './styles';
enum LessonType {
  Lesson,
  Trial,
}

interface SessionItemProps {
  id: string;
  name: string;
  timeStart: string;
  timeContinued: string;
  type: LessonType;
}

export const SessionItem: FC<SessionItemProps> = memo(
  ({name, timeContinued, timeStart, type}) => {
    const isTrialLesson = type === LessonType.Trial;

    return (
      <CancellationModal>
        <View style={styles.container}>
          <Text style={styles.timeStart}>{timeStart}</Text>
          <View
            style={[
              styles.item,
              isTrialLesson ? styles.itemTrial : styles.itemLesson,
            ]}>
            <View
              style={[
                styles.decorItemLine,
                isTrialLesson
                  ? styles.decorItemLineTrial
                  : styles.decorItemLineLesson,
              ]}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.time}>{timeContinued}</Text>
            </View>
          </View>
        </View>
      </CancellationModal>
    );
  },
);
