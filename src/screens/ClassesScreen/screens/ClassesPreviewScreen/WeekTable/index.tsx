import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, ActivityIndicator, ScrollView } from 'react-native';


import { WeekTableItem } from './WeekTableItem';
import styles from './styles';
import { addDayAndHoursToDate, createWeekStructure, generateTimeData } from '../../../../../services/utils/generateDate.util';

import { IGeneratedScheduleEntries } from '../../../../../common/types/schedule.types';
import { useAppSelector } from '../../../../../store/hooks';
import { convertSessionsToLocalTime } from '../../../../../services/utils/convertToUTC';




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
  classId: number;
}



export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, classId }) => {
    const { loading, classesSchedule } = useAppSelector(state => state.classes);
    const [editMode, setEditMode] = useState(false);


    const onChangeEditMode = (value: boolean) => {
      setEditMode(value);
    }


    const timeData = generateTimeData('00:00', '23:00');

    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );
    useEffect(() => {
      console.log('loading:', loading)
    }, [loading])
    const date = (new Date(startOfWeek));
    return (
      <View style={styles.container}>
        <ScrollView contentOffset={{ x: 0, y: 64 * 8 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Column style={{ width: 56 }}>
              {timeData.map((item, index) => (
                <TimeLineItem key={index} time={item} />
              ))}
            </Column>
            <Row style={styles.rowLessons}>
              {weekStructure?.map((dayEvents, dayIndex) => {

                return (
                  <Column key={dayIndex}>
                    {dayEvents?.map((_, index) => {
                      const currentDate = new Date(addDayAndHoursToDate(date.toISOString(), dayIndex, 0))
                      const dryField = findScheduleEntries(convertSessionsToLocalTime(classesSchedule.OtherSessions) as [], currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, index)

                      return <WeekTableItem
                        key={`${dayIndex}-${index}`}
                        classId={classId}
                        slots={convertSessionsToLocalTime(classesSchedule.Sessions)}
                        currentDate={currentDate}
                        timeIndex={index}
                        onLongPress={onChangeEditMode}
                        editMode={editMode}
                        dryField={dryField}
                      />;
                    })}

                  </Column>
                );
              })}
            </Row>
          </Row>
        </ScrollView>

      </View>

    )
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


