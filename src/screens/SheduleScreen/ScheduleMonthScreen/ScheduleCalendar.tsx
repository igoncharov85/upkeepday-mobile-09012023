import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, PanResponder } from 'react-native';
import { format } from 'date-fns';


import styles from './styles';
import { MonthItem } from './MonthItem';
import { fetchScheduleByPeriodAction } from '../../../store/shedule/actions';
import { dispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

interface IScheduleCalendarProps {
    startingDayOfWeek: number; // 0 - Sunday, 1 - Monday, etc.
}

interface Day {
    dayOfMonth: number;
    isCurrentMonth: boolean;
}


interface EntryCount {
    year: number;
    month: number;
    day: number;
    count: number;
}

function getSectionsCountByDate(entries: any[], date: Date): number {
    const entriesOnDate = entries.filter(entry => {
        const entryDate = new Date(entry.StartDateTime);
        return (
            entryDate.getFullYear() === date.getFullYear() &&
            entryDate.getMonth() === date.getMonth() &&
            entryDate.getDate() === date.getDate()
        );
    });

    const count = entriesOnDate.length;

    return count;
}



export const ScheduleCalendar: React.FC<IScheduleCalendarProps> = ({ startingDayOfWeek }) => {
    const [days, setDays] = useState<Day[]>([]);

    const { CurrentScheduledEntries } = useAppSelector(state => state.schedule);
    const [date, setDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        generateDays();
    }, [currentMonth]);

    const generateDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const days: Day[] = [];
        let dayOfMonth = 1;
        let i = 0;


        if (firstDayOfMonth !== startingDayOfWeek) {
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            const numDaysToAdd = firstDayOfMonth < startingDayOfWeek
                ? firstDayOfMonth + 7 - startingDayOfWeek
                : firstDayOfMonth - startingDayOfWeek;

            for (let j = daysInPrevMonth - numDaysToAdd + 1; j <= daysInPrevMonth; j++) {
                days.push({ dayOfMonth: j, isCurrentMonth: false });
            }
            i = numDaysToAdd;
        }


        while (dayOfMonth <= daysInMonth) {
            days.push({ dayOfMonth, isCurrentMonth: true });
            dayOfMonth++;
            i++;
        }


        let nextMonthDay = 1;
        while (i % 7 !== 0) {
            days.push({ dayOfMonth: nextMonthDay, isCurrentMonth: false });
            nextMonthDay++;
            i++;
        }

        setDays(days);
        setDate(`${year}-${month + 1}`)
        dispatch(fetchScheduleByPeriodAction({ startDate: `${year}-${month + 1}-1`, endDate: `${year}-${month + 1}-${daysInMonth}` }));

    };

    const renderItem = ({ item }: { item: Day }) => {
        const today = new Date(`${date}-${item.dayOfMonth}`)
        const sesions = getSectionsCountByDate(CurrentScheduledEntries, today)
        const { isCurrentMonth, dayOfMonth } = item;
        return <MonthItem day={`${dayOfMonth}`} isCurrentMonth={isCurrentMonth} sesion={sesions} />
    };



    const handleSwipeLeft = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    const handleSwipeRight = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        setCurrentMonth(nextMonth);
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };
    const [swipeUpCount, setSwipeUpCount] = useState(0);
    const [swipeDownCount, setSwipeDownCount] = useState(0);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy < -50) {
                setSwipeUpCount(swipeUpCount + 1);
                console.log('up')
                handleSwipeLeft();
            } else if (gestureState.dy > 50) {
                setSwipeDownCount(swipeDownCount + 1);
                console.log('down')
                handleSwipeRight();
            }
        },
    });
    useEffect(() => {

    }, [days])
    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.header}>
                <Text style={styles.monthYear}>
                    {format(currentMonth, 'LLLL yyyy')}
                </Text>

            </View>
            <View style={styles.dayNames}>
                {DAY_NAMES.map((name) => (
                    <Text style={styles.dayName} key={name}>{name}</Text>
                ))}
            </View>
            <View>
                <FlatList
                    ref={flatListRef}
                    data={days}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={7}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    );
};

