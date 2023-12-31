import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationEnum } from '../../../common/constants/navigation'
import { formatDate } from '../../../services/utils/fullDateToValue.util'
import { durationAction } from '../../../store/duration/durationSlice'
import { ScreenHeader } from '../../ScreenHeader'
import CustomTimePicker from './CustomTimePicker'

import styles from './styles'

interface IDurationSessionModalModal {
}
interface RouteParams {
  maxDuration: number;
  startDateTime: string;
  onCreateLesson: ({ duration, startDateTime }: { duration: number, startDateTime: number }) => void;
}
const SelectDurationSessionModal = ({

}: IDurationSessionModalModal) => {
  const navigation = useNavigation()
  const route = useRoute()
  const durationItems = useSelector((state: any) => state.duration) as string[]
  const { maxDuration, startDateTime, onCreateLesson } = route.params as RouteParams
  const goBack = () => navigation.goBack();
  const [timeIsVisible, setTimeIsVisible] = useState(false);
  const [time, setTime] = useState(startDateTime);
  const [startTime, setStartTime] = useState(0);
  const [durations, setDurations] = useState(durationItems);
  const [duration, setDuration] = useState(maxDuration);
  const dispatch = useDispatch()
  const onTimePress = () => setTimeIsVisible(!timeIsVisible);

  const onSetTime = (time: any) => {
    setTime(
      `${time.hour < 10 ? '0' + time.hour : time.hour}:${time.minute < 10 ? '0' + time.minute : time.minute} ${time.dayPart}`
    )
    setStartTime(time.minute)
    setDuration(maxDuration - (time.minute - +startDateTime.split(':')[1]));
  }

  const onSelectDuration = (duration: string) => {
    const [hours, minutes] = duration.split(':');
    // onSetDuration(Number(hours) * 60 + Number(minutes))

    onCreateLesson(
      {
        duration: Number(hours) * 60 + Number(minutes),
        startDateTime: startTime
      })
    navigation.goBack()
  }
  const goToCreateDuration = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.EDIT_DURATION_CLASS_MODAL, { addDuration, duration })
  }
  const addDuration = (duration: any) => {
    const newDuration = `${duration.hour < 10 ? '0' + duration.hour : duration.hour}:${duration.minute < 10 ? '0' + duration.minute : duration.minute}`
    durations.includes(newDuration)
    if (!durations.includes(newDuration)) {
      dispatch(durationAction.setDuration(
        [...durations, newDuration]
      ))
      setDurations([...durations, `${duration.hour < 10 ? '0' + duration.hour : duration.hour}:${duration.minute < 10 ? '0' + duration.minute : duration.minute}`])
    }
  }


  const [localTime, meridiem] = time.split(' ');
  const [hours, minutes] = localTime.split(':');
  let numericHours = parseInt(hours);
  if (meridiem === 'AM' && numericHours === 12) numericHours = 0;
  if (meridiem === 'PM' && numericHours !== 12) numericHours += 12;
  const date = new Date();
  date.setHours(Number(numericHours));
  date.setMinutes(Number(minutes));


  useEffect(() => {

  }, [startTime, duration])
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity style={styles.background} onPress={goBack} activeOpacity={1} />
        <View style={styles.container}>
          <ScreenHeader text="Start Time and Duration" withBackButton={true} onBackPress={goBack} />
          <InteractivePartItem title="Start Time">
            <DateItem dateValue={time} onSubmit={onTimePress} />
          </InteractivePartItem>
          <CustomTimePicker
            visible={timeIsVisible}
            data={formatDate(date?.toISOString()).time[1]}
            onSetTime={onSetTime}
            block={
              { hour: false, minute: true, dayPart: false }
            }
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 24, marginBottom: 10 }}>
            <Text>Duration</Text>
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {durations.slice()
                  .sort(
                    (a, b) => Number(a.split(':')[0]) * 60 + Number(a.split(':')[1]) - (Number(b.split(':')[0]) * 60 + Number(b.split(':')[1]))
                  )
                  .map((item) => {

                    const disabled = duration ? Number(item.split(':')[0]) * 60 + Number(item.split(':')[1]) > duration : false
                    return (
                      <View style={{ marginBottom: 20, opacity: disabled ? 0.5 : 1 }}>
                        <DateItem dateValue={item} onSubmit={disabled ? undefined : () => onSelectDuration(item)} disabled={disabled} />
                      </View>

                    )
                  })}


              </ScrollView>
            </View>
            <View style={{ width: 50 }} />
          </View>
          <TouchableOpacity onPress={goToCreateDuration}>
            <Text style={{ fontSize: 14, textDecorationLine: 'underline', textAlign: 'center', marginBottom: 20 }}>Set-up your own duration</Text>
          </TouchableOpacity>
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

const DateItem = ({ dateValue, onSubmit, disabled }: { dateValue: string, onSubmit: any, disabled?: boolean }) => {

  return (
    <TouchableOpacity onPress={onSubmit} style={{ zIndex: 9 }}>
      <LinearGradient
        style={styles.dateContainer}
        colors={['rgba(154, 128, 186,0.5)', 'rgba(109,123,152,0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        angle={222.53}
        locations={[0.0376, 0.9878]}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{dateValue}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
};

export default SelectDurationSessionModal;
