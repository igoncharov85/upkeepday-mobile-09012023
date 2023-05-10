import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
    const { GeneratedScheduleEntries, loading } = useAppSelector(state => state.schedule);
    const [editMode, setEditMode] = useState(false);
    const [isSlotEdit, setIsSlotEdit] = useState(false);
    const [SlotUid, setSlotUid] = useState('');
    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(GeneratedScheduleEntries as []);



    const onChangeEditMode = (value: boolean) => {
      setEditMode(value);
      setSlotUid('')
    }

    const onDeleteSlot = (slot: IGeneratedScheduleEntries) => {
      if (editMode) {
        const index = slots.findIndex((event) => event?.StartDateTime === slot?.StartDateTime);
        const newSlots = slots.filter((_, i) => i !== index);

        if (JSON.stringify(slots) !== JSON.stringify(newSlots)) {
          setSlotUid(slot.SlotUid)
          setSlots(newSlots);
          setIsSlotEdit(true);
          onHandleData(slots)
          console.log(slot, 'delete slot');

        }
      }

    }

    const onMoveSlot = (slot: IGeneratedScheduleEntries) => {
      if (SlotUid && isSlotEdit) {
        setSlots([...slots, { Duration: slot.Duration, StartDateTime: slot.StartDateTime, SlotUid: SlotUid }]);
        console.log({ Duration: slot.Duration, StartDateTime: slot.StartDateTime, SlotUid: SlotUid }, 'slot');

        setSlotUid('')
        setIsSlotEdit(false)
        setEditMode(false);
        onHandleData(slots)
      }


    }
    useEffect(() => {
      onHandleData(slots)

    }, [slots])
    const timeData = generateTimeData(`00:00`, '24:00');

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

                    const activeItem = findScheduleEntries(slots as [], currentDate.getUTCDate() + 1, currentDate.getUTCMonth() + 1, index)
                    const conflictItem = findScheduleEntries(conflict as [], currentDate.getUTCDate() + 1, currentDate.getUTCMonth() + 1, index)
                    activeItem[0] && console.log(activeItem, 'activeItem');
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
                    />;
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
