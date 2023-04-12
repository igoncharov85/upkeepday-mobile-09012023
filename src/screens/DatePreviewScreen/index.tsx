import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { ScreenHeader } from "../../components/ScreenHeader";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getStartAndEndOfWeek } from "../../services/utils/generateDate.util";

import { CustomButton } from "../../components/UI/CustomButton";
import { IWeekTimeSlot } from "../../common/types/schedule.types";
import { getWeekDates } from "../../services/utils/fullDateToValue.util";
import { WeekTable } from "./WeekTable";
import { DaysOfWeek } from "./DaysOfWeek";
import { useAppSelector } from "../../store/hooks";
import { NavigationEnum } from "../../common/constants/navigation";



interface IDatePreviewScreen { }
export const DatePreviewScreen: React.FC<IDatePreviewScreen> = () => {

    const navigation = useNavigation();
    //@ts-ignore
    const onSave = () => navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN)
    const [currentWeekTimeSlots, setCurrentWeekTimeSlots] = useState<IWeekTimeSlot[]>([]);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const today = new Date();
    const weekDates = getWeekDates(today);

    return (
        <View style={{ height: '100%' }}>
            <View style={styles.header}>
                <ScreenHeader text={"Preview Day and Time"} onBackPress={navigation.goBack} withBackButton={true} />
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 12 }}>
                <DaysOfWeek />
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView >
                    <WeekTable startOfWeek={weekDates.startDate} endOfWeek={weekDates.endDate} />
                </ScrollView>
            </View>
            <View style={{ padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={"save"} onPress={onSave} />
            </View>
        </View>
    )
}