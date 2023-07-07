import React, { FC, memo, useEffect, useState } from 'react';
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
  hour: number
): any[] {
  const filteredEntries = entries?.filter((entry) => {
    const startDate = new Date(entry.StartDateTime);
    return (
      startDate.getDate() === day &&
      startDate.getMonth() + 1 === month &&
      startDate.getHours() === hour
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
    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(GeneratedScheduleEntries as []);

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);


    const onChangeEditMode = (value: boolean) => {
      setEditMode(value)
    }

    const onDeleteSlot = (slot: any) => {
      onHandleModal();
      const newSlots = slots.filter((item) => {
        return item.StartDateTime !== slot.StartDateTime
      });
      if (JSON.stringify(slots) !== JSON.stringify(newSlots)) {
        setSlots(newSlots);
        onHandleData(slots)
      }
    }
    const onHandleModal = () => {
      setIsVisible(!isVisible);
    }
    const onHandleModalEdit = () => {
      setIsVisibleEdit(!isVisibleEdit);
    }
    const onMoveSlot = (slot: any, x: number, y: number) => {
      const newTime = addDayAndHoursToDate(slot.StartDateTime, x, y);
      onHandleModalEdit();
      const newSlots = slots.filter(item => item.StartDateTime !== slot.StartDateTime);
      setSlots([...newSlots, { Duration: slot.Duration, StartDateTime: newTime, SlotUid: '' }]);
    }
    useEffect(() => {
      onHandleData(slots)
    }, [slots])
    const timeData = generateTimeData(`00:00`, '23:00');

    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
    const date = (new Date(startOfWeek));
    return GeneratedScheduleEntries.length > 0 && !loading ? (<View style={styles.container}>
      <ScrollView contentOffset={{ x: 0, y: 64 * 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <Column style={{ width: 56 }}>
            {timeData.map((item, index) => (
              <TimeLineItem key={index} time={item} />
            ))}
          </Column>
          <Row style={{ flex: 1, paddingRight: 20, paddingBottom: 20 }}>
            {weekStructure?.map((dayEvents, dayIndex) => {

              return (
                <Column key={dayIndex}>
                  {dayEvents?.map((_, index) => {
                    const currentDate = new Date(addDayAndHoursToDate(date.toISOString(), dayIndex, 0))
                    const dryField = findScheduleEntries(CurrentScheduledEntries as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)

                    const activeItem = findScheduleEntries(slots as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    const conflictItem = findScheduleEntries(conflict as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    return <WeekTableItem
                      key={`${dayIndex}-${index}`}
                      timeIndex={index}
                      dayIndex={dayIndex}
                      startOfWeek={startOfWeek}
                      StartDateTime={addDayAndHoursToDate(date.toISOString(), dayIndex, index)}
                      activeItem={activeItem && activeItem[0]}
                      conflict={!!conflictItem[0]}
                      onLongPress={onChangeEditMode}
                      editMode={editMode}
                      onDeleteSlot={onDeleteSlot}
                      onMoveSlot={onMoveSlot}
                      dryField={dryField && dryField[0]} />;
                  })}

                </Column>
              );
            })}
          </Row>
        </Row>
      </ScrollView>
    </View>

    ) : <ActivityIndicator
      style={StyleSheet.absoluteFill}
      color={'#9A80BA'}
      size="large"
    />;
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
