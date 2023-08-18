import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTypedNavigation } from '../../../hook/useTypedNavigation';
import { useAppSelector } from '../../../store/hooks';
import { ScreenHeader } from '../../ScreenHeader';
import { CustomButton } from '../../UI/CustomButton';
import CustomTimePicker from './CustomTimePicker';

import styles from './styles';
import { convertToLocaleTime } from '../../../services/utils/convertToUTC';

interface IEditTimeSessionModalModal { }

const EditTimeSessionModal = ({ }: IEditTimeSessionModalModal) => {
  const { goBack } = useTypedNavigation();
  const route = useRoute();
  const { addDuration, newTime, lesson } = route.params as any;
  const { GeneratedScheduleEntries } = useAppSelector(state => state.schedule);
  const [time, setTime] = useState({});
  const [canBe, setCanBe] = useState(true);

  const onSetTime = (time: any) => {
    setTime(time);
    setCanBe(findNextLesson(time));
  };
  const onSave = () => {
    addDuration(time);
    goBack();
  };
  const currentTime = new Date(newTime);

  function canFitLesson(schedule: any[], newLesson: any) {
    const newLessonStartTime = moment(newLesson.StartDateTime).toDate();
    const newLessonEndTime = moment(newLesson.StartDateTime).toDate();
    newLessonEndTime.setMinutes(
      newLessonEndTime.getMinutes() + newLesson.Duration,
    );

    const sameDayLessons = convertToLocaleTime(schedule).filter(item => {
      const itemStartTime = new Date(item.StartDateTime);
      const itemEndTime = new Date(item.StartDateTime)
      itemEndTime.setMinutes(
        newLessonEndTime.getMinutes() + item.Duration,
      );
      return itemStartTime.toDateString() === newLessonStartTime.toDateString();
    });
    for (const lesson of sameDayLessons) {
      const lessonStartTime = moment(lesson.StartDateTime).toDate()
      const lessonEndTime = new Date(lesson.StartDateTime);
      lessonEndTime.setMinutes(lessonEndTime.getMinutes() + lesson.Duration);
      return checkScheduleConflict({ start: newLessonStartTime, end: newLessonEndTime }, { start: lessonStartTime, end: lessonEndTime })
    }

    return true;
  }
  function checkScheduleConflict(lesson1: any, lesson2: any) {
    const startTime1 = new Date(lesson1.start);
    const endTime1 = new Date(lesson1.end);
    const startTime2 = new Date(lesson2.start);
    const endTime2 = new Date(lesson2.end);

    if (startTime1 < endTime2 && startTime2 < endTime1) {
      return false;
    }

    return true;
  }
  const findNextLesson = (time: any) => {
    const newLocalTime = moment(newTime).toDate();
    newLocalTime.setSeconds(0);
    newLocalTime.setMinutes(time.minute);
    newLocalTime.setUTCHours(time.dayPart == 'AM' ? time.hour : time.hour + 12);
    return canFitLesson(GeneratedScheduleEntries, {
      StartDateTime: newLocalTime,
      Duration: lesson.Duration,
    });
  };


  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity
          style={styles.background}
          onPress={goBack}
          activeOpacity={1}
        />
        <View style={styles.container}>
          <ScreenHeader
            text="Set start time"
            withBackButton={true}
            onBackPress={goBack}
          />
          <CustomTimePicker
            onSetTime={onSetTime}
            data={{
              hour:
                currentTime.getHours() > 12
                  ? currentTime.getHours() - 12
                  : currentTime.getHours(),
              minute: currentTime.getMinutes(),
              dayPart: currentTime.getHours() >= 12 ? 'PM' : 'AM',
            }}
            maxDuration={1600}
          />
          {!canBe && (
            <Text style={styles.textConflict}>You have a conflict</Text>
          )}
          <CustomButton text="Save" onPress={onSave} disabled={!canBe} />
        </View>
      </View>
    </>
  );
};

export default EditTimeSessionModal;
