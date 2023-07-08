import React, { FC, memo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import Cancel from '../../../../assets/svg/Cancel';
import { useAppSelector } from '../../../store/hooks';
import BusyField from '../../ClassesScreen/components/BusyField';
import { IGeneratedScheduleEntries } from '../../../common/types/schedule.types';

interface IWeekTableItem {
  StartDateTime: string;
  timeIndex: number;
  onLongPress: (value: boolean) => void;
  editMode: boolean;
  activeItem: IGeneratedScheduleEntries;
  onMoveSlot: (slot: IGeneratedScheduleEntries, x: number, y: number) => void;
  conflict: boolean;
  onDeleteSlot: (slot: IGeneratedScheduleEntries) => void;
  dayIndex: number;
  startOfWeek: Date;
  dryField: IGeneratedScheduleEntries;
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

  }) => {
    const [canMove, setCanMove] = useState(false);
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
    const colorsLesson = ['#EAAFC8', '#654EA3'];


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
        activeItem && pan.setOffset(moveCoords);
        activeItem && pan.setValue(moveCoords);
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
        onPress={() => getInfo()}
        onLongPress={() => onHandleLongPress(true)}

        activeOpacity={editMode ? 0.5 : 1}
      >
        <View style={styles.containerItem}>

          {activeItem ? (
            <Animated.View
              {...panResponder.panHandlers}

              style={
                [pan.getLayout(), {
                  borderRadius: 4,
                  flex: 1,
                  position: 'relative',
                }]
              }>

              <LinearGradient
                colors={colorsLesson}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.wrapperItem}>
                {editMode && (<TouchableOpacity style={styles.cansel} onPress={deleteSlot}>
                  <Cancel />
                </TouchableOpacity>)}
                <Text style={[styles.textItem,
                conflict && { color: 'red' }
                ]
                }>{createCurrentClassRequest.Class?.Name}</Text>
              </LinearGradient>

            </Animated.View>
          ) : null}
          {dryField && activeItem?.StartDateTime !== dryField?.StartDateTime && <BusyField />}
        </View>

      </TouchableOpacity >
    );

  },
);
