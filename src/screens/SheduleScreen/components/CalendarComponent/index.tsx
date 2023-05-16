import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'; // Импортируем библиотеку moment для работы с датами

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

    const handleDayPress = (day: DateData) => {
      onDayPress(formatDate(day.dateString).date[0]);
      setSelectedDate(day.dateString);
    };

    const dayComponent = ({ date, state }: { date: DateData; state: string }) => {
      const isSelected = date.dateString === selectedDate;
      const isDisabled = state === 'disabled';
      const isToday = moment().isSame(date.dateString, 'day'); // Проверяем, является ли день сегодняшним

      return (
        <TouchableOpacity onPress={() => !isDisabled && handleDayPress(date)}>
          <LinearGradient
            style={[
              styles.dayContainer,// Применяем оранжевый цвет, если день сегодняшний
            ]}
            colors={
              isSelected
                ? ['#EAAFC8', '#654EA3']
                : isToday ? ['#FFA500', '#FF6347'] : ['transparent', 'transparent']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <Text
              style={[
                styles.dayText,
                isDisabled && styles.disabledText,
                isSelected && styles.dayTextSelected,
                isToday && { color: '#FFFFFF' }, // Применяем белый цвет текста, если день сегодняшний
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