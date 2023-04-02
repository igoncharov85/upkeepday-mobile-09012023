import React, {FC, memo, useEffect} from 'react';
import {StyleProp, Text, View, ViewStyle, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dataOfMonth} from '..';

import {ScheduleScroller} from '../components/ScheduleScroller';
import styles from './styles';

interface IScheduleMonthScreen {}
enum TypeSession {
  lesson,
  trial,
}
interface IMonthItem {
  sesion?: number;
  day: string;
}

interface Session {
  StartDateTime: string;
  Duration: number;
  type: 'lesson' | 'trial';
  className: string;
}

function getTypeSessionArray(array: any) {
  return array.map((item: Session): TypeSession => {
    return item.type === 'lesson' ? TypeSession.lesson : TypeSession.trial;
  });
}

const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonthIndex = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

interface EventData {
  StartDateTime: string;
  Duration: number;
  type: string;
  className: string;
}

const createMonthStructure = (dataOfMonth: EventData[][]): number[][] => {
  const firstEventDate = new Date(dataOfMonth[0][0].StartDateTime);
  const year = firstEventDate.getFullYear();
  const month = firstEventDate.getMonth();

  const monthDays = daysInMonth(year, month);
  const firstDayIndex = firstDayOfMonthIndex(year, month);

  const monthStructure = new Array(Math.ceil((monthDays + firstDayIndex) / 7))
    .fill(null)
    .map(() => new Array(7).fill(null));

  for (let i = 0; i < monthDays; i++) {
    const rowIndex = Math.floor((i + firstDayIndex) / 7);
    const colIndex = (i + firstDayIndex) % 7;
    monthStructure[rowIndex][colIndex] = i + 1;
  }

  return monthStructure;
};

export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

  const monthStructure = createMonthStructure(dataOfMonth);
  const currentMonth = new Date()
    .toLocaleString('default', {month: 'long', year: 'numeric'})
    .replace(/,\s(\d{4})$/, ',$1');
  return (
    <View style={styles.container}>
      <ScheduleScroller title={currentMonth} />
      <Row>
        {days.map(day => (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.daysOfWeekText}>{day}</Text>
          </View>
        ))}
      </Row>
      <ScrollView>
        {monthStructure.map((week, rowIndex) => (
          <Row style={{flex: 1}} key={rowIndex}>
            {week.map((day, colIndex) => {
              const dayKey = `${rowIndex}-${colIndex}`;
              if (day !== null) {
                return (
                  <MonthItem
                    key={dayKey}
                    sesion={dataOfMonth[day - 1].length}
                    day={day.toString()}
                  />
                );
              }
              return <MonthItem key={dayKey} day={' '} />;
            })}
          </Row>
        ))}
      </ScrollView>
    </View>
  );
});

const MonthItem: FC<IMonthItem> = ({sesion, day}) => {
  return (
    <View style={{flex: 1, height: 92, alignItems: 'center', margin: 1}}>
      <LinearGradient
        colors={
          sesion ? ['#EAAFC8', '#654EA3'] : ['transparent', 'transparent']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 9,
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.monthItemText,
            sesion ? styles.monthItemActiveText : null,
          ]}>
          {day}
        </Text>
        {sesion ? (
          <Text style={styles.numberOfClasses}>{`${sesion} Sessions`}</Text>
        ) : null}
      </LinearGradient>
    </View>
  );
};

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
