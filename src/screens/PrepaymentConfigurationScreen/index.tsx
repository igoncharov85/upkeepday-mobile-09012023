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


interface IPrepaymentConfigurationScreen { }

export const PrepaymentConfigurationScreen: React.FC<IPrepaymentConfigurationScreen> = () => {
    const { createCurrentClassRequest } = useAppSelector(state => state.schedule)
    const [makeupRequired, setMakeupRequired] = useState(createCurrentClassRequest.Class?.MakeupRequired ? 1 : 0)
    const [trackPrepayment, setTrackPrepayment] = useState(createCurrentClassRequest.Class?.TrackPrepayment ? 1 : 0)
    const navigation = useNavigation();

    const goTextStep = () => {
      console.log('makeupRequired', makeupRequired, 'trackPrepayment', trackPrepayment)
      // @ts-ignore
      navigation.navigate(NavigationEnum.PAYMENT_TRACKING_SET_UP, {
        makeupRequired: makeupRequired,
        trackPrepayment: trackPrepayment,
      })
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
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.subtitle}>UpkeepDay will track prepayments against student’s attendance</Text>
            </View>
            <View>
                <ListGradientCircleButtons onPress={HandleMakeupRequired} label='Do you require to schedule a make-up for this Class?' buttons={[{ title: 'Yes', subtitle: ' - I need to make up a class if student(s) was absent' }, { title: 'No', subtitle: ' - I don’t need to make up a class if student(s) was absent' }]} />
                <ListGradientCircleButtons onPress={HandleTrackPrepayment} twoLines={true} label='Do you receive Prepayment for this Class?' buttons={[{ title: 'Yes', subtitle: ' - Track my prepayments' }, { title: 'No', subtitle: ' ' }]} />
            </View>
            <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
                <CustomButton text={'Next step'} onPress={goTextStep} />
            </View>
        </View >
    )
}
