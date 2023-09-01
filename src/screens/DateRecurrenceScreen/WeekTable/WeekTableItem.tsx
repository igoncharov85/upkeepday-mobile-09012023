import React, { FC, memo, useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';

type Interval = {
  start: string;
  end: string;
};
export function findNextElement(array: any[], targetElement: any) {
  array.sort((a, b) => {
    const timeA = a.start.split(':').map(Number);
    const timeB = b.start.split(':').map(Number);

    if (timeA[0] === timeB[0]) {
      return timeA[1] - timeB[1];
    }

    return timeA[0] - timeB[0];
  });

  let previousElement = null;
  let nextElement = null;

  for (const currentElement of array) {
    const currentTime = currentElement.start.split(':').map(Number);
    const targetTime = targetElement.end.split(':').map(Number);

    if (
      currentTime[0] > targetTime[0] ||
      (currentTime[0] === targetTime[0] && currentTime[1] > targetTime[1])
    ) {
      nextElement = currentElement;
      break;
    }

    previousElement = currentElement;
  }

  return {
    previousElement,
    nextElement,
  };
}


function subtractTime(time1: string, time2: string) {
  let [hours1, minutes1] = time1.split(":");
  let [hours2, minutes2] = time2.split(":");
  const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
  const totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);

  var differenceInMinutes = totalMinutes1 - totalMinutes2;

  return differenceInMinutes;
}

function toMinutes(time: string) {
  let minutes = time.split(":")[1];
  return parseInt(minutes);
}

enum TypeSession {
  lesson,
  trial,
}
enum TimeDuration {
  HalfHour = 30,
  ThreeQuarterHour = 45,
  OneHour = 60,
  OneAndAHalfHours = 90,
}
interface IWeekTableItem {
  timeDuration?: number;
  typeSession?: TypeSession | [TypeSession, TypeSession];
  dayOfWeek: number;
  timeIndex: number;
  onHandleClick: (slot: IWeekTimeSlot) => void;
  activeItem?: boolean;
  daySchedule: IWeekTimeSlot[]
}

function convertArray(inputArray: any[]) {
  const outputArray = [];
  if (inputArray.length > 0) {
    for (let i = 0; i < inputArray.length; i++) {
      const item = inputArray[i];
      const startTime = item.StartTime?.split(':');
      const startHours = parseInt(startTime[0]);
      const startMinutes = parseInt(startTime[1]);
      const durationMinutes = item.Duration || 60;

      let endHours = startHours + Math.floor((startMinutes + durationMinutes) / 60);
      let endMinutes = (startMinutes + durationMinutes) % 60;

      // Обработка некорректных значений времени
      if (endMinutes >= 60) {
        endMinutes = 59;
      }

      const formattedStartMinutes = (startMinutes < 10) ? `0${startMinutes}` : startMinutes;
      const formattedEndMinutes = (endMinutes < 10) ? `0${endMinutes}` : endMinutes;

      const newItem = {
        start: `${startHours}:${formattedStartMinutes}`,
        end: `${endHours}:${formattedEndMinutes}`
      };

      outputArray.push(newItem);
    }
  }
  return outputArray;
}

