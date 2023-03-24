import React, {FC, memo, useEffect} from 'react';
import {StyleProp, Text, View, ViewStyle, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  return (
    <View style={styles.container}>
      <ScheduleScroller title={'March 21, 2023'} />
      <Row>
        {days.map(day => (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.daysOfWeekText}>{day}</Text>
          </View>
        ))}
      </Row>
      <Row style={{flex: 1}}>
        <MonthItem sesion={[]} day={'1'} />
        <MonthItem sesion={[]} day={'2'} />
        <MonthItem sesion={[]} day={'3'} />
        <MonthItem sesion={[]} day={'4'} />
        <MonthItem sesion={[]} day={'5'} />
        <MonthItem sesion={[]} day={'6'} />
        <MonthItem sesion={[]} day={'7'} />
      </Row>
      <Row style={{flex: 1}}>
        <MonthItem sesion={[]} day={'8'} />
        <MonthItem
          sesion={[TypeSession.lesson, TypeSession.trial, TypeSession.trial]}
          day={'9'}
        />
        <MonthItem sesion={[]} day={'10'} />
        <MonthItem sesion={[]} day={'11'} />
        <MonthItem sesion={[]} day={'12'} />
        <MonthItem sesion={[]} day={'13'} />
        <MonthItem sesion={[]} day={'14'} />
      </Row>
      <Row style={{flex: 1}}>
        <MonthItem
          sesion={[TypeSession.lesson, TypeSession.trial, TypeSession.trial]}
          day={'15'}
        />
        <MonthItem sesion={[]} day={'16'} />
        <MonthItem sesion={[]} day={'17'} />
        <MonthItem sesion={[]} day={'18'} />
        <MonthItem
          sesion={[TypeSession.lesson, TypeSession.lesson]}
          day={'19'}
        />
        <MonthItem sesion={[]} day={'20'} />
        <MonthItem sesion={[]} day={'21'} />
      </Row>
      <Row style={{flex: 1}}>
        <MonthItem sesion={[]} day={'22'} />
        <MonthItem sesion={[]} day={'23'} />
        <MonthItem sesion={[]} day={'24'} />
        <MonthItem sesion={[]} day={'25'} />
        <MonthItem sesion={[]} day={'26'} />
        <MonthItem sesion={[]} day={'27'} />
        <MonthItem sesion={[]} day={'28'} />
      </Row>
      <Row style={{flex: 1}}>
        <MonthItem sesion={[]} day={'29'} />
        <MonthItem
          sesion={[TypeSession.lesson, TypeSession.trial]}
          day={'30'}
        />
        <MonthItem sesion={[]} day={'31'} />
        <MonthItem sesion={[]} day={' '} />
        <MonthItem sesion={[]} day={' '} />
        <MonthItem sesion={[]} day={' '} />
        <MonthItem sesion={[]} day={' '} />
      </Row>
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
