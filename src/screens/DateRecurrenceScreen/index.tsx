import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { WeekTable } from "./WeekTable";
import { getStartAndEndOfWeek } from "../../services/utils/generateDate.util";
import { CustomButton } from "../../components/UI/CustomButton";
import { getWeekDates } from "../../services/utils/fullDateToValue.util";
import { IWeekTimeSlot } from "../../common/types/schedule.types";
import { NavigationEnum } from "../../common/constants/navigation";
import { dispatch } from "../../store/store";
import { updateCurrentClassRequestAction } from "../../store/shedule";

interface IDateRecurrenceScreen { }
export const DateRecurrenceScreen: React.FC<IDateRecurrenceScreen> = () => {
    const [weekTimeSlots, setWeekTimeSlots] = useState<IWeekTimeSlot[]>([]);
    const navigation = useNavigation();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const today = new Date();

    const goNextStep = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.DATE_PREVIEW_SCREEN, { weekTimeSlots })
        dispatch(updateCurrentClassRequestAction({ WeekTimeSlots: weekTimeSlots }))
    }

    const setDataForWeek = (data: IWeekTimeSlot[]) => {
        setWeekTimeSlots(data)
    }

    const weekDates = getWeekDates(today);
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