import React, { FC, memo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IGeneratedScheduleEntries } from '../../../../../common/types/schedule.types';
import Cancel from '../../../../../../assets/svg/Cancel';
import { useAppSelector } from '../../../../../store/hooks';
import BusyField from '../../../components/BusyField';
import { addDayAndHoursToDate } from '../../../../../services/utils/generateDate.util';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { findLessonOnCurrentHour } from '../../../../DatePreviewScreen/WeekTable/WeekTableItem';

import { NavigationEnum } from '../../../../../common/constants/navigation';
import { dispatch } from '../../../../../store/store';
import { fetchClassesSchedule } from '../../../../../store/classes/actions';


interface IWeekTableItem {
  StartDateTime: string;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  activeItem: IGeneratedScheduleEntries;
  onMoveSlot: (slot: IGeneratedScheduleEntries, x: number, y: number) => void;
  conflict: boolean;
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
  dryField: IGeneratedScheduleEntries[];

  currentDate: Date;
  timeIndex: number;
  slots: IGeneratedScheduleEntries[];
}

const CELL_SIZE = {
  width: 48,
  height: 64,
};
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    onLongPress,
    activeItem,
    editMode,
    conflict,
    onMoveSlot,
    onDeleteSlot,
    dryField,

    timeIndex,
    slots,
    currentDate

  }) => {
    // const { currentSession, loading, classesSchedule } = useAppSelector(state => state.classes);
    const lessonOnThisTime: IGeneratedScheduleEntries[] = findLessonOnCurrentHour(slots, timeIndex, currentDate)

    const onHandleLongPress = (active: boolean) => {
      onLongPress(active)
    }


    const getInfo = () => {
      console.log(
        // 'activeItem',
        // activeItem,
        // 'dryField',
        // dryField,
        'lessonOnThisTime',
        lessonOnThisTime,
        slots
      );

    }

    return (
      <TouchableOpacity
        onPress={getInfo}
        onLongPress={() => onHandleLongPress(true)}
        activeOpacity={1}
      >
        <View style={styles.wrapperCell}>
          <View style={styles.containerCell}>
            {lessonOnThisTime.map((lesson, index) => {
              return (
                <LessonItem
                  key={`${index}-${lesson.Duration}-${lesson.StartDateTime}`}
                  editMode={editMode}
                  lesson={lesson}
                  onHandleLongPress={onHandleLongPress} />)
            })}
            {dryField &&
              dryField.map((dryFieldItem) =>
                <BusyField
                  start={Number(dryFieldItem.StartDateTime.split('T')[1].split(':')[1])}
                  duration={dryFieldItem.Duration} />
              )

            }
          </View>
        </View>
      </TouchableOpacity>
    );

  },
);



const LessonItem = ({ lesson, editMode, onHandleLongPress }: { lesson: any, editMode: boolean, onHandleLongPress: any }) => {

  const colorsLesson = ['#EAAFC8', '#654EA3'];
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const completeAction = () => {
    // dispatch(fetchClassesSchedule())
    console.log(lesson)
    onHandleLongPress(false)
  }
  const onDeleteSlot = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.PREVIEW_MODAL, {
      SessionId: lesson?.SessionId,
      completeAction,
      deleteItem: false
    })
  }
  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => editMode,
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


      //@ts-ignore
      navigation.navigate(NavigationEnum.PREVIEW_MODAL, {
        SessionId: lesson?.SessionId,
        newTime,
        completeAction,
        deleteItem: true
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
            top: pan.y
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
            <TouchableOpacity style={styles.cansel} onPress={onDeleteSlot}>
              <Cancel />
            </TouchableOpacity>)}
          <Text style={[styles.textItem,
          ]
          }>{lesson.ClassName}</Text>
        </LinearGradient>
      </>
    </Animated.View>
  )

}