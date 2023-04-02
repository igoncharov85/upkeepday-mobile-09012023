import React, {useState, useRef, useEffect} from 'react';
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

const TimePicker = ({visible}: {visible: boolean}) => {
  return visible ? (
    <LinearGradient
      colors={['rgba(109,123,152,0.17)', 'rgba(109,123,152,0.17)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
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
      <ItemPicker items={[...Array(12)].map((_, i) => i + 1)} />

      <ItemPicker items={[...Array(60)].map((_, i) => i + 1)} />

      <ItemPicker items={['AM', 'PM']} />
      <TimeLineRight />
    </LinearGradient>
  ) : null;
};
const ItemPicker = ({items}: {items: any[]}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / 50);
    setSelectedIndex(index);
  };

  const handleItemPress = (index: number) => {
    setSelectedIndex(index);
    //@ts-ignore
    scrollViewRef.current?.scrollTo({
      y: index * 50,
      animated: true,
    });
  };

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
};

export default TimePicker;
