import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
import { CustomButton } from '../../components/UI/CustomButton';
import styles from './styles';
import { ListGradientCircleButtons } from './ListGradientCircleButtons';
import { dispatch } from '../../store/store';
import { createScheduleAction } from '../../store/shedule/actions';
import { useAppSelector } from '../../store/hooks';
import { IGeneratedScheduleEntries, IStudents, IWeekTimeSlot } from '../../common/types/schedule.types';
import { findLatestLessonWithDuration } from '../../services/utils/calculateNumberOfClasses';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectBusinessAccount } from '../../store/businessAccount';
import { scaleVertical } from '../../services/utils/Utils';

interface IPrepaymentConfigurationScreen { }

export const PrepaymentConfigurationScreen: React.FC<IPrepaymentConfigurationScreen> = () => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
    const { isEdit } = useAppSelector(selectBusinessAccount);
    const [makeupRequired, setMakeupRequired] = useState(0);
    const [trackPrepayment, setTrackPrepayment] = useState(0);
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<any>>();

    const createClass = () => {
        if (isEdit) {

        } else {
            dispatch(createScheduleAction(
                {
                    Class: {
                        Name: createCurrentClassRequest.Class?.Name,
                        StartDate: createCurrentClassRequest.Class?.StartDate,
                        EndDate: createCurrentClassRequest.Class?.EndScheduleType == 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndDate : undefined,
                        EndNumber: createCurrentClassRequest.Class?.EndScheduleType != 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndNumber : undefined,
                        EndScheduleType: createCurrentClassRequest.Class?.EndScheduleType,
                        MakeupRequired: !makeupRequired as boolean,
                        TrackPrepayment: !trackPrepayment as boolean
                    },
                    Location: createCurrentClassRequest?.Location || {},
                    Students: createCurrentClassRequest.Students as IStudents[],
                    Slots: createCurrentClassRequest.Slots as IWeekTimeSlot[],
                    Sessions: createCurrentClassRequest.Sessions as IGeneratedScheduleEntries[],
                    PaymentAmount: 0,
                    PaymentType: '',
                },
            ));
        };
        navigate(NavigationEnum.HOME_SCREEN, { key: Date.now() })
    };

    const goTextStep = () => {
        const endDate = findLatestLessonWithDuration(createCurrentClassRequest?.Sessions);
        navigate(trackPrepayment
            ? NavigationEnum.RESULT_CLASS_MODAL
            : NavigationEnum.PAYMENT_TRACKING_SET_UP,
            {
                makeupRequired: makeupRequired,
                trackPrepayment: trackPrepayment,
                item: {
                    Name: createCurrentClassRequest.Class?.Name,
                    StartDate: createCurrentClassRequest.Class?.StartDate,
                    EndDate: endDate,
                    ScheduledClasses: createCurrentClassRequest.Sessions?.length,
                    TotalClassesHeld: 0,
                    Students: createCurrentClassRequest.Students,
                    Location: createCurrentClassRequest.Location,
                    TrackPrepayment: !trackPrepayment as boolean,
                },
                nameAction: 'Confirm',
                actionBtn: createClass,
            }
        );
    };

    const HandleMakeupRequired = (agreement: number) => {
        setMakeupRequired(agreement);
    }
    const HandleTrackPrepayment = (agreement: number) => {
        console.log(agreement)
        setTrackPrepayment(agreement);
    }

    return (
        <View style={{ height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <ScreenHeader text={'Prepayment Configuration'} onBackPress={goBack} withBackButton={true} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.subtitle}>UpkeepDay will track prepayments against student’s attendance</Text>
            </View>
            <View>
                <ListGradientCircleButtons onPress={HandleMakeupRequired} label='Do you require to schedule a make-up for this Class?' buttons={[{ title: 'Yes', subtitle: ' - I need to make up a class if student(s) was absent' }, { title: 'No', subtitle: ' - I don’t need to make up a class if student(s) was absent' }]} />
                <ListGradientCircleButtons onPress={HandleTrackPrepayment} twoLines={true} label='Do you receive Prepayment for this Class?' buttons={[{ title: 'Yes', subtitle: ' - Track my prepayments' }, { title: 'No', subtitle: ' ' }]} />
            </View>
            <View style={{ flex: 1, padding: scaleVertical(20), justifyContent: 'flex-end' }}>
                <CustomButton text={'Next step'} onPress={goTextStep} />
            </View>
        </View >
    )
}
