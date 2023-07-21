import React, { FC, memo, useRef, useState } from 'react';
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

interface IWeekTableItem {
  StartDateTime: string;
  timeIndex: number;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  activeItem?: IGeneratedScheduleEntries;
  onMoveSlot: (slot: IGeneratedScheduleEntries, x: number, y: number, newStartTime: string) => void;
  conflict: boolean;
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
  dryField: IGeneratedScheduleEntries;
  lessonOnThisTime: Array<IGeneratedScheduleEntries>;
  currentDay: Date;
}

const CELL_SIZE = {
  width: 48,
  height: 64,
};
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    onLongPress,
    editMode,
    conflict,
    onMoveSlot,
    onDeleteSlot,
    dryField,
    lessonOnThisTime,
    currentDay

  }) => {
    const navigation = useNavigation();
    const [canMove, setCanMove] = useState(false);
    const { createCurrentClassRequest, loading } = useAppSelector(state => state.schedule);
    const colorsLesson = ['#EAAFC8', '#654EA3'];


    const onHandleLongPress = (active: boolean) => {
      setCanMove(true);
      console.log('canMove:', canMove)
      onLongPress(active)
    }

    const deleteSlot = () => {
      // onDeleteSlot(activeItem)
      console.log('run in delete press')
      setCanMove(false);
      onLongPress(false)
    }

    const pan = lessonOnThisTime.map(() => useRef(new Animated.ValueXY()).current);

    // const pan = useRef(Array(lessonOnThisTime.length).map(() => new Animated.ValueXY())).current;
    const panResponders = lessonOnThisTime.map((_, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => canMove,
        onPanResponderMove: Animated.event(
          [null, { dx: pan[index]?.x, dy: pan[index]?.y }],
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
          lessonOnThisTime[index] && pan[index]?.setOffset(moveCoords);
          lessonOnThisTime[index] && pan[index]?.setValue(moveCoords);
          const newTime = addDayAndHoursToDate(lessonOnThisTime[index].StartDateTime, gridCellX, gridCellY);
          const addDuration = (time: string) => {
            setCanMove(false)
            console.log('canMove:', canMove)
            onHandleLongPress(false);
            console.log(newTime)
            // onMoveSlot(lessonOnThisTime[index], , , '2023-07-20T10:30:00')
          }

          //@ts-ignore
          navigation.navigate(NavigationEnum.EDIT_TIME_CLASS_MODAL, {
            addDuration,
            newTime
          })

          pan[index]?.setOffset({
            x: 0,
            y: 0,
          });
          pan[index]?.setValue({
            x: 0,
            y: 0,
          });
        },
      })
    );





    return loading ? null : (
      <TouchableOpacity
        onLongPress={() => onHandleLongPress(true)}

        activeOpacity={editMode ? 0.5 : 1}
      >
        <View style={styles.containerItem}>
          <View style={{
            borderRadius: 4,
            flex: 1,
            position: 'relative',
          }}>
            {lessonOnThisTime.map((lesson, index) => {
              const lessonMinuteStart = Number(lesson.StartDateTime.split('T')[1].split(':')[1])
              return (
                <Animated.View
                  {...panResponders[index].panHandlers}

                  style={
                    [pan[index]?.getLayout(), {
                      height: `${lesson.Duration / 60 * 100}%`,
                      width: '100%'

                    }]
                  }>

                  <>

                    <LinearGradient
                      colors={colorsLesson}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={[styles.wrapperItem,
                      {
                        top: `${lessonMinuteStart / 60 * 100}%`,
                        height: `100%`,
                      }
                      ]}>
                      {editMode && (
                        <TouchableOpacity style={styles.cansel} onPress={deleteSlot}>
                          <Cancel />
                        </TouchableOpacity>)}
                      <Text style={[styles.textItem,
                      conflict && { color: 'red' }
                      ]
                      }>{createCurrentClassRequest?.Class?.Name}</Text>

                    </LinearGradient>
                  </>
                </Animated.View>
              )
            })}
            {dryField && <BusyField />}
          </View>
        </View>

      </TouchableOpacity >
    );

  },
);
