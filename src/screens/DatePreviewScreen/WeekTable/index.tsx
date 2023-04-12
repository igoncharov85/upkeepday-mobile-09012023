import React, { FC, memo, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { WeekTableItem } from './WeekTableItem';
import styles from './styles';
import { createWeekStructure, generateTimeData, isToday } from '../../../services/utils/generateDate.util';

import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import { generateUUID } from '../../../services/utils/generateUUIDKey.util';
import { useAppSelector } from '../../../store/hooks';


interface Event {
  DayOfWeek: number;
  Duration: number;
  StartTime: string;
}

function findEvent(events: Event[], dayOfWeek: number, hour: number): Event | undefined {
  const hourString = `${hour}:00`;
  return events.find((event) => {
    const eventHour = parseInt(event.StartTime.split(":")[0]);
    return event.DayOfWeek === dayOfWeek && eventHour === hour;
  });
}
interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  onHandleData?: (data: IWeekTimeSlot[]) => void;
}
export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData }) => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);

    const [editMode, setEditMode] = useState(false);
    const [isSlotEdit, setIsSlotEdit] = useState(false);
    const [slots, setSlots] = useState<IWeekTimeSlot[]>(createCurrentClassRequest.WeekTimeSlots as []);



    const onChangeEditMode = () => {
      setEditMode(true);
      console.log('onChangeEditMode');
    }

    const onDeleteSlot = (slot: IWeekTimeSlot) => {
      if (editMode) {
        console.log(slot)
        console.log('onDeleteSlot');
        const index = slots.findIndex((event) => event.DayOfWeek === slot.DayOfWeek && event.StartTime === slot.StartTime && event.Duration === slot.Duration);
        console.log(index, 'index')
        const newSlots = slots.filter((_, i) => i !== index);
        setIsSlotEdit(true);

        setSlots(newSlots);
        console.log(`current data: \n ${JSON.stringify(slots)}`)
      }

    }

    const onMoveSlot = (slot: IWeekTimeSlot) => {
      if (editMode) {
        console.log(slot)
        console.log('onMoveSlot');
        const index = slots.findIndex((event) => event.DayOfWeek === slot.DayOfWeek && event.StartTime === slot.StartTime && event.Duration === slot.Duration);

        setSlots([...slots, slot]);
        setIsSlotEdit(false)
        setEditMode(false);
        console.log(`current data: \n ${JSON.stringify(slots)}`)
      }

    }



    const onSlotPress = (slot: IWeekTimeSlot) => {
      const index = slots.findIndex((event) => event.DayOfWeek === slot.DayOfWeek && event.StartTime === slot.StartTime && event.Duration === slot.Duration);
      if (index === -1) {
        setSlots([...slots, slot]);
      } else {
        const newSlots = slots.filter((_, i) => i !== index);
        setSlots(newSlots);

      }
    };
    const timeData = generateTimeData(`0${startOfHour}:00`, '22:00');
    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
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
                    const activeItem = findEvent(slots as IWeekTimeSlot[], dayIndex, index + 8)
                    return <WeekTableItem
                      dayOfWeek={dayIndex}
                      key={`${dayIndex}-${index}`}
                      timeIndex={index + 8}
                      activeItem={activeItem}
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
