import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScheduleCalendar } from './ScheduleCalendar';

// import styles from './styles';

interface IScheduleMonthScreen { }



export const ScheduleMonthScreen: FC<IScheduleMonthScreen> = memo(() => {
  return <ScheduleCalendar startingDayOfWeek={0} />;
});


type Month = {
  key: string;
  name: string;
  days: number;
  firstDay: number;
};

const getMonthData = (year: number, month: number): Month => {
  const date = new Date(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const name = date.toLocaleString('default', { month: 'long' });

  return { key: `${year}-${month}`, name, days, firstDay };
};

const generateMonths = (startYear: number, startMonth: number, numMonths: number): Month[] => {
  const months: Month[] = [];

  for (let i = 0; i < numMonths; i++) {
    const year = startYear + Math.floor((startMonth + i) / 12);
    const month = (startMonth + i) % 12;
    months.push(getMonthData(year, month));
  }

  return months;
};

const Calendar: React.FC = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    setMonths(generateMonths(currentYear - 1, currentMonth, 25));
  }, []);

  const renderItem = ({ item }: { item: Month }) => {
    const monthArray: (number | null)[] = [];

    for (let i = 0; i < item.firstDay; i++) {
      monthArray.push(null);
    }

    for (let i = 1; i <= item.days; i++) {
      monthArray.push(i);
    }

    return (
      <View style={styles.monthContainer}>
        <Text style={styles.monthTitle}>{item.name}</Text>
        <View style={styles.daysContainer}>
          {monthArray.map((day, index) => (
            <View key={index} style={styles.dayCell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={months}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    />
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.285%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
  },
});
