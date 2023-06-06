import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Animated, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomInput } from '../../components/UI/CustomInput';
import {
  calculateEndDate,
  convertDateTimeToISO,
  formatDate,
} from '../../services/utils/fullDateToValue.util';
import CalendarComponent from '../SheduleScreen/components/CalendarComponent';
import TimePicker from '../SheduleScreen/components/TimePicker';
import styles from './styles';
import { MessageBlock } from './components/MessageBlock';
import { CustomButton } from '../../components/UI/CustomButton';
import { IScheduleItem } from '../../common/types/schedule.types';
import { dispatch } from '../../store/store';
import { deleteScheduleByPeriodAction } from '../../store/shedule/actions';

interface RouteParams {
  itemData: IScheduleItem;
}
interface ICancellationScreen { }
export const CancellationScreen: FC<ICancellationScreen> = memo(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemData } = route.params as RouteParams;

  const startTime = itemData.StartDateTime ? itemData.StartDateTime as string : new Date().toISOString();
  const duration = itemData.Duration;
  const endTime = calculateEndDate(startTime, duration);

  const [startDate, setStartDate] = useState(startTime);
  const [endDate, setEndDate] = useState(endTime)
  const [allDay, setAllDay] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const onSetStartTime = (startDate: string) => setStartDate(startDate)

  const onSetEndTime = (endDate: string) => setEndDate(endDate)


  const onConfirmPress = () => setMessageVisible(true)

  const handleSubmit = () => {
    // If you transfer the data in the format "2023-04-12" then everything is okay 
    dispatch(deleteScheduleByPeriodAction({ startDate: startDate, endDate: endDate }));
    navigation.goBack()
  }
  const toggleAllDay = () => setAllDay(!allDay);
  const toggleButtonDisabled = () => setButtonDisabled(true);

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        paddingVertical: 20,
      }}>
      <View style={styles.container}>
        <ScreenHeader
          text={'Cancellation'}
          withBackButton={true}
          onBackPress={() => navigation.goBack()}
        />

        <InteractivePartItem title={'All Day'}>
          <SwitchButton onPress={toggleAllDay} />
        </InteractivePartItem>
        <DateOfChangeItem allDay={allDay} title={'Start'} time={startTime} setResultData={onSetStartTime} />
        <DateOfChangeItem allDay={allDay} title={'End'} time={endTime} setResultData={onSetEndTime} />

        <TouchableOpacity style={styles.confirm} onPress={onConfirmPress}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
        {messageVisible && (
          <>
            <View style={{ flex: 1 }} />
            <Text style={styles.notification}>
              CP will send automatic notification. However, you can customize the
              message below.
            </Text>
            <MessageBlock toggleButtonDisabled={toggleButtonDisabled} />
            <View style={styles.finishBtn}>
              <CustomButton text={'Finish'} onPress={handleSubmit} disabled={!buttonDisabled} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
});




const DateOfChangeItem =
  memo(({ allDay, title, time, setResultData }: { allDay: boolean; title: string; time: string, setResultData: (data: string) => void }) => {
    const [timeIsVisible, setTimeIsVisible] = useState(false);

    const [currentTime, setCurrentTime] = useState(formatDate(time).time[0])
    const [currentDate, setCurrentDate] = useState(formatDate(time).date[0])
    const [calendarIsVisible, setCalendarIsVisible] = useState(false);

    const onTimePress = () => {
      setTimeIsVisible(!timeIsVisible);
      setCalendarIsVisible(false);
    };
    const onCalendarPress = () => {
      setCalendarIsVisible(!calendarIsVisible);
      setTimeIsVisible(false);
    };


    const onSetTime = (time: string) => {
      setCurrentTime(time)
    }
    const onSetDate = (time: string) => {
      setCurrentDate(time)
      onCalendarPress()

    }
    useEffect(() => {
      setResultData(convertDateTimeToISO({ date: currentDate, time: allDay ? null : currentTime }))
    }, [currentDate, currentTime])
    return (
      <>
        <InteractivePartItem title={title}>
          <TouchableOpacity onPress={onCalendarPress}>
            <DateItem dateValue={currentDate} />
          </TouchableOpacity>
          {!allDay && (
            <TouchableOpacity onPress={onTimePress}>
              <DateItem dateValue={currentTime} />
            </TouchableOpacity>
          )}
        </InteractivePartItem>
        <CalendarComponent
          visible={calendarIsVisible}
          date={formatDate(time).date[1]}
          onDayPress={onSetDate}
        />
        <TimePicker
          visible={!allDay && timeIsVisible}
          data={formatDate(time).time[1]}
          onSetTime={onSetTime} />
      </>
    );
  });

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

const SwitchButton = ({ onPress }: { onPress: () => void }) => {
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
    transform: [{ translateX: animatedValue }],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.switchButton,
          isMoved
            ? { backgroundColor: '#2ECB9C' }
            : { backgroundColor: 'rgba(165, 175, 196, 0.5)' },
        ]}>
        <Animated.View style={animatedStyle}>
          <View style={styles.switchButtonCircle}></View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const DateItem = ({ dateValue }: { dateValue: string }) => (
  <LinearGradient
    style={styles.dateContainer}
    colors={['rgba(154, 128, 186,0.5)', 'rgba(109,123,152,0.5)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    angle={222.53}
    locations={[0.4978, 1.1474]}>
    <Text style={styles.dateText}>{dateValue}</Text>
  </LinearGradient>
);
