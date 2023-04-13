import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IGeneratedScheduleEntries, IWeekTimeSlot } from '../../../common/types/schedule.types';
import Cancel from '../../../../assets/svg/Cancel';


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
  onLongPress: () => void;
  editMode: boolean;
  activeItem?: IGeneratedScheduleEntries;
  editSlot: (slot: IGeneratedScheduleEntries) => void;
  conflict?: boolean
}
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    StartDateTime,
    onLongPress,
    activeItem,
    editMode,
    editSlot,
    conflict

  }) => {
    const [active, setActive] = useState(!!activeItem ? true : false)
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];

    const onHandleSlot = () => {
      console.log(StartDateTime);

      setActive(!active)
      editSlot(activeItem || { WeekTimeSlotId: '', StartDateTime: StartDateTime, Duration: TimeDuration.OneHour })
    }
    const getColors = (typeSession: TypeSession) => {
      switch (typeSession) {
        case TypeSession.lesson:
          return colorsLesson;
        case TypeSession.trial:
          return colorsTrial;
      }
    };
    return (
      // <TouchableOpacity onLongPress={onLongPress} onPress={() => console.log(StartDateTime)} activeOpacity={editMode ? 0.5 : 1}>
      <TouchableOpacity onLongPress={onLongPress} onPress={() => editMode && onHandleSlot()} activeOpacity={editMode ? 0.5 : 1}>
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
                {editMode && (<View style={{ position: 'absolute', top: -5, right: -5 }}>
                  <Cancel />
                </View>)}
                <Text style={[styles.textItem, conflict && { color: 'red' }]}>Class</Text>
              </LinearGradient>
            </View>
          ) : null}
        </View>
      </TouchableOpacity >
    );

  },
);
