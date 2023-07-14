import React, { FC, memo, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { IWeekTimeSlot } from '../../../common/types/schedule.types';
import DurationSessionModal from '../../../components/Modals/DurationSessionModal';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';

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
            const hour = 60;
            const startTime = `${timeIndex}:${lesson.startDateTime}`
            const endTime = `${timeIndex + Math.floor((lesson.startDateTime + lesson.duration) / hour)}:${(lesson.startDateTime + lesson.duration) % hour}`;

            setLessons([...lessons, {
                start: startTime,
                end: endTime
            }])
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
        }


        const onCreateMoreLesson = (item?: any, type?: string) => {
            let nextLesson, prevLesson;

            item && lessons.sort((a, b) => {
                const dateA = new Date(0, 0, 0, ...a.start.split(":").map(Number));
                const dateB = new Date(0, 0, 0, ...b.start.split(":").map(Number));
                const dateAEnd = new Date(0, 0, 0, ...a.end.split(":").map(Number));
                const dateBEnd = new Date(0, 0, 0, ...b.end.split(":").map(Number));
                //@ts-ignore
                return dateA - dateB || dateAEnd - dateBEnd;
            }).forEach((lesson, index) => {
                if (lesson.start === item.start) {

                    prevLesson = index && lessons[index]
                    nextLesson = lessons[index + 1]

                }
            })

            let startTime;
            if (type === 'after') {
                startTime = `${timeIndex}:${item.end}`
            } else {
                startTime = `${timeIndex}:00`;
                console.log(startTime);
                console.log(lessons);


            }
            // @ts-ignore
            navigation.navigate(NavigationEnum.SELECT_DURATION_CLASS_MODAL, {
                onSetDuration,
                onSetStartTime,
                timeDuration,
                startDateTime: startTime,
                onCreateLesson,
            })
        }
        const onHandleMoreLesson = (item: any) => {
            const array = [...lessons]

            const index = array.findIndex(element => element.start === item.start);
            if (index !== -1) {
                array.splice(index, 1);
            }
            setLessons(array)
        }

        useEffect(() => {
            console.log('lessons:', lessons);

        }, [lessons])

        return (
            <>
                <TouchableOpacity onPress={!active || lessons.length == 0 ? onCreateMoreLesson : undefined}>
                    <View style={styles.containerItem}>

                        {active ? (<View
                            style={{
                                borderRadius: 4,
                                flex: 1,
                                position: 'relative',
                            }}>
                            {lessons.map((item, index) => {
                                console.log('items:', item);

                                return (<>
                                    <TouchableOpacity style={{
                                        zIndex: 2,
                                        top: index === 0 ? 0 : `${toMinutes(item.start) / 60 * 100}%`,
                                        left: 0,
                                        right: 0,
                                        bottom: `${(60 - toMinutes(item.start)) / 60 * 100}%`,
                                        position: 'absolute',
                                    }}
                                        onPress={() => onCreateMoreLesson(item, 'before')}
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
                                            top: `${toMinutes(item.start) / 60 * 100}%`,
                                            left: 0,
                                            right: 0,
                                            height: `${100 * (subtractTime(item.end, item.start) / 60)}%`,
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
                                        zIndex: 2,
                                        top: `${item.end / 60 * 100}%`,
                                        left: 0,
                                        right: 0,
                                        height: `${lessons[index + 1] ? (lessons[index + 1].start - item.end) / 60 * 100 : ((60 - item.end) / 60 * 100)}%`,
                                        position: 'absolute',
                                    }}
                                        onPress={() => onCreateMoreLesson(item, 'after')}
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
