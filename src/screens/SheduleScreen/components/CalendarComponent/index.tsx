// CalendarComponent.tsx
import React, {memo, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import dayjs, {Dayjs} from 'dayjs';

import ArrowLeft from '../../../../../assets/svg/schedule/ArrowLeft';
import ArrowRight from '../../../../../assets/svg/schedule/ArrowRight';
import styles from './styles';

type Props = {
  onMonthChange?: (month: DateData) => void;
  onDayPress?: (day: DateData) => void;
  visible?: boolean;
  date?: string;
};

const CalendarComponent: React.FC<Props> = memo(
  ({onMonthChange, onDayPress, visible, date}) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
    console.log(selectedDate, 'selectedDate');
    const handleMonthChange = (month: DateData) => {
      setCurrentMonth(dayjs(month.dateString));
      onMonthChange && onMonthChange(month);
    };

    const handleDayPress = (day: DateData) => {
      setSelectedDate(day.dateString);
      onDayPress && onDayPress(day);
    };

    const dayComponent = ({date, state}: {date: DateData; state: string}) => {
      const isSelected = date.dateString === selectedDate;
      const isDisabled = state === 'disabled';

      return (
        <TouchableOpacity onPress={() => !isDisabled && handleDayPress(date)}>
          <LinearGradient
            style={styles.dayContainer}
            colors={
              isSelected
                ? ['#EAAFC8', '#654EA3']
                : ['transparent', 'transparent']
            }
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}>
            <Text
              style={[
                styles.dayText,
                isDisabled && styles.disabledText,
                isSelected && styles.dayTextSelected,
              ]}>
              {date.day}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    };

    return visible ? (
      <>
        <LinearGradient
          colors={['#FFFFFF', '#EFF1F5']}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.49, 1]}
          style={{
            marginVertical: 20,
            borderRadius: 15,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}>
          <Calendar
            style={{
              backgroundColor: 'none',
            }}
            theme={{
              calendarBackground: 'none',
            }}
            renderArrow={direction =>
              direction === 'left' ? (
                <ArrowCalendar>
                  <ArrowLeft />
                </ArrowCalendar>
              ) : (
                <ArrowCalendar>
                  <ArrowRight />
                </ArrowCalendar>
              )
            }
            monthFormat={'MMMM yyyy'}
            firstDay={6}
            current={selectedDate}
            onMonthChange={handleMonthChange}
            //@ts-ignore
            dayComponent={dayComponent}
          />
        </LinearGradient>
      </>
    ) : null;
  },
);

const ArrowCalendar = ({children}: {children: React.ReactNode}) => (
  <View style={styles.arrow}>{children}</View>
);
export default CalendarComponent;
