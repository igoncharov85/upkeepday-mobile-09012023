import React, { FC, memo, useState } from 'react';
import { Text, View, StyleProp, ViewStyle, ScrollView } from 'react-native';
import moment from 'moment';

import { WeekTableItem } from './WeekTableItem';
import { createWeekStructure, generateTimeData } from '../../../../../services/utils/generateDate.util';
import { useAppSelector } from '../../../../../store/hooks';
import styles from './styles';

interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
  classId: number;
}


export const startOfHour = 8;
export const WeekTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek, classId }) => {
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
                      const currentTime = moment(startOfWeek).add(dayIndex, 'days').add(index, 'hours').toDate()
                      return <WeekTableItem
                        key={`${dayIndex}-${index}`}
                        classId={classId}
                        currentDate={currentTime}
                        timeIndex={index}
                        onLongPress={onChangeEditMode}
                        editMode={editMode}
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


