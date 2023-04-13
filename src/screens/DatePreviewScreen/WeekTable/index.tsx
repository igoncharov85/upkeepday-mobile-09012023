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





function findScheduleEntries(
  entries: IGeneratedScheduleEntries[],
  day: number,
  month: number,
  hour: number
): any[] {
  const filteredEntries = entries.filter((entry) => {
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
    const { GeneratedScheduleEntries, WeekTimeSlots, loading } = useAppSelector(state => state.schedule);
    const [editMode, setEditMode] = useState(false);
    const [isSlotEdit, setIsSlotEdit] = useState(false);
    const [weekTimeSlotId, setWeekTimeSlotId] = useState('');
    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(GeneratedScheduleEntries as []);



    const onChangeEditMode = () => {
      setEditMode(true);
    }

    const onDeleteSlot = (slot: IGeneratedScheduleEntries) => {
      if (editMode) {
        const index = slots.findIndex((event) => event.StartDateTime === slot.StartDateTime && event.Duration === slot.Duration);
        const newSlots = slots.filter((_, i) => i !== index);
        setIsSlotEdit(true);
        setSlots(newSlots);
        setWeekTimeSlotId(slot.WeekTimeSlotId)
      }

    }

    const onMoveSlot = (slot: IGeneratedScheduleEntries) => {
      if (editMode) {
        setSlots([...slots, { Duration: slot.Duration, StartDateTime: slot.StartDateTime, WeekTimeSlotId: weekTimeSlotId }]);
        onHandleData(slots)
        setIsSlotEdit(false)
        setEditMode(false);

      }


    }

    useEffect(() => {
      onHandleData(slots)
    }, [slots])
    const timeData = generateTimeData(`0${startOfHour}:00`, '22:00');

    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );

    const date = (new Date(startOfWeek));
    return (<View style={styles.container}>
      <ScrollView >
        <Row style={{ justifyContent: 'space-between' }}>
          <Column style={{ width: 56 }}>
            {timeData.map(item => (
              <TimeLineItem key={item} time={item} />
            ))}
          </Column>
          <Row style={{ flex: 1, paddingRight: 20, paddingBottom: 20 }}>
            {weekStructure?.map((dayEvents, dayIndex) => {
              return (
                <Column key={dayIndex}>
                  {dayEvents?.map((_, index) => {
                    const activeItem = findScheduleEntries(slots as [], dayIndex + date.getUTCDate(), date.getUTCMonth() + 1, index + 8)
                    const conflictItem = findScheduleEntries(conflict as [], dayIndex + date.getUTCDate(), date.getUTCMonth() + 1, index + 8)

                    return <WeekTableItem
                      key={`${dayIndex}-${index}`}
                      timeIndex={index + 8}
                      StartDateTime={addDayAndHoursToDate(date.toISOString(), dayIndex, index + 8)}
                      activeItem={activeItem[0]}
                      conflict={!!conflictItem[0]}
                      onLongPress={onChangeEditMode}
                      editMode={editMode}
                      editSlot={isSlotEdit ? onMoveSlot : onDeleteSlot}
                    />;
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
  return <View style={[styles.row, style ?? {}]}>{children}</View>;
};

const Column = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; }) => {
  return <View style={[styles.column, style ?? {}]}>{children}</View>;
};

const TimeLineItem = ({ time }: { time: string }) => {
  return (
    <View style={styles.timeLineBlock}>
      <Text style={styles.timeLineText}>{time}</Text>
    </View>
  );
};
