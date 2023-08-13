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
  dryField: IGeneratedScheduleEntries;

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
    const [canMove, setCanMove] = useState(false);
    const { currentSession } = useAppSelector(state => state.classes);
    const colorsLesson = ['#EAAFC8', '#654EA3'];

    const lessonOnThisTime: IGeneratedScheduleEntries[] = findLessonOnCurrentHour(slots, timeIndex, currentDate)

    const onHandleLongPress = (active: boolean) => {
      setCanMove(active);
      onLongPress(active)
    }

    const deleteSlot = () => {
      onDeleteSlot(activeItem)
      onLongPress(false)
    }
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => canMove,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y, },], { useNativeDriver: false }),
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
        onMoveSlot(activeItem, gridCellX, gridCellY,)

        onHandleLongPress(false);
      },
    });


    const getInfo = () => {
      console.log(
        'activeItem',
        activeItem,
        'dryField',
        dryField,
      );

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
                <LessonItem conflict={conflict} lesson={lesson} onMoveSlot={onMoveSlot} canMove={canMove} editMode={editMode} deleteSlot={deleteSlot} onHandleLongPress={onHandleLongPress} />)
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
      </TouchableOpacity>
    );

  },
);



const LessonItem = ({ lesson, conflict, onMoveSlot, canMove, editMode, deleteSlot, onHandleLongPress }: { lesson: any, onMoveSlot: any, canMove: boolean, editMode: boolean,conflict: any, deleteSlot: any, onHandleLongPress: any }) => {
  
  console.log(conflict, 'ads');
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
        newTime,
        conflict,
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