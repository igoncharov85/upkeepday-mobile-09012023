import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TimeLineLeft from '../../../../../assets/svg/TimeLineLeft';
import TimeLineRight from '../../../../../assets/svg/TimeLineRight';
import styles from './styles';

interface ITimeData {
  hour: number;
  minute: number;
  dayPart: string
}
interface IItemPickerBlock {
  hour: boolean;
  minute: boolean;
  dayPart: boolean
}
interface ITimePicker {
  onSetTime: (time: any) => void;
  data: ITimeData;
  maxDuration: number
}
const CustomTimePicker: React.FC<ITimePicker> = ({ data, onSetTime, maxDuration }) => {
  const [hour, setHour] = useState(data.hour || 0);
  const [minute, setMinute] = useState(data.minute || 0);
  const [dayPart, setDayPart] = useState(data.dayPart || 0);

  const onHourChange = (hourValue: number) =>
    setHour(hourValue)

  const onMinuteChange = (minuteValue: number) =>
    setMinute(minuteValue)

  const onDayPartChange = (dayPartValue: number) => setDayPart(dayPartValue == 0 ? 'AM' : 'PM')

  const stipulationForHour = () => {
    if (maxDuration % 60 < minute) {
      return Math.floor(maxDuration / 60) - 1
    }
    return Math.floor(maxDuration / 60)
  }
  const stipulationForMinute = () => {
    if (Math.floor(maxDuration / 60) == hour) {
      return maxDuration % 60
    }
    return 60
  }
  useEffect(() => {
    onSetTime({
      hour,
      minute,
      dayPart
    });

  }, [hour, minute, dayPart])
  return (
    <LinearGradient
      colors={['rgba(109,123,152,0.17)', 'rgba(109,123,152,0.17)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      angle={225.33}
      locations={[0.0376, 0.9878]}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 256,
        borderRadius: 16,
        marginVertical: 20,
      }}>
      <TimeLineLeft />
      <ItemPicker items={[...Array(13)].map((_, i) => i > 9 ? i : `0${i}`)} activeIndex={hour + 1} onChange={onHourChange} stipulation={stipulationForHour} />

      <ItemPicker items={[...Array(60)].map((_, i) => i > 9 ? i : `0${i}`)} activeIndex={minute + 1} onChange={onMinuteChange} stipulation={stipulationForMinute} />
      <ItemPicker items={['AM', 'PM']} activeIndex={dayPart == 'AM' ? 1 : 2} onChange={onDayPartChange} />

      <TimeLineRight />
    </LinearGradient>
  );
};
const ItemPicker = memo(({ items, activeIndex, onChange, stipulation }: { items: any[], activeIndex?: number; onChange: (value: any) => void, stipulation?: any }) => {

  const [selectedIndex, setSelectedIndex] = useState(activeIndex ? activeIndex - 1 : 0);
  const scrollViewRef = useRef(null);

  const handleScroll = useCallback(() => (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    setSelectedIndex(index);
    onChange(index);
  }, [selectedIndex]);

  const handleItemPress = (index: number) => {
    setSelectedIndex(index);
    onChange(index);
    //@ts-ignore
    scrollViewRef.current?.scrollTo({
      y: index * 50,
      animated: true,
    });
  };
  useEffect(() => {
    //@ts-ignore
    scrollViewRef.current?.scrollTo({
      y: selectedIndex * 50,
      animated: true,
    });
  }, [selectedIndex])
  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          contentOffset={{ x: 0, y: selectedIndex * 50 }}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => handleItemPress(index)}>
              <Text
                style={[
                  styles.itemText,
                  index === selectedIndex && styles.selectedItemText,

                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
});

export default CustomTimePicker;
