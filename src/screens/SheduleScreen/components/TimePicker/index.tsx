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

interface ITimePicker {
  visible: boolean;
  onSetTime: (time: string) => void;
  data: ITimeData;
}
const TimePicker: React.FC<ITimePicker> = ({ visible, data, onSetTime }) => {
  const [hour, setHour] = useState(data.hour);
  const [minute, setMinute] = useState(data.minute);
  const [dayPart, setDayPart] = useState(data.dayPart);

  const onHourChange = (hourValue: number) =>
    setHour(hourValue + 1)

  const onMinuteChange = (minuteValue: number) =>
    setMinute(minuteValue + 1)

  const onDayPartChange = (dayPartValue: number) =>

    setDayPart(dayPartValue == 0 ? 'AM' : 'PM')
  useEffect(() => {
    onSetTime(`${hour}:${minute} ${dayPart}`);

  }, [hour, minute, dayPart])
  return visible ? (
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
      <ItemPicker items={[...Array(12)].map((_, i) => i + 1)} activeIndex={data.hour} onChange={onHourChange} />

      <ItemPicker items={[...Array(60)].map((_, i) => i + 1)} activeIndex={data.minute} onChange={onMinuteChange} />

      <ItemPicker items={['AM', 'PM']} activeIndex={data.dayPart == 'AM' ? 1 : 2} onChange={onDayPartChange} />
      <TimeLineRight />
    </LinearGradient>
  ) : null;
};
const ItemPicker = memo(({ items, activeIndex, onChange }: { items: any[], activeIndex?: number; onChange: (value: any) => void }) => {

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
          ref={scrollViewRef}
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

export default TimePicker;
