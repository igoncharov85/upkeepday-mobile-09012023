import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, ActivityIndicator, ScrollView } from 'react-native';


import { WeekTableItem } from './WeekTableItem';
import styles from './styles';
import { addDayAndHoursToDate, createWeekStructure, generateTimeData } from '../../../../../services/utils/generateDate.util';

import { IGeneratedScheduleEntries } from '../../../../../common/types/schedule.types';
import { useAppSelector } from '../../../../../store/hooks';
import { dispatch } from '../../../../../store/store';
import { fetchScheduleByPeriodAction } from '../../../../../store/shedule/actions';
import moment from 'moment';




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
  dryFields: IGeneratedScheduleEntries[];
}



export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData, conflict, dryFields }) => {
    const { GeneratedScheduleEntries, loading } = useAppSelector(state => state.schedule);
    const [editMode, setEditMode] = useState(false);
    const localHost = [
      { ClassName: "Music", Duration: 60, SessionId: 5, SlotUid: "3add0ff1-04f0-4aaa-8dc6-f1b5ccec9bd1", StartDateTime: "2023-06-18T17:00:00" },
      { ClassName: "erfer", Duration: 60, SessionId: 21, SlotUid: "6e5243f4-52ac-4256-98de-90467c010e22", StartDateTime: "2023-06-19T09:00:00" },
      { ClassName: "erfer", Duration: 60, SessionId: 22, SlotUid: "de671740-ddd0-47fc-89e3-1aa5bcbbb43d", StartDateTime: "2023-06-20T07:00:00" },
      { ClassName: "Music", Duration: 60, SessionId: 7, SlotUid: "ced0c62f-d378-492c-a8f5-a312dfd36c2f", StartDateTime: "2023-06-21T17:00:00" }
    ];

    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(localHost as []);



    const onChangeEditMode = (value: boolean) => {
      setEditMode(value);
    }

    const onDeleteSlot = (slot: IGeneratedScheduleEntries) => {
      const newSlots = slots.filter((item) => {
        return item.StartDateTime !== slot.StartDateTime
      });
      if (JSON.stringify(slots) !== JSON.stringify(newSlots)) {
        setSlots(newSlots);
        onHandleData(slots)
      }
    }

    const onMoveSlot = (slot: IGeneratedScheduleEntries, x: number, y: number) => {
      const newSlots = slots.filter(item => item.SlotUid !== slot.SlotUid);
      setSlots([...newSlots, { Duration: slot.Duration, StartDateTime: addDayAndHoursToDate(slot.StartDateTime, x, y), SlotUid: slot.SlotUid }]);
    }
    useEffect(() => {
      onHandleData(slots)

    }, [slots])
    useEffect(() => {
      dispatch(fetchScheduleByPeriodAction({ startDate: moment(startOfWeek).add(-1, 'days').toISOString(), endDate: endOfWeek.toISOString() }));
    }, []);
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

                    const activeItem = findScheduleEntries(slots as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    const conflictItem = findScheduleEntries(conflict as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    const dryField = findScheduleEntries(dryFields as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
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
                      dryField={dryField && dryField[0]}
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
