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
    const goNextStep = (data: any) => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.DATE_RECURRENCE_SCREEN, { data: data });
    };
    const SelectDateForm = ({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        errors,
        isValid,
    }: FormikProps<typeof formInitialValues>) => {
        const [typeLocation, setTypeLocation] = useState(0);
        const [numberOf, setNumberOf] = useState(0);

        const handleTypeLocation = (index: number) => setTypeLocation(index)

        const onFixedPeriodTime = (number: number) => {
            setNumberOf(number)
            setFieldValue('endScheduleType', number == 0 ? EndScheduleType.FixedWeekNumber : EndScheduleType.FixedMonthNumber)
        }
        return (
            <View style={styles.container}>
                <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
                <View>
                    <InputForm
                        labelText='Enter Start Date'
                        onChangeText={handleChange('startDate')}
                        value={values.startDate}
                        placeholder="2023-01-01"
                    />

                    <ListButtons buttons={[' Fixed number of classes', 'On Specific Date', ' Fixed period in time']} label="Class Type" onPress={handleTypeLocation} index={typeLocation} />
                    {typeLocation == TypeDate.FixedNumberOfClasses &&
                        <InputForm
                            labelText='Enter Total Number of Classes'
                            onChangeText={handleChange('totalClasses')}
                            value={values.totalClasses}
                            onChange={() => setFieldValue('endScheduleType', EndScheduleType.FixedClassesNumber)}
                        />}
                    {typeLocation == TypeDate.OnSpecificDate &&
                        <InputForm
                            labelText='Enter Finish  Date'
                            onChangeText={handleChange('finishDate')}
                            value={values.finishDate}
                            placeholder="2023-01-01"
                            onChange={() => setFieldValue('endScheduleType', EndScheduleType.SpecificEndDate)}
                        />}
                    {typeLocation == TypeDate.FixedPeriodInTime &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputForm
                                labelText='Number of'
                                onChangeText={handleChange('numberOf')}
                                value={values.numberOf}
                                style={{ width: 180, marginRight: 24 }}
                            />
                            <ListGradientCircleButtons onPress={onFixedPeriodTime} buttons={['Weeks', 'Months']} index={numberOf} />
                        </View>}


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
                    EndScheduleType: values.endScheduleType,
                    StartDate: values.startDate,
                    EndNumber: +values.finishDate

                })
            );
            console.log({
                endScheduleType: values.endScheduleType,
                finishDate: values.finishDate,
                numberOf: values.numberOf

            });

            navigation.navigate(
                //@ts-ignore
                NavigationEnum.DATE_RECURRENCE_SCREEN,
                {
                    endScheduleType: values.endScheduleType,
                    finishDate: values.finishDate,
                    numberOf: values.numberOf

                }
            );
        },
    })(SelectDateForm);


    return <FormikSelectDateScreen />;
});
