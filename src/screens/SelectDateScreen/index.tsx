import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { ScreenHeader } from "../../components/ScreenHeader";
import { InputForm } from "../AddClassScreen/components/InputForm";
import { ListButtons } from "../AddClassScreen/components/ListButtons";
import { CustomButton } from "../../components/UI/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import { ListGradientCircleButtons } from "../AddClassScreen/components/ListGradientCircleButtons";

interface ISelectDateScreen { }
enum TypeDate {
    FixedNumberOfClasses = 0,
    OnSpecificDate = 1,
    FixedPeriodInTime = 2,
}
export const SelectDateScreen: React.FC<ISelectDateScreen> = () => {
    const [typeLocation, setTypeLocation] = useState(0);
    const navigation = useNavigation();


    const switchType = (type: any) => {
        switch (type) {
            case TypeDate.FixedNumberOfClasses:
                return <InputForm labelText='Enter Total Number of Classes' />;
            case TypeDate.OnSpecificDate:
                return <InputForm labelText='Enter Finish  Date' />;
            case TypeDate.FixedPeriodInTime:
                return <NumberOfDate />;
            default: null
        }
    }
    const NumberOfDate = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <InputForm labelText='Number of' style={{ width: 180, marginRight: 24 }} />
                <ListGradientCircleButtons buttons={['Weeks', 'Months']} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
            <View>
                <InputForm labelText='Enter Start Date' />
                <ListButtons buttons={[' Fixed number of classes', 'On Specific Date', ' Fixed period in time']} label="Class Type" onPress={setTypeLocation} />
                {switchType(typeLocation)}



            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }} >
                <CustomButton text={"Next Step"} />
            </View>

        </View>
    )
}