export const WeekTableItem: FC<IWeekTableItem> =
  ({
    timeDuration = TimeDuration.OneHour,
    typeSession = TypeSession.lesson,
    timeIndex,
    dayOfWeek,
    onHandleClick,
    activeItem = false,
    daySchedule

  }) => {

    LogBox.ignoreAllLogs();
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [active, setActive] = useState(activeItem)
    const colorsLesson = ['#EAAFC8', '#654EA3'];
    const startDateTime = `${timeIndex}:00:00`
    const [lessons, setLessons] = useState(convertArray(daySchedule) as any[]);



    const onCreateLesson = (lesson: any) => {
      const hour = 60;
      const startTime = `${timeIndex}:${lesson.startDateTime > 9 ? lesson.startDateTime : `0${lesson.startDateTime}`}`
      const endTime = `${timeIndex + Math.floor((lesson.startDateTime + lesson.duration) / hour)}:${(lesson.startDateTime + lesson.duration) % hour}`;
      setLessons([...lessons, {
        start: startTime,
        end: endTime
      }])

      onHandleClick({
        Duration: lesson.duration,
        DayOfWeek: dayOfWeek,
        StartTime: startTime,
      })
    }
    useEffect(() => {
      daySchedule.length && console.log(daySchedule)
    }, [daySchedule])

    const onHandleSlot = (event: any) => {
      const { locationX, locationY } = event.nativeEvent;

      const userTouchMinute = locationY / 64 * 60
      const prevLesson = findNextElement(convertArray(daySchedule), { start: `${timeIndex}:59`, end: `${timeIndex}:59` }).previousElement || { start: '00:00', end: '00:00' };
      const nextLesson = findNextElement(convertArray(daySchedule), { start: `${timeIndex}:0`, end: `${timeIndex}:0` }).nextElement || { start: '23:59', end: '23:59' };

      const partiallyOccupied = prevLesson.end.split(':')[0] >= timeIndex && +prevLesson.end.split(':')[1] > userTouchMinute
      const fullyOccupied = prevLesson.end.split(':')[0] > timeIndex
      if (fullyOccupied) {
        console.log('delete')
        onHandleClick({
          Duration: subtractTime(prevLesson.end, prevLesson.start),
          DayOfWeek: dayOfWeek,
          StartTime: prevLesson.start,
        })
        return
      }
      const prevLessonIsCurrentField = prevLesson.end.split(':')[0] == timeIndex
      const clickInPrevLesson = prevLesson.end.split(':')[1] > locationY
      if (clickInPrevLesson && prevLessonIsCurrentField) {
        onHandleClick({
          Duration: subtractTime(prevLesson.end, prevLesson.start),
          DayOfWeek: dayOfWeek,
          StartTime: prevLesson.start,
        })
      } else if (!clickInPrevLesson && prevLessonIsCurrentField) {
        // @ts-ignore
        navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
          timeDuration,
          startDateTime: prevLesson.end,
          onCreateLesson,
          maxDuration: subtractTime(nextLesson?.start, `${timeIndex}:0`),
        })

      } else {
        // @ts-ignore
        navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
          timeDuration,
          startDateTime,
          onCreateLesson,
          maxDuration: subtractTime(nextLesson?.start, `${timeIndex}:0`),
        })
      }
    }


    const onCreateMoreLesson = (event: any, item: any, type: string) => {
      const { locationX, locationY } = event.nativeEvent;
      ;


      let nextLesson: any, prevLesson: any, startTime;
      lessons.sort((a, b) => {
        const dateA = new Date(0, 0, 0, ...a.start.split(":").map(Number));
        const dateB = new Date(0, 0, 0, ...b.start.split(":").map(Number));
        const dateAEnd = new Date(0, 0, 0, ...a.end.split(":").map(Number));
        const dateBEnd = new Date(0, 0, 0, ...b.end.split(":").map(Number));
        //@ts-ignore
        return dateA - dateB || dateAEnd - dateBEnd;
      }).forEach((lesson, index) => {
        if (lesson.start === item.start) {
          prevLesson = item
          nextLesson = lessons[index + 1]
        }
      })
      if (type == 'before') {
        startTime = `${timeIndex}:00`
        const prevLessonGlobal = findNextElement(convertArray(daySchedule), { start: item.start, end: item.end }).previousElement

      }
      else if (prevLesson) {
        startTime = prevLesson.end
      } else if (type === 'after') {
        startTime = item.end
      } else {
        startTime = `${timeIndex}:00`
      }
      nextLesson = findNextElement(convertArray(daySchedule), { start: `${prevLesson.start}`, end: `${prevLesson.end}` }).nextElement || { start: '23:59', end: '23:59' };

      // @ts-ignore
      navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
        startDateTime: startTime,
        onCreateLesson,
        maxDuration: type == 'before' ? subtractTime(item.start, `${timeIndex}:00`) : subtractTime(nextLesson?.start, item.end)
      })
    }
    const onHandleMoreLesson = (item: any) => {
      const array = [...lessons]
      const index = array.findIndex(element => element.start === item.start);
      if (index !== -1) {
        array.splice(index, 1);
        onHandleClick({
          Duration: subtractTime(item.end, item.start),
          DayOfWeek: dayOfWeek,
          StartTime: item.start,
        })
      }
      setLessons(array)
    }

    useEffect(() => {
      lessons.length > 0 ? setActive(true) : setActive(false)
    }, [lessons])
    useEffect(() => {
      setLessons(convertArray(daySchedule))
    }, [daySchedule])
    return (
      <>
        <View >
          <View style={styles.containerItem}>
            {lessons.filter(item => item.start.split(':')[0] == timeIndex).length > 0 ? (<View
              style={{
                borderRadius: 4,
                flex: 1,
                position: 'relative',
              }}>
              {lessons.filter(item => item.start.split(':')[0] == timeIndex).map((item, index) => {
                return (
                  <>
                    <TouchableOpacity key={`${item.start} ${dayOfWeek}`} style={[styles.lessonTop, {
                      top: index === 0 ? 0 : `${toMinutes(item.start) / 60 * 100}%`,
                      bottom: `${(60 - toMinutes(item.start)) / 60 * 100}%`,
                    }
                    ]}
                      onPress={(event) => onCreateMoreLesson(event, item, 'before')}
                    />


                    <LinearGradient
                      colors={colorsLesson}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={[styles.lessonContainer, {
                        top: `${toMinutes(item.start) / 60 * 100}%`,
                        height: `${100 * (subtractTime(item.end, item.start) / 60)}%`,
                      }]}>

                      <TouchableOpacity style={styles.lesson}
                        onPress={() => {
                          onHandleMoreLesson(item)
                        }}
                      >
                        <Text style={styles.textItem}>Class</Text>
                      </TouchableOpacity>
                    </LinearGradient >


                    <TouchableOpacity style={[styles.lessonBottom, {
                      top: `${toMinutes(item.end) > toMinutes(item.start) ? toMinutes(item.end) / 60 * 100 : toMinutes(item.end) == 0 ? 60 : toMinutes(item.end) + 120}%`,
                    }]}
                      onPress={(event) => onCreateMoreLesson(event, item, 'after')}
                    />
                  </>
                )
              })}
            </View>) : <TouchableOpacity style={styles.emptySlot} onPress={onHandleSlot} />}

          </View>
        </View >
      </>
    );

  };
