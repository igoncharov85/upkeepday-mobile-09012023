import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WeekTable } from "./WeekTable";
import { addDayAndHoursToDate, getStartAndEndOfWeek } from "../../services/utils/generateDate.util";
import { CustomButton } from "../../components/UI/CustomButton";
import { getWeekDates } from "../../services/utils/fullDateToValue.util";
import { IWeekTimeSlot } from "../../common/types/schedule.types";
import { NavigationEnum } from "../../common/constants/navigation";
import { dispatch } from "../../store/store";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { generateScheduleAction } from "../../store/shedule/actions";
import { useAppSelector } from "../../store/hooks";
import { calculateNumberOfClasses } from "../../services/utils/calculateNumberOfClasses";
import { EndScheduleType } from "../SelectDateScreen";

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

interface IDateRecurrenceScreen { }
export const DateRecurrenceScreen: React.FC<IDateRecurrenceScreen> = () => {
    const [weekTimeSlots, setWeekTimeSlots] = useState<IWeekTimeSlot[]>([]);
    const navigation = useNavigation();
    const route = useRoute();
    const today = new Date();
    const weekDates = getWeekDates(today);
    //@ts-ignore
    const { endScheduleType, finishDate, numberOf } = route?.params;
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);

    const goNextStep = () => {
        const endDate = (endScheduleType == EndScheduleType.FixedMonthNumber || endScheduleType == EndScheduleType.FixedWeekNumber) && addDayAndHoursToDate(weekDates.startDate.toISOString(), numberOf * (endScheduleType == 'FixedMonthNumber' ? 30 : 7), 0) || endScheduleType == EndScheduleType.SpecificEndDate && finishDate && new Date(finishDate);
        const numberClass = createCurrentClassRequest.EndNumber || calculateNumberOfClasses(weekTimeSlots, weekDates.startDate.toISOString(), endDate)
        dispatch(
            updateCurrentClassRequestAction({
                EndNumber: numberClass

            })
        );
        dispatch(generateScheduleAction({ ScheduleType: createCurrentClassRequest.EndScheduleType as string, StartDate: createCurrentClassRequest.StartDate as string, Number: numberClass as number, WeekTimeSlots: weekTimeSlots }))

        //@ts-ignore
        navigation.navigate(NavigationEnum.DATE_PREVIEW_SCREEN)
    }

    const setDataForWeek = (data: IWeekTimeSlot[]) => {
        setWeekTimeSlots(data)
    }



    return (
        <View style={{ height: '100%' }}>
            <View style={styles.header}>
                <ScreenHeader text={"Day and Time Recurrence"} onBackPress={navigation.goBack} withBackButton={true} />
            </View>
            <Text style={styles.title}>Populate a week and CP will replicate other recurrences</Text>
            <View style={{ flexDirection: 'row', marginLeft: 56, marginRight: 20 }}>
                {days.map(day => (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.daysOfWeekText}>{day}</Text>
                    </View>
                ))}
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <WeekTable startOfWeek={weekDates.startDate} endOfWeek={weekDates.endDate} onHandleData={setDataForWeek} />
                </ScrollView>
            </View>
            <View style={{ padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={"Next Step"} disabled={!weekTimeSlots.length} onPress={goNextStep} />
            </View>
        </View >
    )
}