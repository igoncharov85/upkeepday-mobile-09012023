import React, { memo, useEffect, useState } from "react";
import { Dimensions, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";

import styles from "./styles";
import { ScreenHeader } from "../../components/ScreenHeader";
import { InputForm } from "../AddClassScreen/components/InputForm";
import { ListButtons } from "../AddClassScreen/components/ListButtons";
import { CustomButton } from "../../components/UI/CustomButton";
import { ListGradientCircleButtons } from "../AddClassScreen/components/ListGradientCircleButtons";
import { NavigationEnum } from "../../common/constants/navigation";
import { dispatch } from "../../store/store";
import { updateCurrentClassRequestAction } from "../../store/shedule";
import { SelectedDateSchema } from "../../common/shemas/addClass.shape";
import CalendarComponent from "../SheduleScreen/components/CalendarComponent";
import { convertDate } from "../../services/utils/fullDateToValue.util";
import { useAppSelector } from "../../store/hooks";






enum TypeDate {
    FixedNumberOfClasses = 0,
    OnSpecificDate = 1,
    FixedWeekNumber = 2,
    FixedMonthNumber = 3,
}

export enum EndScheduleType {
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

let windowHeight: any;
if (Platform.OS === 'ios') {
    windowHeight = Dimensions.get('window').height - 80;
} else {
    windowHeight = Dimensions.get('window').height - 20;
}
export const SelectDateScreen: React.FC<ISelectDateScreen> = memo(() => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule)

    const navigation = useNavigation();
    const getTypeDate = (type: number) => {
        switch (type) {
            case 0:
                return EndScheduleType.FixedClassesNumber
            case 1:
                return EndScheduleType.SpecificEndDate
            case 2:
                return EndScheduleType.FixedWeekNumber
            case 3:
                return EndScheduleType.FixedMonthNumber
        }
    }
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
            setFieldValue('endScheduleType', getTypeDate(!number ? 2 : 3))

        }
        useEffect(() => {
            setFieldValue('endScheduleType', getTypeDate(typeLocation))
        }, [typeLocation])

        return (
            <View style={[styles.container, { minHeight: windowHeight, justifyContent: 'flex-start' }]}>
                <ScreenHeader onBackPress={navigation.goBack} text="Add Class General Data" withBackButton={true} />
                <View>
                    <InputWithDate labelText={"Enter Start Date"} handleChange={setFieldValue} nameField="startDate" />

                    <ListButtons buttons={[' Fixed number of classes', 'On Specific Date', ' Fixed period in time']} label="Class Type" onPress={handleTypeLocation} index={typeLocation} />
                    {typeLocation == TypeDate.FixedNumberOfClasses &&
                        <InputForm
                            labelText='Enter Total Number of Classes'
                            onChangeText={handleChange('totalClasses')}
                            value={values.totalClasses}
                        />}
                    {typeLocation == TypeDate.OnSpecificDate &&
                        <InputWithDate labelText={"Enter Finish Date"} handleChange={setFieldValue} nameField="finishDate" />}

                    {typeLocation == TypeDate.FixedWeekNumber &&
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

                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }} >
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
                    Class: {
                        EndScheduleType: values.endScheduleType,
                        StartDate: values.startDate,
                        EndDate: values.finishDate,
                        EndNumber: +values.totalClasses
                    }

                })
            );

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


    return (
        <ScrollView style={{ height: '100%' }}>
            <FormikSelectDateScreen />
        </ScrollView>
    );
});


const InputWithDate = ({ labelText, nameField, handleChange }: { labelText: string, nameField: string, handleChange: any }) => {
    const [date, setDate] = useState('');
    const [visible, setVisible] = useState(false)

    const handleChangeVisible = () => setVisible(!visible)

    const handleChangeDate = (date: string) => {
        setDate(convertDate(date)[1])
        handleChangeVisible()
        handleChange(nameField, convertDate(date)[0])
    }


    return (
        <View>
            <Text style={styles.label}>{labelText && labelText}</Text>
            <TouchableOpacity onPress={handleChangeVisible} activeOpacity={1}>
                <View style={styles.interactive}>
                    <Text>{date}</Text>
                </View>
            </TouchableOpacity>
            <CalendarComponent
                visible={visible}
                date={(new Date()).toISOString()}
                onDayPress={handleChangeDate}
            />
        </View>
    )
}