import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';


import { WeekTableItem } from './WeekTableItem';
import styles from './styles';
import { addDayAndHoursToDate, createWeekStructure, generateTimeData, isToday } from '../../../services/utils/generateDate.util';

import { IGeneratedScheduleEntries, IWeekTimeSlot } from '../../../common/types/schedule.types';
import { useAppSelector } from '../../../store/hooks';
import { ColorEnum } from '../../../common/constants/styles/colors.enum';
import { dispatch } from '../../../store/store';
import { updateCurrentClassRequestAction } from '../../../store/shedule';
import { ScreenLoading } from '../../../components/UI/ScreenLoading';
import { boolean } from 'yup';





function findScheduleEntries(
  entries: IGeneratedScheduleEntries[],
  day: number,
  month: number,
  hour: number,
  year: number,
): any[] {
  const filteredEntries = entries?.filter((entry) => {
    const startDate = new Date(entry.StartDateTime);
    return (
      startDate.getDate() === day &&
      startDate.getMonth() + 1 === month &&
      startDate.getHours() === hour &&
      startDate.getFullYear() === year
    );
  });
  return filteredEntries;
}


interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  onHandleData: (data: IGeneratedScheduleEntries[]) => void;
  conflict: IGeneratedScheduleEntries[];
}


export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData, conflict }) => {
    const { GeneratedScheduleEntries, CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    const [editMode, setEditMode] = useState(false);
    const [slots, setSlots] = useState(GeneratedScheduleEntries);
    const scrollViewRef = useRef(null);
    const [scrollOffset, setScrollOffset] = useState(64 * 8);

    const handleScroll = (event) => {
      const offset = event.nativeEvent.contentOffset.y;
      // console.log(scrollViewRef.current)
      console.log(offset)
      // setScrollOffset(offset);
    };
    const scrollUp = () => {
      setScrollOffset(scrollOffset - 20)
    };

    const scrollDown = () => {
      if (scrollViewRef.current) {
        const currentOffset = scrollViewRef.current.contentOffset.y;
        const maxOffset = scrollViewRef.current.contentSize.height - scrollViewRef.current.layoutMeasurement.height;
        if (currentOffset + 200 <= maxOffset) {
          scrollViewRef.current.scrollTo({ y: currentOffset + 200 });
        }
      }
    };

    const onChangeEditMode = (value: boolean) => {
      setEditMode(value)
    }

    const onDeleteSlot = (slot: any) => {
      const newSlots = slots.filter((item) => {
        return item.StartDateTime !== slot.StartDateTime
      });
      setSlots(newSlots);
      onHandleData(newSlots)

    }

    const onMoveSlot = (slot: any, newStartTime: string) => {
      const newSlots = slots.filter(item => item.StartDateTime !== slot.StartDateTime);
      setSlots([...newSlots, { Duration: slot.Duration, StartDateTime: newStartTime, SlotUid: '' }]);
      onHandleData([...newSlots, { Duration: slot.Duration, StartDateTime: newStartTime, SlotUid: '' }])
    }

    useEffect(() => {
      dispatch(
        updateCurrentClassRequestAction({
          Sessions: slots,

        }),
      );
      onHandleData(slots)
    }, [slots])
    const timeData = generateTimeData(`00:00`, '23:00');

    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
    const date = (new Date(startOfWeek));
    return (<View style={styles.container}>
      {/* <TouchableOpacity onPress={scrollUp}>
        <Text>BUTTTTTTTTTTTTTTon</Text>
      </TouchableOpacity> */}
      <ScrollView ref={scrollViewRef} contentOffset={{ x: 0, y: scrollOffset }} onScroll={handleScroll}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Column style={{ width: 56 }}>
            {timeData.map((item, index) => (
              <TimeLineItem key={index} time={item} />
            ))}
          </Column>
          <Row style={{ flex: 1, paddingRight: 20, paddingBottom: 20 }}>
            {weekStructure?.map((dayEvents, dayIndex) => {
              const currentDate = new Date(addDayAndHoursToDate(date.toISOString(), dayIndex, 0))
              return (
                <Column key={dayIndex}>
                  {dayEvents?.map((_, index) => {
                    const dryField = findScheduleEntries(CurrentScheduledEntries as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index, currentDate.getFullYear())
                    const conflictItem = findScheduleEntries(conflict as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index, currentDate.getFullYear())
                    return <WeekTableItem
                      key={`${dayIndex}-${index}`}
                      timeIndex={index}
                      dayIndex={dayIndex}
                      slots={slots}
                      startOfWeek={startOfWeek}
                      StartDateTime={addDayAndHoursToDate(date.toISOString(), dayIndex, index)}
                      conflict={conflict}
                      onLongPress={onChangeEditMode}
                      editMode={editMode}
                      onDeleteSlot={onDeleteSlot}
                      onMoveSlot={onMoveSlot}
                      currentDay={currentDate}
                      scrollUp={scrollUp}
                      dryField={dryField} />;
                  })}

                </Column>
              );
            })}
          </Row>
        </Row>
      </ScrollView>
    </View>

    );
  },
);

const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return <View style={[styles.row, style && style]}>{children}</View>;
};

const Column = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; }) => {
  return <View style={[styles.column, style && style]}>{children}</View>;
};

const TimeLineItem = ({ time }: { time: string }) => {
  return (
    <View style={styles.timeLineBlock}>
      <Text style={styles.timeLineText}>{time}</Text>
    </View>
  );
};
