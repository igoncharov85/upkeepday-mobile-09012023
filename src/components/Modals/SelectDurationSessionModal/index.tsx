import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { ScreenHeader } from '../../ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';
import { formatDate } from '../../../services/utils/fullDateToValue.util';
import CustomTimePicker from './CustomTimePicker';
import { NavigationEnum } from '../../../common/constants/navigation';

interface IDurationSessionModalModal {
}
const durationItems = ['00:30', '00:45', '01:00',]
const SelectDurationSessionModal = ({

}: IDurationSessionModalModal) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { onSetDuration, maxDuration, startDateTime, onSetStartTime, onCreateLesson } = route.params as any
  //  { onSetDuration: (time: any) => void, onSetStartTime: (time: any) => void, timeDuration: number, startDateTime: string }
  const goBack = () => navigation.goBack();
  const [timeIsVisible, setTimeIsVisible] = useState(false);
  const [time, setTime] = useState(startDateTime);
  const [startTime, setStartTime] = useState(0);
  const [durations, setDurations] = useState(durationItems);
  const onTimePress = () => setTimeIsVisible(!timeIsVisible);

  const onSetTime = (time: any) => {
    setTime(
      `${time.hour < 10 ? '0' + time.hour : time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute} ${time.dayPart}`
    )
    setStartTime(time.minute)
    onSetStartTime(time.minute)
  }

  const onSelectDuration = (duration: string) => {
    const [hours, minutes] = duration.split(':');
    onSetDuration(Number(hours) * 60 + Number(minutes))

    onCreateLesson(
      {
        duration: Number(hours) * 60 + Number(minutes),
        startDateTime: startTime
      })
    navigation.goBack()
  }
  const goToCreateDuration = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.EDIT_DURATION_CLASS_MODAL, { addDuration })
  }
  const addDuration = (duration: any) => {
    setDurations([...durations, `${duration.hour < 10 ? '0' + duration.hour : duration.hour}:${duration.minute < 10 ? '0' + duration.minute : duration.minute}`])
  }


  const [localTime, meridiem] = time.split(' ');
  const [hours, minutes] = localTime.split(':');
  let numericHours = parseInt(hours);
  if (meridiem === 'AM' && numericHours === 12) numericHours = 0;
  if (meridiem === 'PM' && numericHours !== 12) numericHours += 12;
  const date = new Date();
  date.setHours(Number(numericHours));
  date.setMinutes(Number(minutes));
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity style={styles.background} onPress={goBack} activeOpacity={1} />
        <View style={styles.container}>
          <ScreenHeader text="Add Session details" withBackButton={true} onBackPress={goBack} />
          <InteractivePartItem title="Start Time">
            <TouchableOpacity onPress={onTimePress}>
              <DateItem dateValue={time} />
            </TouchableOpacity>
          </InteractivePartItem>
          <CustomTimePicker
            visible={timeIsVisible}
            data={formatDate(date?.toISOString()).time[1]}
            onSetTime={onSetTime}
            block={
              { hour: false, minute: true, dayPart: false }
            }
          />
          <ScrollView >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 24, marginBottom: 40 }}>
              <Text>Duration</Text>
              <View>
                {durations.map((item) => {

                  const disabled = maxDuration ? Number(item.split(':')[0]) * 60 + Number(item.split(':')[1]) > maxDuration : false
                  return (
                    <TouchableOpacity onPress={disabled ? undefined : () => onSelectDuration(item)} style={{ marginBottom: 20, opacity: disabled ? 0.5 : 1 }}>
                      <DateItem dateValue={item} />
                    </TouchableOpacity>
                  )
                })}


              </View>
              <View style={{ width: 50 }} />
            </View>
            <TouchableOpacity onPress={goToCreateDuration}>
              <Text style={{ fontSize: 14, textDecorationLine: 'underline', textAlign: 'center', }}>Set-up your own duration</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View >
    </>
  );
};
const InteractivePartItem = ({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <View style={styles.interactive}>
      <Text style={styles.interactiveText}>{title}</Text>
      <View style={styles.interactiveChildren}>{children}</View>
    </View>
  );
};

const DateItem = ({ dateValue }: { dateValue: string }) => {

  return (
    <>
      <LinearGradient
        style={styles.dateContainer}
        colors={['rgba(154, 128, 186,0.5)', 'rgba(109,123,152,0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        angle={222.53}
        locations={[0.4978, 1.1474]}>
        <Text style={styles.dateText}>{dateValue}</Text>
      </LinearGradient>
    </>
  )
};

export default SelectDurationSessionModal;
