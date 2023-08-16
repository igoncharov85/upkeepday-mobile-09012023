import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { addDayAndHoursToDate } from "../../../../services/utils/generateDate.util";

import { CustomButton } from "../../../../components/UI/CustomButton";
import { IGeneratedScheduleEntries } from "../../../../common/types/schedule.types";
import { getWeekDates } from "../../../../services/utils/fullDateToValue.util";
import { useAppSelector } from "../../../../store/hooks";
import { NavigationEnum } from "../../../../common/constants/navigation";
import { dispatch } from "../../../../store/store";
import { findScheduleConflicts } from "../../../../services/utils/findConflict.util";
import { ScreenLoading } from "../../../../components/UI/ScreenLoading";
import { WeekTable } from "./WeekTable";
import { DaysOfWeek } from "./DaysOfWeek";
import { fetchClassesSchedule, fetchSessionClassesByIdAction } from "../../../../store/classes/actions";
import { IClassesResponse } from "../../../../common/types/classes.types";
import { fetchScheduleByPeriodAction } from "../../../../store/shedule/actions";
import moment from "moment";
import { DayScroller } from "../../../../components/UI/DayScroller";
import { formatDateForDayScroller } from "../../../../services/utils/convertDate";

function removeElementsFromArray(arr1: any[], arr2: any[]) {
    return arr1.filter(item1 => {
        return !arr2.some(item2 => {
            return item1.ClassName === item2.ClassName && item1.SessionId === item2.SessionId;
        });
    });


}

interface IDatePreviewScreen { }
const ClassesPreviewScreen: React.FC<IDatePreviewScreen> = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { item } = route.params as { item: IClassesResponse };
    const isFocused = useIsFocused();
    console.log(item.StartDate, 'item')

    const { loading }: any = useAppSelector(state => state.classes);

    const startLessonDate = moment(item.StartDate).toDate()
    const todayDate = new Date()
    const startOfWeekDate = todayDate > startLessonDate ? todayDate : startLessonDate;

    const weekDates = getWeekDates(startOfWeekDate);

    const [startDateWeek, setStartDateWeek] = useState(new Date(weekDates.startDate));
    const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));


    const goToNextWeek = () => {
        console.log('pres next')
        setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), 7, 0)))
        setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), 7, 0)))
    }
    const goToPrevWeek = () => {
        console.log('pres prev')
        setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), -7, 0)))
        setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), -7, 0)))
    }

    const onSave = () => {

        //@ts-ignore
        navigation.navigate(NavigationEnum.CLASSES_TAB)
    }

    useEffect(() => {
        dispatch(fetchSessionClassesByIdAction(item.ClassId))
        dispatch(fetchClassesSchedule({ classId: item.ClassId }))
    }, []);


    return (<View style={{ height: '100%' }}>
        <View style={styles.header}>
            <ScreenHeader text={"View and Reschedule"} onBackPress={navigation.goBack} withBackButton={true} />
        </View>
        <Text style={styles.subTitle}>Hold and Drop in the desired spot to reschedule</Text>
        <View style={{ marginHorizontal: 20, marginTop: 12 }}>
            <DayScroller
                title={moment(startDateWeek).format('MMMM')}
                onPressLeft={goToPrevWeek} onPressRight={goToNextWeek} />
            <DaysOfWeek
                startOfWeek={startDateWeek}
                goToNextWeek={goToNextWeek}
                goToPrevWeek={goToPrevWeek}
            />

        </View>
        {loading ? <ScreenLoading /> : <View style={{ flex: 1 }}>
            <WeekTable classId={item.ClassId} startOfWeek={startDateWeek} endOfWeek={endDateWeek} />
        </View>}
        <View style={{ padding: 20, justifyContent: 'flex-end' }}>
            <CustomButton text={"Ok"} onPress={onSave} />
        </View>

    </View>)
}


export default ClassesPreviewScreen;