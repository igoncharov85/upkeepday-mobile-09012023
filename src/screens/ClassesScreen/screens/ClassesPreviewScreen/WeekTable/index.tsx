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
import PreviewModal from '../../../components/PreviewModal';




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

function removeElementsFromArray(arr1: any[], arr2: any[]) {
  return arr1.filter(item1 => {
    return !arr2.some(item2 => {
      return item1.ClassName === item2.ClassName && item1.SessionId === item2.SessionId;
    });
  });


}

export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData, conflict, dryFields }) => {
    const { GeneratedScheduleEntries, CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    const { currentSession } = useAppSelector(state => state.classes);
    const [editMode, setEditMode] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(0);
    const [currentSlotTime, setCurrentSlotTime] = useState('');
    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>(removeElementsFromArray(currentSession, CurrentScheduledEntries) as []);

    const onChangeEditMode = (value: boolean) => {
      setEditMode(value);
    }

    const onDeleteSlot = (slot: any) => {
      setCurrentSessionId(slot.SessionId);
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
      setCurrentSessionId(slot.SessionId);
      const newTime = addDayAndHoursToDate(slot.StartDateTime, x, y);
      onHandleModalEdit();
      const newSlots = slots.filter(item => item.SlotUid !== slot.SlotUid);
      setSlots([...newSlots, { Duration: slot.Duration, StartDateTime: newTime, SlotUid: slot.SlotUid }]);
    }
    useEffect(() => {
      onHandleData(slots)
    }, [slots])

    useEffect(() => {
      dispatch(fetchScheduleByPeriodAction({ startDate: moment(startOfWeek).add(-1, 'days').toISOString(), endDate: endOfWeek.toISOString() }));
    }, []);
    const timeData = generateTimeData('00:00', '23:00');
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

                    const activeItem = findScheduleEntries(currentSession as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    const conflictItem = findScheduleEntries(conflict as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)
                    const dryField = findScheduleEntries(dryFields as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)

                    return <WeekTableItem
                      key={`${dayIndex}-${index}`}
                      timeIndex={index}
                      dayIndex={dayIndex}
                      startOfWeek={startOfWeek}
                      StartDateTime={addDayAndHoursToDate(date.toISOString(), dayIndex, index)}
                      activeItem={activeItem[0] && activeItem[0]}
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

      <PreviewModal editMode isVisible={isVisibleEdit} closeModal={onHandleModalEdit} currentSessionId={currentSessionId} newTime={currentSlotTime} />
      <PreviewModal isVisible={isVisible} closeModal={onHandleModal} currentSessionId={currentSessionId} />
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
