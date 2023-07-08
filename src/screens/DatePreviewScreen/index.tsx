import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDayAndHoursToDate, getStartAndEndOfWeek } from "../../services/utils/generateDate.util";

import { CustomButton } from "../../components/UI/CustomButton";
import { IGeneratedScheduleEntries, IWeekTimeSlot } from "../../common/types/schedule.types";
import { getWeekDates } from "../../services/utils/fullDateToValue.util";
import { WeekTable } from "./WeekTable";
import { DaysOfWeek } from "./DaysOfWeek";
import { useAppSelector } from "../../store/hooks";
import { NavigationEnum } from "../../common/constants/navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import Conflict from "../../../assets/svg/Conflict";
import { dispatch } from "../../store/store";
import { fetchScheduleByPeriodAction } from "../../store/shedule/actions";
import { findScheduleConflicts } from "../../services/utils/findConflict.util";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { ScreenLoading } from "../../components/UI/ScreenLoading";



interface IDatePreviewScreen { }
export const DatePreviewScreen: React.FC<IDatePreviewScreen> = () => {
    const navigation = useNavigation();


    const today = new Date();
    const weekDates = getWeekDates(today);

    const [startDateWeek, setStartDateWeek] = useState(new Date(weekDates.startDate));
    const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));
    const [screenLoading, setScreenLoading] = useState(false);
    const { CurrentScheduledEntries, WeekTimeSlots, GeneratedScheduleEntries, loading } = useAppSelector(state => state.schedule);



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
    // useEffect(() => {
    //     dispatch(fetchScheduleByPeriodAction({ startDate: startDateWeek.toISOString(), endDate: endDateWeek.toISOString() }));
    // }, [startDateWeek, endDateWeek])

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

            const now = new Date();
            setScreenLoading(true)
        }

    }, [GeneratedScheduleEntries, loading])

    return !screenLoading ? <ScreenLoading /> : (<View style={{ height: '100%' }}>
        <View style={styles.header}>
            <ScreenHeader text={"Preview Day and Time"} onBackPress={navigation.goBack} withBackButton={true} />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 12 }}>
            <DaysOfWeek startOfWeek={startDateWeek} />
        </View>
        <View style={{ flex: 1 }}>
            <WeekTable startOfWeek={startDateWeek} endOfWeek={endDateWeek} onHandleData={handeScheduleSlots} conflict={conflict} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 }}>
            <View >
                <CustomButton text={"<"} onPress={goToPrevWeek} style={{ height: 24, width: 40, }} />
            </View>
            {conflict.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Conflict />
                <Text style={{ marginLeft: 4, fontSize: 12, lineHeight: 19, color: '#F4380E' }}>You have a conflict. Please check each week</Text>
            </View>}
            <View >
                <CustomButton text={">"} onPress={goToNextWeek} style={{ height: 24, width: 40, }} />
            </View>
        </View>
        <Text style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: 17, lineHeight: 34, fontWeight: '700', }}>Scheduled Classes: </Text>
            <Text style={{ opacity: 0.4 }}>{slots.length || 0}</Text>
        </Text>
        <View style={{ padding: 20, justifyContent: 'flex-end' }}>
            <CustomButton text={"Next Step"} onPress={!conflict.length ? onSave : () => { }} disabled={!(conflict.length < 1)} />
        </View>

    </View>)
}