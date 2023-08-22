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

const getDate = (date: any) => {
  return moment(date).toDate().toISOString().split('T')[0]
}

export function checkLessonInOtherLessons(lesson: any, time: Date): boolean {
  const lessonStartTime = moment.utc(lesson.StartDateTime).toDate()
  const lessonEndTime = moment.utc(lesson.StartDateTime).add(lesson.Duration, 'minute').toDate()
  return lessonStartTime < time && time < lessonEndTime;
}
export function checkTimeCoincidence(firstTime: Date, secondTime: Date): boolean {
  return moment(firstTime).toDate().toISOString() === moment(secondTime).toDate().toISOString()
}
interface IEditTimeSessionModalModal { }

const EditTimeSessionModal = ({ }: IEditTimeSessionModalModal) => {
  const { goBack } = useTypedNavigation();
  const route = useRoute();
  const { addDuration, newTime, lesson: currentLesson } = route.params as any;
  const { CurrentScheduledEntries, createCurrentClassRequest } = useAppSelector(state => state.schedule);

  const [time, setTime] = useState({});
  const [canBe, setCanBe] = useState(true);

  const onSetTime = (time: any) => {
    setTime(time);
    setCanBe(onCheckConflictForLessonTime(time));

  };
  const onSave = () => {
    addDuration(time);
    goBack();
  };
  const currentTime = new Date(newTime);

  function canFitLesson(schedule: any[], newLesson: any) {
    const newLessonStartTime = moment(newLesson.StartDateTime).toDate();
    const newLessonEndTime = moment(newLesson.StartDateTime).add(newLesson.Duration, 'minutes').toDate();

    const sameDayLessons = schedule.filter(item => {
      const itemStartTime = moment(item.StartDateTime).toDate();
      const currentTime = moment(currentLesson.StartDateTime).toDate()
      return getDate(itemStartTime) == getDate(newLessonStartTime) && itemStartTime.toISOString() !== currentTime.toISOString();
    });

    for (const lesson of sameDayLessons) {
      const lessonstartTime = moment.utc(lesson.StartDateTime).toDate()
      const lessonEndTime = moment.utc(lesson.StartDateTime).add(lesson.Duration, 'minute').toDate()

      if ((
        checkLessonInOtherLessons(lesson, newLessonStartTime) ||
        checkLessonInOtherLessons(lesson, newLessonEndTime) ||
        checkLessonInOtherLessons(newLesson, lessonstartTime) ||
        checkLessonInOtherLessons(newLesson, lessonEndTime) ||
        checkTimeCoincidence(newLessonStartTime, lessonstartTime) ||
        checkTimeCoincidence(newLessonEndTime, lessonEndTime)
      )) {
        return false
      }

    }

    return true;
  }




  const onCheckConflictForLessonTime = (time: any) => {
    const newLocalTime = moment(newTime).toDate();
    newLocalTime.setSeconds(0);
    newLocalTime.setMinutes(time.minute);
    newLocalTime.setUTCHours(time.dayPart == 'AM' ? time.hour : time.hour + 12);
    if (time.dayPart == 'AM' && time.hour == 12) {
      newLocalTime.setUTCHours(0)
    }

    const conflictLessonCanMove = canFitLesson(CurrentScheduledEntries, {
      StartDateTime: newLocalTime,
      Duration: currentLesson.Duration,
    })
    const currentLessonCanMove = canFitLesson(createCurrentClassRequest.Sessions, {
      StartDateTime: newLocalTime,
      Duration: currentLesson.Duration,
    })
    console.log("поиск по зебре дал результат:", !currentLessonCanMove);
    console.log("поиск по текушим занятиям дал результат:", !conflictLessonCanMove);

    return (currentLessonCanMove && conflictLessonCanMove)
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
          <Text style={{ fontWeight: '700', textAlign: 'center' }}>{moment(newTime).format('dddd, M/D/YYYY')}</Text>
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
