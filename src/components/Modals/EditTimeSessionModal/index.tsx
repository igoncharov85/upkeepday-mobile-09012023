import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { CustomButton } from '../../UI/CustomButton';
import { ScreenHeader } from '../../ScreenHeader';
import CustomTimePicker from './CustomTimePicker';
import { useAppSelector } from '../../../store/hooks';
import moment from 'moment';

interface IEditTimeSessionModalModal {
}

const EditTimeSessionModal = ({

}: IEditTimeSessionModalModal) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { addDuration, newTime, lesson } = route.params as any
  const { GeneratedScheduleEntries } = useAppSelector(state => state.schedule);
  const goBack = () => navigation.goBack();
  const [time, setTime] = useState({});
  const [canBe, setCanBe] = useState(true)

  const onSetTime = (time: any) => {
    setTime(time)
    setCanBe(findNextLesson(time))
  }
  const onSave = () => {
    addDuration(time)
    goBack()
  }
  const currentTime = new Date(newTime);

  function canFitLesson(schedule: any[], newLesson: any) {
    const newLessonStartTime = new Date(newLesson.StartDateTime);
    const newLessonEndTime = new Date(newLesson.StartDateTime);
    newLessonEndTime.setMinutes(newLessonEndTime.getMinutes() + newLesson.Duration);

    const sameDayLessons = schedule.filter(item => {
      const itemStartTime = new Date(item.StartDateTime);
      return (
        itemStartTime.toDateString() === newLessonStartTime.toDateString()
      );
    });
    console.log('sameDayLessons', sameDayLessons, '\n----------------------')
    for (const lesson of sameDayLessons) {
      const lessonStartTime = new Date(lesson.StartDateTime);
      const lessonEndTime = new Date(lesson.StartDateTime);
      lessonEndTime.setMinutes(lessonEndTime.getMinutes() + lesson.Duration);
      console.log()
      console.log('\nnewLessonStartTime: ', newLessonStartTime,
        '\nnewLessonEndTime: ', newLessonEndTime,
        '\n++++++++++++++++++++++++\nlessonStartTime: ', lessonStartTime,
        '\nlessonEndTime: ', lessonEndTime


      )

      if (
        (newLessonStartTime >= lessonStartTime && newLessonStartTime < lessonEndTime) ||
        (newLessonEndTime > lessonStartTime && newLessonEndTime <= lessonEndTime)
      ) {
        return false;
      }
    }

    return true;
  }

  const findNextLesson = (time: any) => {
    const newLocalTime = moment(newTime).toDate();
    newLocalTime.setSeconds(0)
    newLocalTime.setMinutes(time.minute)
    newLocalTime.setUTCHours(time.dayPart == "AM" ? time.hour : time.hour + 12)
    console.log('can be: ', canFitLesson(GeneratedScheduleEntries, { StartDateTime: newLocalTime, Duration: lesson.Duration }))
    return canFitLesson(GeneratedScheduleEntries, { StartDateTime: newLocalTime, Duration: lesson.Duration })
  }

  useEffect(() => {
    // console.log('-----------------')
    GeneratedScheduleEntries.forEach((item) => {
      if (moment(newTime).date() == moment(item.StartDateTime).date()) {
        // console.log('item', item)
      }
    })
    // console.log('------ lesson end ------')
  }, [GeneratedScheduleEntries])
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity style={styles.background} onPress={goBack} activeOpacity={1} />
        <View style={styles.container}>
          <ScreenHeader text="Set start time" withBackButton={true} onBackPress={goBack} />
          <CustomTimePicker
            onSetTime={onSetTime}
            data={{ hour: currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours(), minute: currentTime.getMinutes(), dayPart: currentTime.getHours() > 12 ? "PM" : 'AM' }}
            maxDuration={1600}
          />
          {!canBe && <Text style={styles.textConflict}>You have a conflict</Text>}
          <CustomButton text="Save" onPress={onSave} disabled={!canBe} />
        </View>
      </View>
    </>
  );
};

export default EditTimeSessionModal;
