import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Text, View, StyleProp, ViewStyle, ScrollView } from 'react-native';

import { WeekTableItem } from './WeekTableItem';
import { createWeekStructure, generateTimeData } from '../../../services/utils/generateDate.util';
import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import { useAppSelector } from '../../../store/hooks';
import styles from './styles';


interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  onHandleData: (data: IWeekTimeSlot[]) => void;
}
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, onHandleData }) => {
    const [slots, setSlots] = useState<IWeekTimeSlot[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
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



    const timeData = generateTimeData('00:00', '23:00');


    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
    useEffect(() => {
      scrollViewRef.current?.scrollTo({ x: 0, y: 64 * 8, animated: true });
    }, []);
    useEffect(() => {

      // createCurrentClassRequest?.Slots && setSlots(
      //   createCurrentClassRequest.Slots.map(item => {
      //     return {
      //       Duration: 60,
      //       DayOfWeek: item.DayOfWeek,
      //       StartTime: item.StartTime,
      //     }
      //   })
      // )
    }, [createCurrentClassRequest])
    // useEffect(() => {
    //   console.log('new data:', slots);

    // }, [slots]);
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollViewRef}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Column style={{ width: 56 }}>
              {timeData.map((item, index) => (
                <TimeLineItem key={index} time={item} />
              ))}
            </Column>
            <Row style={{ flex: 1, paddingRight: 20, paddingBottom: 20 }}>
              {weekStructure?.map((dayEvents, dayIndex) => {
                // console.log('\n---------', dayIndex)
                return (
                  <Column key={dayIndex}>
                    {dayEvents?.map((_, index) => {
                      // console.log(dayIndex);
                      const daySchedule = slots.filter(item => item.DayOfWeek == dayIndex)
                      // daySchedule.length && console.log(daySchedule);


                      const activeItem = createCurrentClassRequest?.Slots && createCurrentClassRequest?.Slots.some(item => item.DayOfWeek == dayIndex && item.StartTime == `${index}:00:00`)
                      return <WeekTableItem dayOfWeek={dayIndex} timeIndex={index} onHandleClick={onSlotPress} daySchedule={daySchedule} key={`${daySchedule} ${index}`} />;
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
