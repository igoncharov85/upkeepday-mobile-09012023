import React, { memo, useState, useEffect } from 'react';
import {
	View
} from 'react-native';

import { ScheduleScroller } from '../components/ScheduleScroller';
import { SessionItemList } from './SessionList';

import styles from './styles';
import { useAppSelector } from '../../../store/hooks';
import { dispatch } from '../../../store/store';
import { fetchScheduleByPeriodAction } from '../../../store/shedule/actions';
import { addDayAndHoursToDate, getToday } from '../../../services/utils/generateDate.util';
import { ScreenLoading } from '../../../components/UI/ScreenLoading';
import { IGeneratedScheduleEntries } from '../../../common/types/schedule.types';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';


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

function sortArrayByDateTime(arr: any[]): any[] {
	if (!arr || arr.length === 0) {
		return [];
	}

	const sortedArray = [...arr];
	sortedArray.sort((a, b) => {
		const dateA = new Date(a.StartDateTime);
		const dateB = new Date(b.StartDateTime);
		return dateA.getTime() - dateB.getTime();
	});

	return sortedArray;
}
interface IScheduleDayScreen { }

export const ScheduleDayScreen: React.FC<IScheduleDayScreen> = memo(() => {
	const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
	const isFocused = useIsFocused();
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
		let localCurrentDay = new Date(currentDay);
		dispatch(fetchScheduleByPeriodAction({ startDate: localCurrentDay.toISOString(), endDate: addDayAndHoursToDate(currentDay, 1, 0) }));
	}, [currentDay])
	useEffect(() => {
		let localCurrentDay = new Date(currentDay);
		isFocused && dispatch(fetchScheduleByPeriodAction({ startDate: localCurrentDay.toISOString(), endDate: addDayAndHoursToDate(currentDay, 1, 0) }));
	}, [isFocused]);

	useEffect(() => {
		const time = Date.now();
		console.log('\n----SheduleDay Screen----\n', loading, ' - loading status\n', moment(time).format('HH:mm:ss.SSS'), ' - time set loading')


	}, [loading])
	return loading ? <ScreenLoading /> : (
		<View>
			<ScheduleScroller
				title={formatDate(currentDay)}
				onPressLeft={handlePrevDay}
				onPressRight={handleNextDay}
			/>

			<SessionItemList
				//@ts-ignore
				data={sortArrayByDateTime(CurrentScheduledEntries)}
			/>
		</View>
	);
});
