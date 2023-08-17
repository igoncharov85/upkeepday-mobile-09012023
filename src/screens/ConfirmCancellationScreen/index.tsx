import { useNavigation, useRoute } from '@react-navigation/native';
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
import styles from './styles';
import { CustomButton } from '../../components/UI/CustomButton';
import { IScheduleItem } from '../../common/types/schedule.types';
import { dispatch } from '../../store/store';
import { deleteScheduleByPeriodAction } from '../../store/shedule/actions';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { useTypedRoute } from '../../hook/useTypedRoute';
import { NavigationEnum } from '../../common/constants/navigation';
import { useAppSelector } from '../../store/hooks';
import { ScreenLoading } from '../../components/UI/ScreenLoading';
import moment from 'moment';

interface RouteParams {
    itemData: any;
}
interface IConfirmCancellationScreen { }
export const ConfirmCancellationScreen: FC<IConfirmCancellationScreen> = memo(() => {
    const { navigate, goBack } = useTypedNavigation()
    const { CurrentScheduledEntries, loading } = useAppSelector(state => state.schedule);
    const { params } = useTypedRoute<NavigationEnum.CONFIRM_CANCELLATION_SCREEN>()
    const { startDate, endDate, allDay } = params

    const sessionItems = CurrentScheduledEntries?.map((item, index) => {
        const startTime = moment(item.StartDateTime).format('hh:mm a')
        const endTime = moment(item.StartDateTime).add(item.Duration, 'minute').format('hh:mm a');

        return {
            name: item.ClassName,
            timeContinued: `${startTime}-${endTime}`,
        };
    });

    const handleSubmit = () => {
        //@ts-ignore
        dispatch(deleteScheduleByPeriodAction({ startDate: startDate, endDate: endDate, AllDay: allDay }));
        navigate(NavigationEnum.HOME_SCREEN)
    }
    console.log('CurrentScheduledEntries', CurrentScheduledEntries)
    return loading ? <ScreenLoading /> : (
        <View style={styles.container}>
            <ScreenHeader
                text={'Cancellation'}
                withBackButton={true}
                onBackPress={() => goBack()}
            />
            <Text style={styles.subtitle}>Automatic notification will be sent to all students</Text>
            <Text style={styles.sessionTitle}>Session(s) to be cancelled:</Text>
            <View style={{ maxHeight: '45%' }}>

                <ScrollView>
                    {sessionItems.map((item, index) => (
                        <SessionItem name={item.name} timeContinued={item.timeContinued} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.finishBtn}>
                <CustomButton text={'Confirm Cancellation'} onPress={handleSubmit} />
                <CustomButton text={'Back'} onPress={handleSubmit}
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
            <View
                style={styles.containerItem}>
                <View
                    style={[
                        styles.item,
                        styles.itemLesson,
                    ]}>
                    <View
                        style={[
                            styles.decorItemLine,
                            styles.decorItemLineLesson,
                        ]}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.time}>{timeContinued}</Text>
                    </View>
                </View>
            </View>
        );
    },
);