import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListButtons } from '../AddClassScreen/components/ListButtons';
import { CustomButton } from '../../components/UI/CustomButton';
import styles from './styles';
import { ListGradientCircleButtons } from './ListGradientCircleButtons';
import { dispatch } from '../../store/store';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { createScheduleAction } from '../../store/shedule/actions';
import { useAppSelector } from '../../store/hooks';
import { IExistingStudent, IGeneratedScheduleEntries, IWeekTimeSlot } from '../../common/types/schedule.types';
import { IUserStudent } from '../../common/types/user';

interface IPrepaymentConfigurationScreen { }

export const PrepaymentConfigurationScreen: React.FC<IPrepaymentConfigurationScreen> = () => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule)
    const [makeupRequired, setMakeupRequired] = useState(0)
    const [trackPrepayment, setTrackPrepayment] = useState(0)
    const navigation = useNavigation();
    //@ts-ignore
    const goTextStep = () => navigation.navigate(NavigationEnum.ADD_STUDENTS_SCREEN);

    const HandleMakeupRequired = (agreement: number) => {
        setMakeupRequired(agreement);
    }
    const HandleTrackPrepayment = (agreement: number) => {
        setTrackPrepayment(agreement);
    }

    useEffect(() => {
        return () => {
            dispatch(createScheduleAction({
                ClassName: createCurrentClassRequest.ClassName as string,
                ClassLocationType: createCurrentClassRequest.ClassLocationType as number,
                ClassLocationId: createCurrentClassRequest.ClassLocationId as number,
                StartDate: createCurrentClassRequest.StartDate as string,
                EndScheduleType: createCurrentClassRequest.EndScheduleType as string,
                EndNumber: createCurrentClassRequest.EndNumber as number,
                MakeupRequired: !makeupRequired,
                TrackPrepayment: !trackPrepayment,
                ExistingStudents: createCurrentClassRequest.ExistingStudents as IExistingStudent[],
                NewStudents: createCurrentClassRequest.NewStudents as IUserStudent[],
                WeekTimeSlots: createCurrentClassRequest.WeekTimeSlots as IWeekTimeSlot[],
                ScheduledEntries: createCurrentClassRequest.ScheduledEntries as IGeneratedScheduleEntries[],
            }))
        };
    }, []);
    return (
        <View style={{ height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <ScreenHeader text={'Prepayment Configuration'} onBackPress={goTextStep} withBackButton={true} />
            </View>
            <Text style={styles.subtitle}>CP will track prepayments against student’s attendance</Text>
            <View>
                <ListGradientCircleButtons onPress={HandleMakeupRequired} label='Do you require to schedule a make-up for this Class:' buttons={[{ title: 'Yes', subtitle: ' - I need to make up a class if student(s) was absent' }, { title: 'No', subtitle: ' - I don’t need to make up a class if student(s) was absent' }]} />
                <ListGradientCircleButtons onPress={HandleTrackPrepayment} twoLines={true} label='Do you receive Prepayment for this Class:' buttons={[{ title: 'Yes', subtitle: ' - Track my prepayments' }, { title: 'No', subtitle: ' ' }]} />
            </View>
            <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={'Next Step'} />
            </View>
        </View >
    )
}

