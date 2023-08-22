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
interface IEditTimeSessionModalModal { }

const EditTimeSessionModal = ({ }: IEditTimeSessionModalModal) => {
  const { goBack } = useTypedNavigation();
  const route = useRoute();
  const { addDuration, newTime, lesson: currentLesson } = route.params as any;
  const { GeneratedScheduleEntries, CurrentScheduledEntries, createCurrentClassRequest } = useAppSelector(state => state.schedule);

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
        // console.log('начало занятия находить в класе', checkLessonInOtherLessons(lesson, newLessonStartTime))
        // console.log('конец занятия находить в класе', checkLessonInOtherLessons(lesson, newLessonEndTime))
        // console.log('начало класса находить в занятии', checkLessonInOtherLessons(newLesson, lessonstartTime))
        // console.log('конец класса находить в занятии', checkLessonInOtherLessons(newLesson, lessonEndTime))
        // console.log('начало класса совпадает с началом занятии', checkTimeCoincidence(newLessonStartTime, lessonstartTime))
        // console.log('конец класса совпадает с концом занятии', checkTimeCoincidence(newLessonEndTime, lessonEndTime))
        return false
      }

    }

    return true;
  }


  function checkLessonInOtherLessons(lesson: any, time: Date): boolean {
    const lessonStartTime = moment.utc(lesson.StartDateTime).toDate()
    const lessonEndTime = moment.utc(lesson.StartDateTime).add(lesson.Duration, 'minute').toDate()
    return lessonStartTime < time && time < lessonEndTime;
  }
  function checkTimeCoincidence(firstTime: Date, secondTime: Date): boolean {
    return moment(firstTime).toDate().toISOString() === moment(secondTime).toDate().toISOString()
  }

  const findNextLesson = (time: any) => {
    const newLocalTime = moment(newTime).toDate();
    newLocalTime.setSeconds(0);
    newLocalTime.setMinutes(time.minute);
    newLocalTime.setUTCHours(time.dayPart == 'AM' ? time.hour : time.hour + 12);


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
