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
    const { GeneratedScheduleEntries, WeekTimeSlots, loading } = useAppSelector(state => state.schedule);
    const [makeupRequired, setMakeupRequired] = useState(0)
    const [trackPrepayment, setTrackPrepayment] = useState(0)
    const navigation = useNavigation();
    //@ts-ignore
    const goTextStep = () => navigation.navigate(NavigationEnum.HOME_SCREEN);
    console.log(createCurrentClassRequest.NewStudents, 'NewStudents');

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
                MakeupRequired: !!makeupRequired,
                TrackPrepayment: !!trackPrepayment,
                ExistingStudents: createCurrentClassRequest.ExistingStudents as [],
                NewStudents: [],
                WeekTimeSlots: WeekTimeSlots as IWeekTimeSlot[],
                ScheduledEntries: GeneratedScheduleEntries
            }
            ))
        };
    }, []);
    console.log({
        ClassName: createCurrentClassRequest.ClassName as string,
        ClassLocationType: createCurrentClassRequest.ClassLocationType as number,
        ClassLocationId: createCurrentClassRequest.ClassLocationId as number,
        StartDate: createCurrentClassRequest.StartDate as string,
        EndScheduleType: createCurrentClassRequest.EndScheduleType as string,
        EndNumber: createCurrentClassRequest.EndNumber as number,
        MakeupRequired: !!makeupRequired,
        TrackPrepayment: !!trackPrepayment,
        ExistingStudents: createCurrentClassRequest.ExistingStudents as [],
        NewStudents: [],
        WeekTimeSlots: WeekTimeSlots as IWeekTimeSlot[],
        ScheduledEntries: GeneratedScheduleEntries
    });

    return (
        <View style={{ height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <ScreenHeader text={'Prepayment Configuration'} onBackPress={() => navigation.goBack()} withBackButton={true} />
            </View>
            <Text style={styles.subtitle}>CP will track prepayments against student’s attendance</Text>
            <View>
                <ListGradientCircleButtons onPress={HandleMakeupRequired} label='Do you require to schedule a make-up for this Class:' buttons={[{ title: 'Yes', subtitle: ' - I need to make up a class if student(s) was absent' }, { title: 'No', subtitle: ' - I don’t need to make up a class if student(s) was absent' }]} />
                <ListGradientCircleButtons onPress={HandleTrackPrepayment} twoLines={true} label='Do you receive Prepayment for this Class:' buttons={[{ title: 'Yes', subtitle: ' - Track my prepayments' }, { title: 'No', subtitle: ' ' }]} />
            </View>
            <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={'Next Step'} onPress={goTextStep} />
            </View>
        </View >
    )
}

// useEffect(() => {
    //     return () => {
    //         dispatch(createScheduleAction({
    //             ClassName: 'Music',
    //             ClassLocationType: 1,
    //             ClassLocationId: 3,
    //             StartDate: '2023-01-01',
    //             EndScheduleType: 'FixedClassesNumber',
    //             EndNumber: 10,
    //             MakeupRequired: true,
    //             TrackPrepayment: false,
    //             ExistingStudents: [
    //                 { StudentId: 2 },
    //                 { StudentId: 3 }],
    //             NewStudents: [
    //                 { FirstName: 'First1', LastName: 'Last1', Email: 'First1.Last1@gmail.com', PhoneCountry: 1, PhoneNumber: '111-23-2244', Notes: '', StudentId: 4, EnrolledClasses: [] }],
    //             WeekTimeSlots: [
    //                 { Duration: 60, WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302', DayOfWeek: 1, StartTime: '17:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6', DayOfWeek: 3, StartTime: '18:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9', DayOfWeek: 3, StartTime: '16:00:00' }] as IWeekTimeSlot[],
    //             ScheduledEntries: [
    //                 { Duration: 60, WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302', StartDateTime: '2023-01-03T17:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9', StartDateTime: '2023-01-05T16:00:00' },
    //                 { Duration: 60, WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6', StartDateTime: '2023-01-05T18:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302', StartDateTime: '2023-01-10T17:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9', StartDateTime: '2023-01-12T16:00:00' },
    //                 { Duration: 60, WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6', StartDateTime: '2023-01-12T18:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302', StartDateTime: '2023-01-17T17:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9', StartDateTime: '2023-01-19T16:00:00' },
    //                 { Duration: 60, WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6', StartDateTime: '2023-01-19T18:30:00' },
    //                 { Duration: 60, WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302', StartDateTime: '2023-01-24T17:30:00' }]
    //         }
    //         ))
    //     };
    // }, []);