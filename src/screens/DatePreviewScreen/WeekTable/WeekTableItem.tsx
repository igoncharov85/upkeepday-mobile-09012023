import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Cancel from '../../../../assets/svg/Cancel';
import { useAppSelector } from '../../../store/hooks';
import BusyField from '../../ClassesScreen/components/BusyField';
import { IGeneratedScheduleEntries } from '../../../common/types/schedule.types';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';
import { addDayAndHoursToDate } from '../../../services/utils/generateDate.util';
import moment from 'moment';




function findActivitiesByDay(activities: IGeneratedScheduleEntries[], date: Date) {


  const activitiesByDay = activities.filter((activity: IGeneratedScheduleEntries) => {
    const startDateTime = new Date(activity.StartDateTime);
    return startDateTime.getDate() === date.getDate() && startDateTime.getMonth() === date.getMonth();
  });

  return activitiesByDay;
}


export function findLessonOnCurrentHour(lessonsOnDay: any[], currentHour: number, currentDay: Date) {
  return findActivitiesByDay(lessonsOnDay, currentDay).filter((lesson) => {
    return +lesson.StartDateTime.split('T')[1].split(':')[0] == currentHour
  })
}



interface IWeekTableItem {
  StartDateTime: string;
  timeIndex: number;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  onMoveSlot: (slot: IGeneratedScheduleEntries, newStartTime: string) => void;
  conflict: boolean;
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
  dryField: IGeneratedScheduleEntries;
  currentDay: Date;
  slots: IGeneratedScheduleEntries[]
}

const CELL_SIZE = {
  width: 48,
  height: 64,
};

export const WeekTableItem: FC<IWeekTableItem> =
  ({
    onLongPress,
    editMode,
    conflict,
    onMoveSlot,
    onDeleteSlot,
    dryField,
    currentDay,
    slots,
    timeIndex

  }) => {
    const lessonOnThisTime: IGeneratedScheduleEntries[] = findLessonOnCurrentHour(slots, timeIndex, currentDay)

    const onHandleLongPress = (active: boolean) => {

      onLongPress(active)
    }

    const deleteSlot = (item: any) => {
      onDeleteSlot(item)
      onLongPress(false)
    }

    return (
      <TouchableOpacity
        onLongPress={() => onHandleLongPress(true)}
        activeOpacity={1}
      >
        <View style={styles.containerItem}>
          <View style={{
            borderRadius: 4,
            flex: 1,
            position: 'relative',
          }}>
            {lessonOnThisTime.map((lesson, index) => {
              return (
                <LessonItem key={`${lesson.StartDateTime} ${index}`} lesson={lesson} onMoveSlot={onMoveSlot} editMode={editMode} deleteSlot={deleteSlot} onHandleLongPress={onHandleLongPress} />)
            })}
            {dryField &&
              <TouchableOpacity onPress={() => console.log(dryField)} style={{
                height: '100%', width: '100%'
              }}>
                <BusyField
                  start={Number(dryField.StartDateTime.split('T')[1].split(':')[1])}
                  duration={dryField.Duration} />
              </TouchableOpacity>

            }
          </View>
        </View>

      </TouchableOpacity >
    );

  };


const LessonItem = ({ lesson, onMoveSlot, editMode, deleteSlot, onHandleLongPress }: { lesson: any, onMoveSlot: any, editMode: boolean, deleteSlot: any, onHandleLongPress: any }) => {
  const colorsLesson = ['#EAAFC8', '#654EA3'];

  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => editMode,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      const gridCellX = Math.floor((gestureState.dx + CELL_SIZE.width / 2) / CELL_SIZE.width);
      const gridCellY = Math.floor((gestureState.dy + CELL_SIZE.height / 2) / CELL_SIZE.height);
      const moveCoords = {
        x: (CELL_SIZE.width / 2) * gridCellX,
        y: (CELL_SIZE.height / 2) * gridCellY,
      };

      // Update the pan Animated value to the final position
      pan.setOffset(moveCoords);
      pan.setValue(moveCoords);
      let newTime = new Date(addDayAndHoursToDate(lesson.StartDateTime, gridCellX, gridCellY));
      const addDuration = (time: any) => {
        newTime.setMinutes(time.minute)
        newTime.setHours(time.dayPart == "AM" ? time.hour : time.hour + 12)
        onHandleLongPress(false)
        onMoveSlot(lesson, moment(newTime).format('YYYY-MM-DDTHH:mm:ss'))
      }
      console.log(newTime, 'newTime')
      //@ts-ignore
      navigation.navigate(NavigationEnum.EDIT_TIME_CLASS_MODAL, {
        addDuration,
        newTime,
        lesson
      })

      pan.setOffset({
        x: 0,
        y: 0,
      });
      pan.setValue({
        x: 0,
        y: 0,
      });
    },
  })


  const lessonMinuteStart = Number(lesson.StartDateTime.split('T')[1].split(':')[1])
  return (
    <Animated.View
      {...panResponders.panHandlers}
      style={
        [
          pan.getLayout(), {
            height: `${lesson.Duration / 60 * 100}%`,
            width: '100%',
            top: pan.y,
          }
        ]
      }>
      <>
        <LinearGradient
          colors={colorsLesson}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.wrapperItem, { top: `${lessonMinuteStart / 60 * 100}%` }
          ]}>
          {editMode && (
            <TouchableOpacity style={styles.cansel} onPress={() => deleteSlot(lesson)}>
              <Cancel />
            </TouchableOpacity>)}
          <Text style={[styles.textItem,
          ]
          }>Class</Text>
        </LinearGradient>
      </>
    </Animated.View>
  )

}
