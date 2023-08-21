import moment from 'moment';
import React, { FC, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cancel from '../../../../assets/svg/Cancel';
import { NavigationEnum } from '../../../common/constants/navigation';
import { IGeneratedScheduleEntries } from '../../../common/types/schedule.types';
import { useTypedNavigation } from '../../../hook/useTypedNavigation';
import { addDayAndHoursToDate } from '../../../services/utils/generateDate.util';
import { useAppSelector } from '../../../store/hooks';
import BusyField from '../../ClassesScreen/components/BusyField';
import styles from './styles';

function findActivitiesByDay(
  activities: IGeneratedScheduleEntries[],
  date: Date,
) {
  const activitiesByDay = activities.filter(
    (activity: IGeneratedScheduleEntries) => {
      const startDateTime = new Date(activity.StartDateTime);
      return (
        startDateTime.getDate() === date.getDate() &&
        startDateTime.getMonth() === date.getMonth()
      );
    },
  );

  return activitiesByDay;
}

export function findLessonOnCurrentHour(
  lessonsOnDay: any[],
  currentHour: number,
  currentDay: Date,
) {
  return findActivitiesByDay(lessonsOnDay, currentDay).filter(lesson => {
    return +lesson.StartDateTime.split('T')[1].split(':')[0] == currentHour;
  });
}

interface IWeekTableItem {
  StartDateTime: string;
  timeIndex: number;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  onMoveSlot: (slot: IGeneratedScheduleEntries, newStartTime: string) => void;
  conflict: IGeneratedScheduleEntries[];
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
  dryField: IGeneratedScheduleEntries[];
  currentDay: Date;
  slots: IGeneratedScheduleEntries[];
}

const CELL_SIZE = {
  width: 48,
  height: 64,
};

export const WeekTableItem: FC<IWeekTableItem> = ({
  onLongPress,
  editMode,
  conflict,
  onMoveSlot,
  onDeleteSlot,
  dryField,
  currentDay,
  slots,
  timeIndex,
}) => {
  const lessonOnThisTime: IGeneratedScheduleEntries[] = findLessonOnCurrentHour(
    slots,
    timeIndex,
    currentDay,
  );
  const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
  const onHandleLongPress = (active: boolean) => {
    onLongPress(active);
  };

  const deleteSlot = (item: any) => {
    onDeleteSlot(item);
    onLongPress(false);
  };

  return (
    <TouchableOpacity
      onLongPress={() => onHandleLongPress(true)}
      onPress={() => console.log('conflict', dryField)}
      activeOpacity={1}>
      <View style={styles.wrapperCell}>
        <View style={styles.containerCell}>
          {lessonOnThisTime.map((lesson, index) => {
            return (
              //remove TouchableOpacity to display cells correctly, added for testing purposes
              // <TouchableOpacity onPress={() => console.log('touch lesson', lesson)}>
              <LessonItem
                name={createCurrentClassRequest.Class?.Name || ''}
                key={`${lesson.StartDateTime} ${index}`}
                lesson={lesson}
                onMoveSlot={onMoveSlot}
                editMode={editMode}
                deleteSlot={deleteSlot}
                onHandleLongPress={onHandleLongPress}
              />
              // </TouchableOpacity>
            );
          })}
          {/* Must doing */}
          {dryField &&
            dryField.map(
              dryFieldItem => (
                // <TouchableOpacity onPress={() => console.log(dryField)} style={{
                //   height: '100%', width: '100%'
                // }}>
                <BusyField
                  start={Number(
                    dryFieldItem.StartDateTime.split('T')[1].split(':')[1],
                  )}
                  duration={dryFieldItem.Duration}
                />
              ),
              // </TouchableOpacity>
            )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LessonItem = ({
  lesson,
  onMoveSlot,
  editMode,
  deleteSlot,
  onHandleLongPress,
  name,
}: {
  lesson: any;
  onMoveSlot: any;
  editMode: boolean;
  deleteSlot: any;
  onHandleLongPress: any;
  name: string;
}) => {
  const colorsLesson = ['#EAAFC8', '#654EA3'];

  const { navigate } = useTypedNavigation();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => editMode,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      const gridCellX = Math.floor(
        (gestureState.dx + CELL_SIZE.width / 2) / CELL_SIZE.width,
      );
      const gridCellY = Math.floor(
        (gestureState.dy + CELL_SIZE.height / 2) / CELL_SIZE.height,
      );
      const moveCoords = {
        x: (CELL_SIZE.width / 2) * gridCellX,
        y: (CELL_SIZE.height / 2) * gridCellY,
      };

      pan.setOffset(moveCoords);
      pan.setValue(moveCoords);
      let newTime = new Date(
        addDayAndHoursToDate(lesson.StartDateTime, gridCellX, gridCellY),
      );
      const addDuration = (time: any) => {
        newTime.setMinutes(time.minute);
        newTime.setHours(time.dayPart == 'AM' ? time.hour : time.hour + 12);
        onMoveSlot(lesson, moment(newTime).format('YYYY-MM-DDTHH:mm:ss'));
        onHandleLongPress(false);
      };
      navigate(NavigationEnum.EDIT_TIME_CLASS_MODAL, {
        addDuration,
        newTime,
        lesson,
      });

      pan.setOffset({
        x: 0,
        y: 0,
      });
      pan.setValue({
        x: 0,
        y: 0,
      });
    },
  });

  const lessonMinuteStart = Number(
    lesson.StartDateTime.split('T')[1].split(':')[1],
  );
  return (
    <Animated.View
      {...panResponders.panHandlers}
      style={[
        pan.getLayout(),
        {
          height: `100%`,
          width: '100%',
          top: pan.y,
        },
      ]}>
      <>
        <LinearGradient
          colors={colorsLesson}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            styles.wrapperItem,
            {
              top: `${(lessonMinuteStart / 60) * 100}%`,
              height: `${(lesson.Duration / 60) * 100}%`
            },
          ]}>
          {editMode && (
            <TouchableOpacity
              style={styles.cansel}
              onPress={() => {
                deleteSlot(lesson);
              }}>
              <Cancel />
            </TouchableOpacity>
          )}
          <Text style={[styles.textItem]}>{name}</Text>
        </LinearGradient>
      </>
    </Animated.View>
  );
};
