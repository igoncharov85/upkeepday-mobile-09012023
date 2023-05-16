import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IGeneratedScheduleEntries, IWeekTimeSlot } from '../../../common/types/schedule.types';
import Cancel from '../../../../assets/svg/Cancel';
import { useAppSelector } from '../../../store/hooks';
import { addDayAndHoursToDate } from '../../../services/utils/generateDate.util';


enum TypeSession {
  lesson,
  trial,
}
enum TimeDuration {
  HalfHour = 30,
  ThreeQuarterHour = 45,
  OneHour = 60,
  OneAndAHalfHours = 90,
}
interface IWeekTableItem {
  StartDateTime: string;
  timeIndex: number;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  activeItem: IGeneratedScheduleEntries;
  onMoveSlot: (slot: IGeneratedScheduleEntries) => void;
  conflict: boolean;
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
}

export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    StartDateTime,
    onLongPress,
    activeItem,
    editMode,
    conflict,
    onMoveSlot,
    onDeleteSlot,
    dayIndex,
    timeIndex,
    startOfWeek

  }) => {

    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
    const [active, setActive] = useState(!!activeItem)
    const [isMoving, setIsMoving] = useState(false);
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];

    const onHandleSlot = () => {
      console.log(!!activeItem, '!!activeItem');

      if (active && !!activeItem) {
        onDeleteSlot(activeItem)
        setActive(false)
        console.log('delete');

      } else {
        onMoveSlot({ SlotUid: '', StartDateTime: addDayAndHoursToDate(startOfWeek.toISOString(), dayIndex, timeIndex), Duration: TimeDuration.OneHour })
        setActive(true)
      }
    }

    const deleteSlot = () => {
      onDeleteSlot(activeItem)
      onLongPress(false)
    }

    return (
      <TouchableOpacity onLongPress={() => onLongPress(true)} onPress={() => editMode && onHandleSlot()} activeOpacity={editMode ? 0.5 : 1} >
        <View style={styles.containerItem}>
          {activeItem ? (
            <View
              style={{
                borderRadius: 4,
                flex: 1,
                position: 'relative',
              }}>
              <LinearGradient
                colors={colorsLesson}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                  zIndex: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  borderRadius: 4,
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `100%`,
                }}>
                {editMode && (<TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={deleteSlot}>
                  <Cancel />
                </TouchableOpacity>)}
                <Text style={[styles.textItem, conflict && { color: 'red' }]}>{createCurrentClassRequest.Class?.Name}</Text>
              </LinearGradient>
            </View>
          ) : null}
        </View>
      </TouchableOpacity >
    );

  },
);
