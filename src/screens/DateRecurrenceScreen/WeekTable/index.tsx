import React, { FC, memo, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { WeekTableItem } from './WeekTableItem';
import styles from './styles';
import { createWeekStructure, generateTimeData, isToday } from '../../../services/utils/generateDate.util';

import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import { generateUUID } from '../../../services/utils/generateUUIDKey.util';


interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  onHandleData: (data: IWeekTimeSlot[]) => void;
}
export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData }) => {
    const [slots, setSlots] = useState<IWeekTimeSlot[]>([]);

    const onSlotPress = (slot: IWeekTimeSlot) => {
      const index = slots.findIndex((event) => event.DayOfWeek === slot.DayOfWeek && event.StartTime === slot.StartTime && event.Duration === slot.Duration);
      if (index === -1) {
        setSlots([...slots, slot]);
        onHandleData([...slots, slot]);
      } else {
        const newSlots = slots.filter((_, i) => i !== index);
        onHandleData(newSlots);
        setSlots(newSlots);

      }
    };



    const timeData = generateTimeData(`0${startOfHour}:00`, '24:00');
    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
    return (
      <View style={styles.container}>
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

                      return <WeekTableItem dayOfWeek={dayIndex} timeIndex={index} onHandleClick={onSlotPress} />;
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
