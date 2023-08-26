import React, { FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { IScheduleItem } from '../../../../common/types/schedule.types';
import { useTypedNavigation } from '../../../../hook/useTypedNavigation';
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
  data: IScheduleItem;
}

export const SessionItem: FC<SessionItemProps> = memo(
  ({ name, timeContinued, timeStart, type, data, id }) => {
    const { navigate } = useTypedNavigation();
    const isTrialLesson = type === LessonType.Trial;
    const navigateToCancellationModal = () => {
      navigate(NavigationEnum.CANCELLATION_MODAL, { item: data });
    };
    const navigationClassInfo = () => {
      navigate(NavigationEnum.CLASSES_TAB);
    }
    return (
      <TouchableOpacity
        onPress={navigationClassInfo}
        onLongPress={navigateToCancellationModal}
        style={styles.container}>
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
      </TouchableOpacity>
    );
  },
);
