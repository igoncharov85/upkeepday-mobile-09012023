import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { useAppSelector } from '../../../../../store/hooks';
import BusyField from '../../../../ClassesScreen/components/BusyField';
import { IGeneratedScheduleEntries } from '../../../../../common/types/schedule.types';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../../../common/constants/navigation';
import { addDayAndHoursToDate } from '../../../../../services/utils/generateDate.util';
import moment from 'moment';
import Cancel from '../../../../../../assets/svg/Cancel';




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
  slots: () => any
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
    const [canMove, setCanMove] = useState(false);
    const lessonOnThisTime: IGeneratedScheduleEntries[] = findLessonOnCurrentHour(slots(), timeIndex, currentDay)

    const onHandleLongPress = (active: boolean) => {
      setCanMove(active);
      onLongPress(active)
    }

    const deleteSlot = (item: any) => {
      onDeleteSlot(item)
      setCanMove(false);
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
                <LessonItem lesson={lesson} onMoveSlot={onMoveSlot} canMove={canMove} editMode={editMode} deleteSlot={deleteSlot} onHandleLongPress={onHandleLongPress} />)
            })}
            {dryField &&
              <TouchableOpacity onPress={() => console.log(dryField)} style={{
                height: '100%', width: '100%'
              }}>
                <BusyField
                  // start={Number(dryField.StartDateTime.split('T')[1].split(':')[1])}
                  start={Number(dryField.StartDateTime.split('T')[1].split(':')[1])}
                  duration={dryField.Duration} />
              </TouchableOpacity>

            }
          </View>
        </View>

      </TouchableOpacity >
    );

  };


const LessonItem = ({ lesson, onMoveSlot, canMove, editMode, deleteSlot, onHandleLongPress }: { lesson: any, onMoveSlot: any, canMove: boolean, editMode: boolean, deleteSlot: any, onHandleLongPress: any }) => {
  const colorsLesson = ['#EAAFC8', '#654EA3'];

  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => canMove,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gestureState) => {
      const
        gridCellX = Math.floor((gestureState.dx + CELL_SIZE.width / 2) / CELL_SIZE.width),
        gridCellY = Math.floor((gestureState.dy + CELL_SIZE.height / 2) / CELL_SIZE.height),
        moveCoords = {
          x: (CELL_SIZE.width / 2) * gridCellX,
          y: (CELL_SIZE.height / 2) * gridCellY,
        };
      pan.setOffset(moveCoords);
      pan.setValue(moveCoords);
      let newTime = new Date(addDayAndHoursToDate(lesson.StartDateTime, gridCellX, gridCellY));
      const addDuration = (time: any) => {

        newTime.setMinutes(time.minute)
        console.log('newTime', newTime)
        newTime.setHours(time.dayPart == "AM" ? time.hour : time.hour + 12)
        onHandleLongPress(false)
        onMoveSlot(lesson, moment(newTime).format('YYYY-MM-DDTHH:mm:ss'))
      }

      //@ts-ignore
      navigation.navigate(NavigationEnum.EDIT_TIME_CLASS_MODAL, {
        addDuration,
        newTime
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
            top: `${lessonMinuteStart / 60 * 100}%`
          }
        ]
      }>
      <>
        <LinearGradient
          colors={colorsLesson}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.wrapperItem,
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
