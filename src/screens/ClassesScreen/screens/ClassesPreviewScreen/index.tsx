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
import { fetchSessionClassesByIdAction } from "../../../../store/classes/actions";
import { IClassesResponse } from "../../../../common/types/classes.types";
import { fetchScheduleByPeriodAction } from "../../../../store/shedule/actions";
import moment from "moment";

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

    const today = new Date();
    const weekDates = getWeekDates(today);

    const [startDateWeek, setStartDateWeek] = useState(new Date(weekDates.startDate));
    const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));
    const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    const { currentSchool } = useAppSelector(state => state.businessAccount);
    const { currentSession }: any = useAppSelector(state => state.classes);

    const [conflict, setConflict] = useState<IGeneratedScheduleEntries[]>(findScheduleConflicts(CurrentScheduledEntries, currentSession));

    const handeScheduleSlots = (slots: IGeneratedScheduleEntries[]) => {
        setConflict(findScheduleConflicts(slots, CurrentScheduledEntries))
    }

    const goToNextWeek = () => {
        setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), 7, 0)))
        setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), 7, 0)))
    }
    const goToPrevWeek = () => {
        setStartDateWeek(new Date(addDayAndHoursToDate(startDateWeek.toISOString(), -7, 0)))
        setEndDateWeek(new Date(addDayAndHoursToDate(endDateWeek.toISOString(), -7, 0)))
    }

    const onSave = () => {

        //@ts-ignore
        navigation.navigate(NavigationEnum.CLASSES_TAB)
    }

    useEffect(() => {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);
        dispatch(fetchSessionClassesByIdAction({id: item.ClassId, schoolId: currentSchool?.SchoolId}))
        dispatch(fetchScheduleByPeriodAction({ startDate: moment(startOfYear).format('YYYY-MM-DDTHH:mm:ss'), endDate: moment(endOfYear).format('YYYY-MM-DDTHH:mm:ss'), schoolId: currentSchool?.SchoolId }));
    }, [currentSchool]);


    return loading ? <ScreenLoading /> : (<View style={{ height: '100%' }}>
        <View style={styles.header}>
            <ScreenHeader text={"View and Reschedule"} onBackPress={navigation.goBack} withBackButton={true} />
        </View>
        <Text style={styles.subTitle}>Hold and Drop in the desired spot to reschedule</Text>
        <View style={{ marginHorizontal: 20, marginTop: 12 }}>
            <DaysOfWeek
                startOfWeek={startDateWeek}
                goToNextWeek={goToNextWeek}
                goToPrevWeek={goToPrevWeek}
            />

        </View>
        {<View style={{ flex: 1 }}>
            <WeekTable startOfWeek={startDateWeek} endOfWeek={endDateWeek} onHandleData={handeScheduleSlots} conflict={conflict} dryFields={removeElementsFromArray(CurrentScheduledEntries, currentSession)} />
        </View>}
        <View style={{ padding: 20, justifyContent: 'flex-end' }}>
            <CustomButton text={"Ok"} onPress={onSave} />
        </View>

    </View>)
}


export default ClassesPreviewScreen;