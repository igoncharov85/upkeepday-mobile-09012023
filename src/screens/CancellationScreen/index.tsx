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
import { deleteScheduleByPeriodAction, fetchScheduleByPeriodAction } from '../../store/shedule/actions';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { NavigationEnum } from '../../common/constants/navigation';
import { convertLocalToUTC } from '../../services/utils/convertToUTC';
import moment from 'moment';

interface RouteParams {
  itemData?: any;
}
interface ICancellationScreen { }
export const CancellationScreen: FC<ICancellationScreen> = memo(() => {
  const { navigate, goBack } = useTypedNavigation()
  const route = useRoute();
  const { itemData } = route.params as RouteParams;
  const startTime = itemData.StartDateTime ? itemData.StartDateTime as string : new Date().toISOString();
  const duration = itemData.Duration || 0;
  const endTime = calculateEndDate(startTime, duration);

  const [startDate, setStartDate] = useState(startTime);
  const [endDate, setEndDate] = useState(endTime)
  const [allDay, setAllDay] = useState(!itemData.StartDateTime);


  const onSetStartTime = (startDate: string) => {
    setStartDate(startDate)
    if (startDate > endDate) {
      setEndDate(startDate)
    }
  }

  const onSetEndTime = (endDate: string) => setEndDate(endDate)

  const handleSubmit = () => {
    // //@ts-ignore
    // dispatch(deleteScheduleByPeriodAction({ startDate: startDate, endDate: endDate, AllDay: allDay }));
    navigate(NavigationEnum.CONFIRM_CANCELLATION_SCREEN, {
      startDate,
      endDate,
      allDay
    })
    console.log('startDate', startDate,
      moment(startDate).utc(),)
    console.log('endDate', endDate,
      moment(endDate).utc(),)
    dispatch(fetchScheduleByPeriodAction({ startDate: moment(startDate).utc().toISOString(), endDate: endDate }));


    // goBack()
  }
  const toggleAllDay = () => setAllDay(!allDay);
  useEffect(() => {
    const startTime = itemData.StartDateTime ? itemData.StartDateTime as string : new Date().toISOString();
    const endTime = calculateEndDate(startTime, duration);

    setStartDate(startTime);
    setEndDate(endTime);
  }, []);
  useEffect(() => {

  }, [startDate, endDate, allDay]);
  return (
    <View style={styles.container}>
      <ScreenHeader
        text={'Cancellation'}
        withBackButton={true}
        onBackPress={() => goBack()}
      />

      <InteractivePartItem title={'All Day'}>
        <SwitchButton onPress={toggleAllDay} active={allDay} />
      </InteractivePartItem>
      <DateOfChangeItem allDay={allDay} title={'Start'} time={startDate} setResultData={onSetStartTime} />
      <DateOfChangeItem allDay={allDay} title={'End'} time={endDate} setResultData={onSetEndTime} />

      <View style={styles.finishBtn}>
        <CustomButton text={'Cancel Session(s)'} onPress={handleSubmit} />
      </View>
    </View>
  );
});




const DateOfChangeItem =
  ({ allDay, title, time, setResultData }: { allDay: boolean; title: string; time: string, setResultData: (data: string) => void }) => {
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


    useEffect(() => {
      setCurrentTime(formatDate(time).time[0])
      setCurrentDate(formatDate(time).date[0])
    }, [])

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
  };

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

const SwitchButton = ({ onPress, active }: { onPress: () => void; active: boolean }) => {
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
  useEffect(() => {
    if (active) {
      setIsMoved(!isMoved);
      Animated.timing(animatedValue, {
        toValue: isMoved ? 0 : 32,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

  }, []);
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
