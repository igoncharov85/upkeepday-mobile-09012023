import React, { memo, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
import { ScreenHeader } from "../../components/ScreenHeader";
import { InputForm } from "../AddClassScreen/components/InputForm";
import { ListButtons } from "../AddClassScreen/components/ListButtons";
import { CustomButton } from "../../components/UI/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import { ListGradientCircleButtons } from "../AddClassScreen/components/ListGradientCircleButtons";
import { NavigationEnum } from "../../common/constants/navigation";
import { dispatch } from "../../store/store";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { number, string } from "yup";
import { SelectedDateSchema } from "../../common/shemas/addClass.shape";






enum TypeDate {
    FixedNumberOfClasses = 0,
    OnSpecificDate = 1,
    FixedPeriodInTime = 2,
}

enum EndScheduleType {
    FixedClassesNumber = 'FixedClassesNumber',
    SpecificEndDate = 'SpecificEndDate',
    FixedWeekNumber = 'FixedWeekNumber',
    FixedMonthNumber = 'FixedMonthNumber'
}

interface ISelectDateScreen { }

const formInitialValues = {
    typeLocation: 0,
    endScheduleType: "",
    startDate: "",
    totalClasses: "",
    finishDate: "",
    numberOf: "",
};


export const SelectDateScreen: React.FC<ISelectDateScreen> = memo(() => {
    const navigation = useNavigation();
    const goNextStep = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.DATE_RECURRENCE_SCREEN);
    };
    const [endScheduleType, setEndScheduleType] = useState('');

    const [typeLocation, setTypeLocation] = useState(0);
    const SelectDateForm = ({
        values,
        handleChange,
        handleSubmit,
        errors,
        isValid,
    }: FormikProps<typeof formInitialValues>) => {





        const handleTypeLocation = (index: number) => setTypeLocation(index)

        const handleScheduleType = (scheduleType: string) => setEndScheduleType(scheduleType)

        const onFixedPeriodTime = (number: number) => {
            handleScheduleType(number == 0 ? EndScheduleType.FixedWeekNumber : EndScheduleType.FixedMonthNumber)
        }


        const GetChildItem = () => {
            switch (typeLocation) {
                case TypeDate.FixedNumberOfClasses:
                    handleScheduleType(EndScheduleType.FixedClassesNumber);
                    return <InputForm
                        labelText='Enter Total Number of Classes'
                        onChangeText={handleChange('totalClasses')}
                        value={values.totalClasses}
                    />;
                case TypeDate.OnSpecificDate:
                    handleScheduleType(EndScheduleType.SpecificEndDate);
                    return <InputForm
                        labelText='Enter Finish  Date'
                        onChangeText={handleChange('finishDate')}
                        value={values.finishDate}
                    />;
                case TypeDate.FixedPeriodInTime:
                    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <InputForm
                            labelText='Number of'
                            onChangeText={handleChange('numberOf')}
                            value={values.numberOf}
                            style={{ width: 180, marginRight: 24 }}
                        />
                        <ListGradientCircleButtons onPress={onFixedPeriodTime} buttons={['Weeks', 'Months']} />
                    </View>
                default: return <InputForm labelText='Enter Total Number of Classes' />;
            }
        }


        return (
            <View style={styles.container}>
                <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
                <View>
                    <InputForm
                        labelText='Enter Start Date'
                        onChangeText={handleChange('startDate')}
                        value={values.startDate}
                    />
                    <ListButtons buttons={[' Fixed number of classes', 'On Specific Date', ' Fixed period in time']} label="Class Type" onPress={handleTypeLocation} />
                    <GetChildItem />


                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }} >
                    <CustomButton text={"Next Step"} onPress={handleSubmit} />
                </View>

            </View>
        )

    };

    const FormikSelectDateScreen = withFormik<any, typeof formInitialValues>({
        mapPropsToValues: () => formInitialValues,
        validationSchema: SelectedDateSchema,
        handleSubmit: (values,) => {
            dispatch(
                updateCurrentClassRequestAction({
                    EndScheduleType: endScheduleType,
                    StartDate: values.startDate,
                })
            );
            console.log({
                EndScheduleType: endScheduleType,
                StartDate: values.startDate,
            })
            goNextStep()
        },
    })(SelectDateForm);


    return <FormikSelectDateScreen />;
});
