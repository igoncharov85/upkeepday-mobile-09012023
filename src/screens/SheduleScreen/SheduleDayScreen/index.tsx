import React, { memo, useState, useEffect } from 'react';
import {
	ScrollView,
	Text,
	Modal,
	TouchableOpacity,
	View,
	Animated,
	StyleSheet,
} from 'react-native';

import { INavigationBase } from '../../../common/types/component.styles';
import { ScheduleScroller } from '../components/ScheduleScroller';
import { SessionItemList } from './SessionList';

import styles from './styles';
import { useAppSelector } from '../../../store/hooks';
import { dispatch } from '../../../store/store';
import { fetchScheduleByPeriodAction } from '../../../store/shedule/actions';
import { getToday } from '../../../services/utils/generateDate.util';
import { ScreenLoading } from '../../../components/UI/ScreenLoading';

enum LessonType {
	Lesson,
	Trial,
}
function getNextDate(dateString: string, daysToAdd: number): string {
	const [year, month, day] = dateString.split('-').map(Number);
	const date = new Date(year, month - 1, day);
	const nextDate = new Date(date.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
	const nextYear = nextDate.getFullYear();
	const nextMonth = (nextDate.getMonth() + 1).toString().padStart(2, '0');
	const nextDay = nextDate.getDate().toString().padStart(2, '0');
	return `${nextYear}-${nextMonth}-${nextDay}`;
}
function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'long', day: 'numeric', year: 'numeric',
		timeZone: 'UTC',
	});
}
interface IScheduleDayScreen { }

export const ScheduleDayScreen: React.FC<IScheduleDayScreen> = memo(() => {

	const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
	const today = new Date;
	const [dateString, day] = getToday(today)

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentDay, setCurrentDay] = useState(dateString);

	const handleNextDay = () => {
		const newIndex = currentIndex + 1;
		setCurrentIndex(newIndex);
		setCurrentDay(getNextDate(dateString, newIndex));
	};

	const handlePrevDay = () => {
		const newIndex = currentIndex - 1;
		setCurrentIndex(newIndex);
		setCurrentDay(getNextDate(dateString, newIndex));
	};
	useEffect(() => {
		dispatch(fetchScheduleByPeriodAction({ startDate: currentDay, endDate: currentDay }));
	}, [currentDay])
	useEffect(() => {
		dispatch(fetchScheduleByPeriodAction({ startDate: currentDay, endDate: currentDay }));
	}, []);
	return loading ? <ScreenLoading /> : (
		<View>
			<ScheduleScroller
				title={formatDate(currentDay)}
				onPressLeft={handlePrevDay}
				onPressRight={handleNextDay}
			/>

			<SessionItemList
				//@ts-ignore
				data={CurrentScheduledEntries}
			/>
		</View>
	);
});
