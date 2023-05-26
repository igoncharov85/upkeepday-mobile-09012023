import React, { FC, memo, useEffect } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle, ScrollView } from 'react-native';
import { SheduleTableItem } from './SheduleTableItem';
import styles from './styles';
import { createWeekStructure, generateTimeData, getToday, isToday } from '../../../../services/utils/generateDate.util';
import { useAppSelector } from '../../../../store/hooks';
import { dispatch } from '../../../../store/store';
import { fetchScheduleByPeriodAction } from '../../../../store/shedule/actions';
import { ScreenLoading } from '../../../../components/UI/ScreenLoading';

interface ISheduleTable {
  startOfWeek: Date;
  endOfWeek: Date;
}

const findObject = (arr: any[], hour: number, day: number) => {
  const foundObject = arr?.find(obj => {
    const startDate = new Date(obj.StartDateTime);
    return startDate?.getHours() === hour && startDate.getDate() === day;
  });
  return foundObject ? { ...foundObject } : null;
};
function isTodayInWeekRange(start: Date, end: Date): boolean {
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return today >= start && today <= end;
}


export const SheduleTable: FC<ISheduleTable> = memo(
  ({ startOfWeek, endOfWeek }) => {
    const startWeekOfDay = getToday(startOfWeek)[1]
    const timeData = generateTimeData(`00:00`, '24:00');
    const weekStructure = createWeekStructure(
      startOfWeek,
      endOfWeek,
      timeData,
    );

    const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    useEffect(() => {
      dispatch(fetchScheduleByPeriodAction({ startDate: startOfWeek.toISOString(), endDate: endOfWeek.toISOString() }));
    }, [startOfWeek])
    return loading ? <ScreenLoading /> : (
      <View style={styles.container}>
        <ScrollView contentOffset={{ x: 0, y: 64 * 8 }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Column>
              {timeData.map((item, index) => (
                <TimeLineItem key={index} time={item} />
              ))}
            </Column>
            <Row style={{ flex: 1 }}>
              {weekStructure?.map((dayEvents, dayIndex) => {
                return (
                  <Column key={dayIndex}>
                    {dayEvents?.map((event, index) => {

                      const item = findObject(CurrentScheduledEntries, index, dayIndex + startWeekOfDay)
                      if (findObject(CurrentScheduledEntries, index, dayIndex + startWeekOfDay)) {
                        return (
                          <SheduleTableItem
                            key={index}
                            ClassName={item.ClassName}
                            Duration={item.Duration}
                            SlotUid={item.SlotUid}
                            StartDateTime={item.StartDateTime}
                            ScheduleEntryId={0} />
                        );
                      }
                      return <SheduleTableItem key={index} SlotUid={''} StartDateTime={''} Duration={0} ClassName={''} ScheduleEntryId={0} />;
                    })}
                    {isToday(dayIndex) && isTodayInWeekRange(startOfWeek, endOfWeek) && (
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
  return <View style={[styles.row, style && style]}>{children}</View>;
};

const Column = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.column}>{children}</View>;
};

const TimeLineItem = ({ time }: { time: string }) => {
  return (
    <View style={styles.timeLineBlock}>
      <Text style={styles.timeLineText}>{time}</Text>
    </View>
  );
};
