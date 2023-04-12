import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IWeekTimeSlot } from '../../../common/types/schedule.types';
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

  timeDuration?: TimeDuration;
  typeSession?: TypeSession | [TypeSession, TypeSession];
  dayOfWeek: number;
  timeIndex: number;
  onLongPress?: () => void;
  editMode: boolean;
  activeItem?: IWeekTimeSlot;
  editSlot: (slot: IWeekTimeSlot) => void;
}
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    timeDuration = TimeDuration.OneHour,
    typeSession = TypeSession.lesson,
    timeIndex,
    dayOfWeek,
    onLongPress,
    activeItem,
    editMode,
    editSlot

  }) => {
    const [active, setActive] = useState(!!activeItem ? true : false)
    const colorsTrial = ['#F3AF2C', '#E9600D'];
    const colorsLesson = ['#EAAFC8', '#654EA3'];
    const startDateTime = `${timeIndex}:00`

    const onHandleSlot = () => {


      setActive(!active)
      editSlot(activeItem || { DayOfWeek: dayOfWeek, StartTime: startDateTime as string, Duration: timeDuration })
      console.log('onHandleSlot');

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
      <TouchableOpacity onLongPress={onLongPress} onPress={() => editMode && onHandleSlot()} activeOpacity={editMode ? 0.5 : 1}>
        <View style={styles.containerItem}>
          {active ? (
            <View
              style={{
                borderRadius: 4,
                flex: 1,
                position: 'relative',
              }}>
              <LinearGradient
                colors={getColors(
                  Array.isArray(typeSession) ? typeSession[0] : typeSession,
                )}
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
                <Text style={styles.textItem}>Class</Text>
              </LinearGradient>
            </View>
          ) : null}
        </View>
      </TouchableOpacity >
    );

  },
);
