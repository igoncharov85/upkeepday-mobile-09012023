import React, {FC, memo} from 'react';
import {StyleSheet, Text, View, StyleProp, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SheduleTableItem} from './SheduleTableItem';
import styles from './styles';

interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  dataOfMonth: Array<{
    StartDateTime: string;
    Duration: number;
    type: string;
    className: string;
  }>;
}
enum TypeSession {
  lesson,
  trial,
}

const isToday = (dayIndex: number) => {
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();
  return dayIndex === currentDayIndex;
};

const createWeekStructure = (
  startOfWeek: Date,
  endOfWeek: Date,
  dataOfMonth: Array<any>,
  timeData: Array<string>,
) => {
  const weekStructure = new Array(7)
    .fill(null)
    .map(() => new Array(timeData.length).fill(null));

  dataOfMonth.forEach(event => {
    const eventDate: Date = new Date(event.StartDateTime);
    if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
      const dayIndex = eventDate.getDay();
      const hourIndex = eventDate.getHours() - 8;
      weekStructure[dayIndex][hourIndex] = event;
    }
  });

  return weekStructure;
};

const generateTimeData = (startTime: string, endTime: string) => {
  const startHour = parseInt(startTime.split(':')[0], 10);
  const endHour = parseInt(endTime.split(':')[0], 10);
  const timeData = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const amPm = hour < 12 ? 'am' : 'pm';
    const hour12 = hour <= 12 ? hour : hour - 12;
    timeData.push(`${hour12} ${amPm}`);
  }

  return timeData;
};

export const SheduleTable: FC<ISheduleTable> = memo(
  ({startOfWeek, endOfWeek, dataOfMonth}) => {
    const timeData = generateTimeData('08:00', '24:00');
    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      dataOfMonth,
      timeData,
    );
    return (
      <View style={styles.container}>
        <ScrollView>
          <Row style={{justifyContent: 'space-between'}}>
            <Column>
              {timeData.map(item => (
                <TimeLineItem key={item} time={item} />
              ))}
            </Column>
            <Row style={{flex: 1}}>
              {weekStructure?.map((dayEvents, dayIndex) => {
                return (
                  <Column key={dayIndex}>
                    {dayEvents?.map((event, index) => {
                      if (event) {
                        console.log(event.Duration, 'event.Duration');
                        return (
                          <SheduleTableItem
                            key={event.StartDateTime}
                            timeDuration={event.Duration / 60}
                            typeSession={
                              event.type == 'lesson'
                                ? TypeSession.lesson
                                : TypeSession.trial
                            }
                            title={event.className}
                          />
                        );
                      }
                      return <SheduleTableItem key={`${dayIndex}-${index}`} />;
                    })}
                    {isToday(dayIndex) && (
                      <View style={[styles.absoluteFill, styles.mask]} />
                    )}
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

const Column = ({children}: {children: React.ReactNode}) => {
  return <View style={styles.column}>{children}</View>;
};

const TimeLineItem = ({time}: {time: string}) => {
  return (
    <View style={styles.timeLineBlock}>
      <Text style={styles.timeLineText}>{time}</Text>
    </View>
  );
};
