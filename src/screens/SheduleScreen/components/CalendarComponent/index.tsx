import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

import ArrowLeft from '../../../../../assets/svg/schedule/ArrowLeft';
import ArrowRight from '../../../../../assets/svg/schedule/ArrowRight';
import styles from './styles';
import { formatDate } from '../../../../services/utils/fullDateToValue.util';

type Props = {
  onDayPress: (day: any) => void;
  visible: boolean;
  date: string;
};

const CalendarComponent: React.FC<Props> = memo(
  ({ onDayPress, visible, date }) => {
    const [selectedDate, setSelectedDate] = useState(date);
    console.log('selectedDate', selectedDate);

    const handleDayPress = (day: DateData) => {
      const dateWithNoonTime = new Date(day.dateString);
      dateWithNoonTime.setHours(12, 0, 0, 0);

      const utcDate = dateWithNoonTime.toISOString();

      onDayPress(formatDate(utcDate).date[0]);
      setSelectedDate(utcDate);
    };



    const dayComponent = ({ date, state }: { date: DateData; state: string }) => {
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
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
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
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          locations={[0.49, 1]}
          style={{
            marginVertical: 20,
            borderRadius: 15,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: '100%',
          }}>
          <Calendar
            style={{
              backgroundColor: 'none'
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
            firstDay={0}
            current={selectedDate}
            //@ts-ignore
            dayComponent={dayComponent}
          />
        </LinearGradient>
      </>
    ) : null;
  },
);

const ArrowCalendar = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.arrow}>{children}</View>
);
export default CalendarComponent;
