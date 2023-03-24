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
  sesion: TypeSession[];
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
  console.log(monthStructure, 'monthStructure00000');
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
      <ScrollView >
        {monthStructure.map((week, rowIndex) => (
          <Row style={{flex: 1}} key={rowIndex}>
            {week.map((day, colIndex) => {
              const dayKey = `${rowIndex}-${colIndex}`;
              if (day !== null) {
                return (
                  <MonthItem
                    key={dayKey}
                    sesion={getTypeSessionArray(dataOfMonth[day - 1])}
                    day={day.toString()}
                  />
                );
              }
              return <MonthItem key={dayKey} sesion={[]} day={' '} />;
            })}
          </Row>
        ))}
      </ScrollView>
    </View>
  );
});

const MonthItem: FC<IMonthItem> = ({sesion, day}) => {
  const today = day == '21';
  return today ? (
    <View style={{flex: 1, height: 92, alignItems: 'center'}}>
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: 13,
          lineHeight: 19,
          color: '#171930',
          alignItems: 'center',
        }}>
        {day}
      </Text>
      <ScrollView></ScrollView>
    </View>
  ) : (
    <View style={{flex: 1, height: 92, alignItems: 'center'}}>
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: 13,
          lineHeight: 19,
          color: '#171930',
          alignItems: 'center',
        }}>
        {day}
      </Text>
      <ScrollView>
        {sesion.map(type => (
          <SesionItem typeSession={type} />
        ))}
      </ScrollView>
    </View>
  );
};
const SesionItem = ({typeSession}: {typeSession: TypeSession}) => {
  const trialParam = {
    colors: ['#E9600D', '#F3922C', '#FFCE50'],
    colorsWithOpacity: [
      'rgba(233,96,13,0.19)',
      'rgba(243,146,44,0.19)',
      'rgba(255,206,80,0.19)',
    ],
    locations: [0, 0.4581, 1],
  };
  const lessonParam = {
    colors: ['#654EA3', '#EAAFC8'],
    colorsWithOpacity: ['rgba(101,78,163,0.19)', 'rgba(234,175,200,0.19)'],
    locations: [0, 1],
  };
  const getParams = () => {
    switch (typeSession) {
      case TypeSession.lesson:
        return lessonParam;
      case TypeSession.trial:
        return trialParam;
    }
  };
  return (
    <View style={{flex: 1, height: 16, width: 41, marginTop: 4}}>
      <LinearGradient
        colors={getParams().colorsWithOpacity}
        locations={getParams().locations}
        style={{borderRadius: 9}}>
        <Row style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
          <View
            style={{width: 5, height: 5, borderRadius: 5, overflow: 'hidden'}}>
            <LinearGradient
              colors={getParams().colors}
              style={{flex: 1}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          </View>
          <Text style={{fontSize: 9}}>
            {typeSession == TypeSession.lesson ? 'Class' : 'Trial'}
          </Text>
        </Row>
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
