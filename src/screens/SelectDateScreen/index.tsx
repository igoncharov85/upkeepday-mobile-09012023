import React, { memo, useEffect, useRef, useState } from "react";
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
import { SelectedDateForFinishDateSchema, SelectedDateForNumberOfSchema, SelectedDateForTotalClassesSchema, SelectedDateSchema } from "../../common/shemas/addClass.shape";
import CalendarComponent from "../SheduleScreen/components/CalendarComponent";
import { convertDate } from "../../services/utils/fullDateToValue.util";
import { useAppSelector } from "../../store/hooks";
import moment from "moment";






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



let windowHeight: any;
if (Platform.OS === 'ios') {
    windowHeight = Dimensions.get('window').height - 80;
} else {
    windowHeight = Dimensions.get('window').height - 20;
}
export const SelectDateScreen: React.FC<ISelectDateScreen> = memo(() => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule)
    const [numberOf, setNumberOf] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [type,setType] = useState(0)
    const [finishDate, setFinishDate] = useState(createCurrentClassRequest.Class?.EndDate ? createCurrentClassRequest.Class?.EndDate : '');
    const formInitialValues = {
        typeLocation: 0,
        endScheduleType: "",
        startDate: createCurrentClassRequest.Class?.StartDate ? createCurrentClassRequest.Class?.StartDate : "",
        totalClasses: totalClasses,
        finishDate: finishDate,
        numberOf: numberOf,
    };
    const navigation = useNavigation();
    const typeRef = useRef<string>('');
    const resetData = ()=>{
        setNumberOf(0)
        setTotalClasses(0)
        setFinishDate('')
    }
    const getTypeDate = (type: number) => {
        switch (type) {
            case 0:
                typeRef.current = EndScheduleType.FixedClassesNumber;
                
        setNumberOf(0)
        setFinishDate('')
        setType(0)
                return EndScheduleType.FixedClassesNumber;
            case 1:
                typeRef.current = EndScheduleType.SpecificEndDate;
                setNumberOf(0)
        setTotalClasses(0)
        setType(1)
                return EndScheduleType.SpecificEndDate;
            case 2:
                typeRef.current = EndScheduleType.FixedWeekNumber;
                
        setTotalClasses(0)
        setFinishDate('')
        setType(2)
                return EndScheduleType.FixedWeekNumber;
            case 3:
                typeRef.current = EndScheduleType.FixedMonthNumber;
                
        setTotalClasses(0)
        setFinishDate('')
        setType(2)
                return EndScheduleType.FixedMonthNumber;
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
        const [typeLocation, setTypeLocation] = useState(type);

        const handleTypeLocation = (index: number) => {
            setTypeLocation(index)
        }

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
                    <InputWithDate labelText={"Enter Start Date"} handleChange={setFieldValue} nameField="startDate" dateValue={createCurrentClassRequest.Class?.StartDate} />

                    <ListButtons buttons={[' Fixed number of classes', 'On Specific Date', ' Fixed period in time']} label="Class Type" onPress={handleTypeLocation} index={typeLocation} />
                    {typeLocation == TypeDate.FixedNumberOfClasses &&
                        <InputForm
                            keyboardType="numeric"
                            labelText='Enter Total Number of Classes'
                            onChangeText={handleChange('totalClasses')}
                            value={values.totalClasses.toString()}
                        />}
                    {typeLocation == TypeDate.OnSpecificDate &&
                        <InputWithDate labelText={"Enter Finish Date"} handleChange={setFieldValue} nameField="finishDate" dateValue={finishDate} />}

                    {typeLocation == TypeDate.FixedWeekNumber &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <InputForm
                                keyboardType="numeric"
                                labelText='Number of'
                                onChangeText={handleChange('numberOf')}
                                value={values.numberOf.toString()}
                                style={{ width: 180, marginRight: 24 }}
                            />
                            <ListGradientCircleButtons onPress={onFixedPeriodTime} buttons={['Weeks', 'Months']} />
                        </View>}


                </View>

                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }} >
                    <CustomButton text={"Next Step"} onPress={handleSubmit} disabled={!isValid} />
                </View>

            </View>
        )

    };

    const FormikSelectDateScreen = withFormik<any, typeof formInitialValues>({
        mapPropsToValues: () => {
            return formInitialValues
        },
        validationSchema: () => {

            return Yup.object().shape({
                startDate: Yup.string().required(''),
                totalClasses: typeRef.current == EndScheduleType.FixedClassesNumber ? Yup.number().min(1, "Number of totalClasses should be greater than 0").required('') : Yup.number(),
                finishDate: typeRef.current == EndScheduleType.SpecificEndDate ? Yup.string().test('endDate', 'Finish date should be greater than start date', function (value: any) {
                    const { startDate }: any = this.parent;
                    return new Date(value) > new Date(startDate);
                }).required('55555')
                    : Yup.string(),
                numberOf: typeRef.current == EndScheduleType.FixedWeekNumber || typeRef.current == EndScheduleType.FixedMonthNumber ? Yup.number().min(1, "NumberOf ").required('') : Yup.number(),
            })
        },
        handleSubmit: (values,) => {
            dispatch(
                updateCurrentClassRequestAction({
                    Class: {
                        EndScheduleType: values.endScheduleType,
                        StartDate: values.startDate,
                        EndDate: values.finishDate,
                        EndNumber: +values.totalClasses as number,
                    }

                })
            );
            
            
            setNumberOf(+values.numberOf as number)
            setTotalClasses(+values.totalClasses as number)
            setFinishDate(values.finishDate)
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


const InputWithDate = ({ labelText, nameField, handleChange, dateValue }: { labelText: string, nameField: string, handleChange: any, dateValue?: any }) => {

    const [date, setDate] = useState(dateValue ? convertDate(moment(dateValue, "YYYY-MM-DD").format("MMM D, YYYY"))[1] : '');
    const [visible, setVisible] = useState(false)

    const handleChangeVisible = () => setVisible(!visible)

    const handleChangeDate = (date: string) => {
        setDate(convertDate(date)[1])
        handleChangeVisible()
        handleChange(nameField, convertDate(date)[0])
    }
    function convertDateFormat(dateString: string) {
        const dateArr = dateString.split('/');
        [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];

        const newDateString = dateArr[0] ? dateArr.join('/') : '';

        return newDateString;
    }

    return (
        <View>
            <Text style={styles.label}>{labelText && labelText}</Text>
            <TouchableOpacity onPress={handleChangeVisible} activeOpacity={1}>
                <View style={styles.interactive}>
                    <Text>{convertDateFormat(date)}</Text>
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