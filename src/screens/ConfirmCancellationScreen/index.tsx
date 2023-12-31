import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Animated, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomInput } from '../../components/UI/CustomInput';
import {
    calculateEndDate,
    convertDateTimeToISO,
    formatDate,
} from '../../services/utils/fullDateToValue.util';
import CalendarComponent from '../SheduleScreen/components/CalendarComponent';
import TimePicker from '../SheduleScreen/components/TimePicker';
// import styles from './styles';
import { CustomButton } from '../../components/UI/CustomButton';
import { IScheduleItem } from '../../common/types/schedule.types';
import { dispatch } from '../../store/store';
import { deleteScheduleByPeriodAction } from '../../store/shedule/actions';
// import { useTypedNavigation } from '../../hook/useTypedNavigation';
// import { useTypedRoute } from '../../hook/useTypedRoute';
import { NavigationEnum } from '../../common/constants/navigation';
import { useAppSelector } from '../../store/hooks';
import { ScreenLoading } from '../../components/UI/ScreenLoading';
import moment from 'moment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface RouteParams {
    itemData: any;
}
interface IConfirmCancellationScreen { }
export const ConfirmCancellationScreen: FC<IConfirmCancellationScreen> = memo(() => {
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<any>>()
    const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    const { params } = useRoute<RouteProp<any>>()
    // const { startDate, endDate, allDay } = params

    const sessionItems = CurrentScheduledEntries
        ?.map((item, index) => {
            const startTime = moment(item.StartDateTime).format('hh:mm a');
            const endTime = moment(item.StartDateTime)
                .add(item.Duration, 'minute')
                .format('hh:mm a');

            return {
                name: item.ClassName,
                timeContinued: `${startTime}-${endTime}`,
                timeStart: moment(item.StartDateTime).format('MMMM D, YYYY'),
                startDateTime: moment(item.StartDateTime), // Преобразование строки в объект Moment.js
            };
        })
        .sort((a, b) => a.startDateTime - b.startDateTime);

    const handleSubmit = () => {
        //@ts-ignore
        dispatch(deleteScheduleByPeriodAction({ startDate: params?.startDate, endDate: params?.endDate, AllDay: params?.allDay }));
        navigate(NavigationEnum.HOME_SCREEN)
    }
    return (
        <View style={styles.container}>
            <ScreenHeader
                text={'Cancellation'}
                withBackButton={true}
                onBackPress={() => goBack()}
            />
            <Text /* style={styles.sessionTitle} */>Session(s) to be cancelled:</Text>
            <Text/*  style={styles.sessionTime} */>Start: {moment(params?.startDate).format('MMMM D, YYYY')}</Text>
            <Text /* style={styles.sessionTime} */>End: {moment(params?.endDate).format('MMMM D, YYYY')}</Text>
            <View style={{ flex: 1, }}>

                <ScrollView>
                    {loading ? <ScreenLoading /> : sessionItems.map((item, index) => (
                        <>
                            {sessionItems[index - 1]?.timeStart != sessionItems[index]?.timeStart && <Text style={styles.sessionTime}>{item.timeStart}</Text>}
                            <SessionItem name={item.name} timeContinued={item.timeContinued} key={index} />
                        </>
                    ))}
                </ScrollView>
            </View>

            <View /* style={styles.finishBtn} */>
                <CustomButton text={'Confirm Cancellation'} onPress={handleSubmit} />
                <CustomButton text={'Back'} onPress={goBack}
                    style={{
                        backgroundColor: '#FA9253',
                        opacity: 0.7671,
                        marginTop: 12
                    }} />
            </View>
        </View>
    );
});

interface SessionItemProps {
    name: string;
    timeContinued: string;
}
export const SessionItem: FC<SessionItemProps> = memo(
    ({ name, timeContinued }) => {

        return (
            <View /* style={styles.containerItem} */>
                <View
                    /* style={[
                        styles.item,
                        styles.itemLesson,
                    ]} */>
                    <View
                    /*  style={[
                         styles.decorItemLine,
                         styles.decorItemLineLesson,
                     ]} */
                    />
                    <View /* style={styles.itemInfo} */>
                        <Text /* style={styles.title} */>{name}</Text>
                        <Text /* style={styles.time} */>{timeContinued}</Text>
                    </View>
                </View>
            </View>
        );
    },
);