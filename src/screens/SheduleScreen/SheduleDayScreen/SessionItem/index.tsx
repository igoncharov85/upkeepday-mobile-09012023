import React, { FC, memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CancellationModal } from '../../components/CancellationModal';
import styles from './styles';
import { IScheduleItem } from '../../../../common/types/schedule.types';
import { id } from 'date-fns/locale';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../../common/constants/navigation';
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
  data: IScheduleItem
}

export const SessionItem: FC<SessionItemProps> = memo(
  ({ name, timeContinued, timeStart, type, data, id }) => {
    const navigation = useNavigation()
    const isTrialLesson = type === LessonType.Trial;
    const navigateToCancellationModal = () => {
      //@ts-ignore
      navigation.navigate(NavigationEnum.CANCELLATION_MODAL, { item: data })
    }
    return (
      <TouchableOpacity onLongPress={navigateToCancellationModal} style={styles.container}>
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
