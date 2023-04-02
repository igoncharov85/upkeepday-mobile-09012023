import {useNavigation} from '@react-navigation/native';
import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Button, Animated} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {ScreenHeader} from '../../components/ScreenHeader';
import {CustomInput} from '../../components/UI/CustomInput';
import {
  calculateEndDate,
  formatDate,
} from '../../services/utils/fullDateToValue.util';
import CalendarComponent from '../SheduleScreen/components/CalendarComponent';
import TimePicker from '../SheduleScreen/components/TimePicker';
import styles from './styles';
enum DateItemType {
  Date = 'date',
  Time = 'time',
}
interface ICancellationScreen {}
export const CancellationScreen: FC<ICancellationScreen> = memo(() => {
  const [allDay, setAllDay] = useState(false);

  const toggleAllDay = () => {
    setAllDay(!allDay);
  };
  useEffect(() => {
    console.log(allDay);
  }, [allDay]);
  const navigation = useNavigation();
  const startTime = '2024-01-17T17:30:00';
  const duration = 1230;
  const endTime = calculateEndDate(startTime, duration);
  return (
    <ScrollView>
      <View style={styles.container}>
        <ScreenHeader
          text={'Cancellation'}
          withBackButton={true}
          onBackPress={() => navigation.goBack()}
        />

        <InteractivePartItem title={'All Day'}>
          <SwitchButton onPress={toggleAllDay} />
        </InteractivePartItem>
        <DateOfChangeItem allDay={allDay} title={'Start'} time={startTime} />
        <DateOfChangeItem allDay={allDay} title={'End'} time={endTime} />

        <CustomInput
          multiline={true}
          numberOfLines={4}
          style={{height: 78, fontSize: 14, fontWeight: '500', lineHeight: 19}}
        />
      </View>
    </ScrollView>
  );
});

const DateOfChangeItem = memo(
  ({allDay, title, time}: {allDay: boolean; title: string; time: string}) => {
    const [timeIsVisible, setTimeIsVisible] = useState(false);
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);

    const onTimePress = () => {
      setTimeIsVisible(!timeIsVisible);
      setCalendarIsVisible(false);
    };
    const onCalendarPress = () => {
      setCalendarIsVisible(!calendarIsVisible);
      setTimeIsVisible(false);
    };
    return (
      <>
        <InteractivePartItem title={title}>
          <TouchableOpacity onPress={onCalendarPress}>
            <DateItem dateValue={formatDate(time).date[0]} />
          </TouchableOpacity>
          {!allDay && (
            <TouchableOpacity onPress={onTimePress}>
              <DateItem dateValue={formatDate(time).time[0]} />
            </TouchableOpacity>
          )}
        </InteractivePartItem>
        <CalendarComponent
          visible={calendarIsVisible}
          date={formatDate(time).date[1]}
        />
        <TimePicker visible={timeIsVisible} />
      </>
    );
  },
);

const InteractivePartItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.interactive}>
      <Text style={styles.interactiveText}>{title}</Text>
      <View style={styles.interactiveChildren}>{children}</View>
    </View>
  );
};

const SwitchButton = ({onPress}: {onPress: () => void}) => {
  const [isMoved, setIsMoved] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const handlePress = () => {
    onPress();
    setIsMoved(!isMoved);
    Animated.timing(animatedValue, {
      toValue: isMoved ? 0 : 32,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    transform: [{translateX: animatedValue}],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.switchButton,
          isMoved
            ? {backgroundColor: '#2ECB9C'}
            : {backgroundColor: 'rgba(165, 175, 196, 0.5)'},
        ]}>
        <Animated.View style={animatedStyle}>
          <View style={styles.switchButtonCircle}></View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const DateItem = ({dateValue}: {dateValue: string}) => (
  <LinearGradient
    style={styles.dateContainer}
    colors={['rgba(154, 128, 186,0.5)', 'rgba(109,123,152,0.5)']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    angle={222.53}
    locations={[0.4978, 1.1474]}>
    <Text style={styles.dateText}>{dateValue}</Text>
  </LinearGradient>
);
