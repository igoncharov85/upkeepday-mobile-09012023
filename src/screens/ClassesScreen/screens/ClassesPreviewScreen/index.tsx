import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { addDayAndHoursToDate } from "../../../../services/utils/generateDate.util";

import { CustomButton } from "../../../../components/UI/CustomButton";
import { IGeneratedScheduleEntries } from "../../../../common/types/schedule.types";
import { getWeekDates } from "../../../../services/utils/fullDateToValue.util";
import { WeekTable } from "./WeekTable";
import { DaysOfWeek } from "./DaysOfWeek";
import { useAppSelector } from "../../../../store/hooks";
import { NavigationEnum } from "../../../../common/constants/navigation";
import Conflict from "../../../../../assets/svg/Conflict";
import { dispatch } from "../../../../store/store";
import { findScheduleConflicts } from "../../../../services/utils/findConflict.util";
import { updateCurrentClassRequestAction } from "../../../../store/shedule";
import { ScreenLoading } from "../../../../components/UI/ScreenLoading";
import BusyField from "../../components/BusyField";



interface IDatePreviewScreen { }
const ClassesPreviewScreen: React.FC<IDatePreviewScreen> = () => {
    const navigation = useNavigation();


    const today = new Date();
    const weekDates = getWeekDates(today);

    const [startDateWeek, setStartDateWeek] = useState(new Date(weekDates.startDate));
    const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));
    const [screenLoading, setScreenLoading] = useState(false);
    const { CurrentScheduledEntries, createCurrentClassRequest, WeekTimeSlots, GeneratedScheduleEntries, loading } = useAppSelector(state => state.schedule);



    const [slots, setSlots] = useState<IGeneratedScheduleEntries[]>([]);
    const [conflict, setConflict] = useState<IGeneratedScheduleEntries[]>(findScheduleConflicts(slots, CurrentScheduledEntries));



    const handeScheduleSlots = (slots: IGeneratedScheduleEntries[]) => {
        setSlots(slots)
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
        dispatch(updateCurrentClassRequestAction({
            Sessions: slots, Slots: WeekTimeSlots, Class: {
                EndNumber: slots.length,
            }
        }))

        //@ts-ignore
        navigation.navigate(NavigationEnum.ADD_STUDENTS_SCREEN)
    }

    useEffect(() => {
        return () => {
            setScreenLoading(false)
        };
    }, []);



    useEffect(() => {
        if (GeneratedScheduleEntries.length > 0) {
            setScreenLoading(true)
        }

    }, [GeneratedScheduleEntries, loading])

    return !screenLoading ? <ScreenLoading /> : (<View style={{ height: '100%' }}>
        <View style={styles.header}>
            <ScreenHeader text={"View and Reschedule"} onBackPress={navigation.goBack} withBackButton={true} />
        </View>
        <Text style={styles.subTitle}>Hold and Drop in the desired spot to reschedule</Text>
        <View style={{ marginHorizontal: 20, marginTop: 12 }}>
            <DaysOfWeek startOfWeek={startDateWeek} />

        </View>
        <View style={{ flex: 1 }}>
            <WeekTable startOfWeek={startDateWeek} endOfWeek={endDateWeek} onHandleData={handeScheduleSlots} conflict={conflict} dryFields={CurrentScheduledEntries} />
        </View>
        <View style={{ padding: 20, justifyContent: 'flex-end' }}>
            <CustomButton text={"Save"} onPress={!conflict.length ? onSave : () => { }} disabled={!(conflict.length < 1)} />
        </View>

    </View>)
}


export default ClassesPreviewScreen;