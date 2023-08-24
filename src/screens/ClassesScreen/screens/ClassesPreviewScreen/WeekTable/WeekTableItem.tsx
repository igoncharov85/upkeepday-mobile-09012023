import React, { FC, memo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cancel from '../../../../../../assets/svg/Cancel';

import { NavigationEnum } from '../../../../../common/constants/navigation';
import { IGeneratedScheduleEntries } from '../../../../../common/types/schedule.types';
import { useTypedNavigation } from '../../../../../hook/useTypedNavigation';
import { addDayAndHoursToDate } from '../../../../../services/utils/generateDate.util';
import { findLessonOnCurrentHour } from '../../../../DatePreviewScreen/WeekTable/WeekTableItem';
import BusyField from '../../../components/BusyField';
import styles from './styles';
import { useAppSelector } from '../../../../../store/hooks';
import { convertSessionsToLocalTime } from '../../../../../services/utils/convertToUTC';
import moment from 'moment';

function getSessionOnHour(
  entries: IGeneratedScheduleEntries[],
  time: Date,
): any[] {
  return convertSessionsToLocalTime(entries).filter((lesson) => moment(lesson.StartDateTime).format('YYYY-MM-DDTHH') === moment(time).format('YYYY-MM-DDTHH'));
}
interface IWeekTableItem {
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  currentDate: Date;
  timeIndex: number;
  classId: number;
}

const CELL_SIZE = {
  width: 48,
  height: 64,
};
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    onLongPress,
    editMode,

    timeIndex,
    currentDate,
    classId,
  }) => {

    const { classesSchedule } = useAppSelector(state => state.classes);

    const lessonOnThisHour = getSessionOnHour(classesSchedule.Sessions, currentDate)
    const dryFieldOnThisHour = getSessionOnHour(classesSchedule.OtherSessions, currentDate)

    const onHandleLongPress = (active: boolean) => {
      onLongPress(active);
    };


    return (
      <TouchableOpacity
        onLongPress={() => onHandleLongPress(true)}
        activeOpacity={1}>
        <View style={styles.wrapperCell}>
          <View style={styles.containerCell}>
            {lessonOnThisHour.map((lesson, index) => {
              return (
                <LessonItem
                  classId={classId}
                  key={`${index}-${lesson.Duration}-${lesson.StartDateTime}`}
                  editMode={editMode}
                  lesson={lesson}
                  onHandleLongPress={onHandleLongPress}
                />
              );
            })}
            {dryFieldOnThisHour &&
              dryFieldOnThisHour.map(dryFieldItem => (
                <BusyField
                  start={Number(
                    dryFieldItem.StartDateTime.split('T')[1].split(':')[1],
                  )}
                  duration={dryFieldItem.Duration}
                />
              ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const LessonItem = memo(
  ({
    lesson,
    editMode,
    onHandleLongPress,
    classId,
  }: {
    lesson: any;
    editMode: boolean;
    onHandleLongPress: any;
    classId: number;
  }) => {
    const colorsLesson = ['#EAAFC8', '#654EA3'];
    const { navigate } = useTypedNavigation();
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const completeAction = () => {
      onHandleLongPress(false);
    };

    const onDeleteSlot = () => {
      navigate(NavigationEnum.PREVIEW_MODAL, {
        classId,
        SessionId: lesson?.SessionId,
        completeAction,
        deleteItem: false,
      });
    };
    const panResponders = PanResponder.create({
      onStartShouldSetPanResponder: () => editMode,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        const gridCellX = Math.floor(
          (gestureState.dx + CELL_SIZE.width / 2) / CELL_SIZE.width,
        ),
          gridCellY = Math.floor(
            (gestureState.dy + CELL_SIZE.height / 2) / CELL_SIZE.height,
          ),
          moveCoords = {
            x: (CELL_SIZE.width / 2) * gridCellX,
            y: (CELL_SIZE.height / 2) * gridCellY,
          };
        pan.setOffset(moveCoords);
        pan.setValue(moveCoords);
        let newTime = new Date(
          addDayAndHoursToDate(lesson.StartDateTime, gridCellX, gridCellY),
        );

        navigate(NavigationEnum.PREVIEW_MODAL, {
          classId,
          SessionId: lesson?.SessionId,
          newTime,
          completeAction,
          deleteItem: true,
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
            height: '100%',
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
                height: `${(lesson.Duration / 60) * 100}%`,
              },
            ]}>
            {editMode && (
              <TouchableOpacity style={styles.cansel} onPress={() => {
                console.log(lessonMinuteStart, 'lessonMinuteStart');

                // onDeleteSlot
              }
              }>
                <Cancel />
              </TouchableOpacity>
            )}
            <Text style={[styles.textItem]}>{lesson.ClassName}</Text>
          </LinearGradient>
        </>
      </Animated.View>
    );
  }
);
