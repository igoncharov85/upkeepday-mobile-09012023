import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import DurationSessionModal from '../../../components/Modals/DurationSessionModal';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';


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
  activeItem?: boolean
}
export const WeekTableItem: FC<IWeekTableItem> = memo(
  ({
    timeDuration = TimeDuration.OneHour,
    typeSession = TypeSession.lesson,
    timeIndex,
    dayOfWeek,
    onHandleClick,
    activeItem = false

  }) => {
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [active, setActive] = useState(activeItem)
    const colorsLesson = ['#EAAFC8', '#654EA3'];
    const startDateTime = `${timeIndex}:00:00`
    const [duration, setDuration] = useState(60);
    const [timeStart, setTimeStart] = useState(0);
    const [lessons, setLessons] = useState([

      // {
      //   start: 0,
      //   end: 15
      // },
      // {
      //   start: 15,
      //   end: 45
      // },
      // {
      //   start: 50,
      //   end: 190
      // },
    ] as any[]);

    const onSetDuration = (duration: number) => {
      setDuration(duration);
    }
    const onSetStartTime = (data: any) => {
      setTimeStart(data)
    }
    const onCreateLesson = (lesson: any) => {
      setLessons([...lessons, {
        start: lesson.startDateTime,
        end: lesson.startDateTime + lesson.duration
      }])
      console.log('lesson', {
        start: lesson.startDateTime,
        end: lesson.startDateTime + lesson.duration
      })
    }
    const onHandleSlot = () => {
      //@ts-ignore
      !visible && navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
        onSetDuration,
        onSetStartTime,
        timeDuration,
        startDateTime,
        onCreateLesson,
      })

      onHandleClick({ DayOfWeek: dayOfWeek, StartTime: startDateTime as string, Duration: timeDuration })
      setActive(!active)
    }
    const onCreateMoreLesson = (item: any, type: string) => {
      let nextLesson, prevLesson;
      console.log('onCreateMoreLesson', item, type);
      lessons.forEach((lesson, index) => {
        if (lesson.start === item.start) {

          prevLesson = index && lessons[index - 1]
          nextLesson = lessons.length && lessons[index + 1]
          console.log(
            'prevLesson',
            prevLesson,
            'nextLesson',
            nextLesson,
          );

        }
      })
      if (type === 'after') {

        // @ts-ignore
        navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
          onSetDuration,
          onSetStartTime,
          timeDuration,
          startDateTime: `${timeIndex}:${item.end}`,
          onCreateLesson,
        })
      } else if (type === 'before') {

        // @ts-ignore
        navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
          onSetDuration,
          onSetStartTime,
          timeDuration,
          startDateTime: `${timeIndex}:00`,
          onCreateLesson,
        })
      }
    }
    const onHandleMoreLesson = (item: any) => {
      const array = [...lessons]
      const index = array.findIndex(element => element.start === item.start);
      if (index !== -1) {
        array.splice(index, 1);
      }
      console.log('onHandleMoreLesson', array);
      setLessons(array)
    }
    const getInfo = () => {
      console.log('timeStart', timeStart);
      console.log('duration', duration);

    }
    useEffect(() => {

    }, [timeStart, duration])

    return (
      <>
        <TouchableOpacity onPress={!active || lessons.length == 0 ? onHandleSlot : () => { }}>
          <View style={styles.containerItem}>

            {active ? (<View
              style={{
                borderRadius: 4,
                flex: 1,
                position: 'relative',
              }}>
              {lessons.map((item, index) => {
                return (<>
                  <TouchableOpacity style={{
                    zIndex: 10,
                    top: index === 0 ? 0 : `${item.start / 60 * 100}%`,
                    left: 0,
                    right: 0,
                    bottom: `${(60 - item.start - 10) / 60 * 100}%`,
                    position: 'absolute',
                    backgroundColor: 'yellow',
                  }}
                    onPress={() => onCreateMoreLesson(item, 'before')}
                  // onPress={() => console.log(item, 'before')}
                  />


                  <LinearGradient
                    colors={colorsLesson}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      zIndex: 11,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      borderRadius: 4,
                      top: `${item.start / 60 * 100}%`,
                      left: 0,
                      right: 0,
                      height: `${100 * ((item.end - item.start) / 60)}%`,
                    }}>

                    <TouchableOpacity style={{
                      zIndex: 10,
                      position: 'absolute',
                      borderRadius: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }} onPress={() => onHandleMoreLesson(item)}>
                      <Text style={styles.textItem}>Class</Text>
                    </TouchableOpacity>
                  </LinearGradient >


                  <TouchableOpacity style={{
                    zIndex: 12,
                    top: `${item.end / 60 * 100}%`,
                    left: 0,
                    right: 0,
                    height: `${lessons[index + 1] ? (lessons[index + 1].start - item.end) / 60 * 100 : ((60 - item.end) / 60 * 100)}%`,
                    position: 'absolute',
                    backgroundColor: 'red',
                  }}
                    onPress={() => onCreateMoreLesson(item, 'after')}
                  // onPress={() => console.log(item, 'after', lessons[index + 1] ? (lessons[index + 1].start - item.end) : 0)}

                  /></>
                )
              })}
            </View>) : null}
            {false ? (
              <>

                <View
                  style={{
                    borderRadius: 4,
                    flex: 1,
                    position: 'relative',
                  }}>
                  <TouchableOpacity style={{
                    zIndex: 8,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: `${timeStart / 60 * 100}%`,
                    position: 'absolute',
                    backgroundColor: 'yellow',
                  }} onPress={() => console.log('top')} />
                  <LinearGradient
                    colors={colorsLesson}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                      zIndex: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      borderRadius: 4,
                      top: `${timeStart / 60 * 100}%`,
                      left: 0,
                      right: 0,
                      height: `${100 * (duration / 60)}%`,
                    }}>
                    <Text style={styles.textItem}>Class</Text>
                  </LinearGradient>
                  <TouchableOpacity style={{
                    zIndex: 8,
                    top: `${100 * (duration / 60)}%`,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    position: 'absolute',
                    backgroundColor: 'red',
                  }} onPress={() => console.log('battom')} />
                </View>
              </>
            ) : null}
          </View>
        </TouchableOpacity >
      </>
    );

  },
);
