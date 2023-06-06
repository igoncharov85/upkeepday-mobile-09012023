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


interface IPrepaymentConfigurationScreen { }

export const PrepaymentConfigurationScreen: React.FC<IPrepaymentConfigurationScreen> = () => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule)
    const [makeupRequired, setMakeupRequired] = useState(0)
    const [trackPrepayment, setTrackPrepayment] = useState(0)
    const navigation = useNavigation();

    const location = createCurrentClassRequest.Location?.LocationType === "Online" ? {
        LocationType: createCurrentClassRequest.Location?.LocationType,
        Url: createCurrentClassRequest.Location?.Url
    } : {
        LocationId: createCurrentClassRequest.Location?.LocationId,
    }
    const goTextStep = () => {
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
                Location: location,
                Students: createCurrentClassRequest.Students as IStudents[],
                Slots: createCurrentClassRequest.Slots as IWeekTimeSlot[],
                Sessions: createCurrentClassRequest.Sessions as IGeneratedScheduleEntries[]
            }
        ))
        console.log(location, 'location');

        //@ts-ignore
        navigation.navigate(NavigationEnum.HOME_SCREEN, { key: Date.now() })
    };


    const HandleMakeupRequired = (agreement: number) => {
        setMakeupRequired(agreement);
    }
    const HandleTrackPrepayment = (agreement: number) => {
        setTrackPrepayment(agreement);
    }

    return (
        <View style={{ height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <ScreenHeader text={'Prepayment Configuration'} onBackPress={() => navigation.goBack()} withBackButton={true} />
            </View>
            <Text style={styles.subtitle}>CP will track prepayments against student’s attendance</Text>
            <View>
                <ListGradientCircleButtons onPress={HandleMakeupRequired} label='Do you require to schedule a make-up for this Class?' buttons={[{ title: 'Yes', subtitle: ' - I need to make up a class if student(s) was absent' }, { title: 'No', subtitle: ' - I don’t need to make up a class if student(s) was absent' }]} />
                <ListGradientCircleButtons onPress={HandleTrackPrepayment} twoLines={true} label='Do you receive Prepayment for this Class?' buttons={[{ title: 'Yes', subtitle: ' - Track my prepayments' }, { title: 'No', subtitle: ' ' }]} />
            </View>
            <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={'Next Step'} onPress={goTextStep} />
            </View>
        </View >
    )
}
