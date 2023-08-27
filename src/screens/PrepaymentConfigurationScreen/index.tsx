import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationEnum } from '../../common/constants/navigation';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomButton } from '../../components/UI/CustomButton';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { useAppSelector } from '../../store/hooks';
import { ListGradientCircleButtons } from './ListGradientCircleButtons';
import styles from './styles';
import { dispatch } from '../../store/store';
import { createScheduleAction } from '../../store/shedule/actions';
import { IGeneratedScheduleEntries, IStudents, IWeekTimeSlot } from '../../common/types/schedule.types';

import { findLatestLessonWithDuration } from '../../services/utils/calculateNumberOfClasses';

interface IPrepaymentConfigurationScreen { }

export const PrepaymentConfigurationScreen: React.FC<
  IPrepaymentConfigurationScreen
> = () => {
  const { createCurrentClassRequest } = useAppSelector(state => state.schedule);
  const [makeupRequired, setMakeupRequired] = useState(
    createCurrentClassRequest.Class?.MakeupRequired ? 1 : 0,
  );
  const [trackPrepayment, setTrackPrepayment] = useState(
    createCurrentClassRequest.Class?.TrackPrepayment ? 1 : 0,
  );
  const { navigate, goBack } = useTypedNavigation();
  const location = createCurrentClassRequest.Location?.LocationType === "Online" ? {
    LocationType: createCurrentClassRequest.Location?.LocationType,
    Url: createCurrentClassRequest.Location?.Url
  } : {
    LocationId: createCurrentClassRequest.Location?.LocationId,
  }
  const goTextStepWithoutPayment = () => {
    // @ts-ignore
    const endDate = findLatestLessonWithDuration(createCurrentClassRequest?.Sessions);

    //@ts-ignore
    navigate('RESULT_CLASS_MODAL', {
      item: {
        Name: createCurrentClassRequest.Class?.Name,
        StartDate: createCurrentClassRequest.Class?.StartDate,
        EndDate: endDate,
        ScheduledClasses: createCurrentClassRequest.Sessions?.length,
        TotalClassesHeld: 0,
        Students: createCurrentClassRequest.Students,
        Location: {
          Address: createCurrentClassRequest.Location?.AddressLine,
        },
        TrackPrepayment: !trackPrepayment as boolean,
      },
      actionBtn: () => {
        dispatch(createScheduleAction(
          {
            Class: {
              Name: createCurrentClassRequest.Class?.Name,
              StartDate: createCurrentClassRequest.Class?.StartDate,
              EndDate: createCurrentClassRequest.Class?.EndScheduleType == 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndDate : undefined,
              EndNumber: createCurrentClassRequest.Class?.EndScheduleType != 'SpecificEndDate' ? createCurrentClassRequest.Class?.EndNumber : undefined,
              EndScheduleType: createCurrentClassRequest.Class?.EndScheduleType,
              MakeupRequired: true,
              TrackPrepayment: !trackPrepayment as boolean,
              PaymentAmount: 0,
              PaymentType: 'FixedAmount'
            },
            Location: location,
            Students: createCurrentClassRequest.Students as IStudents[],
            Slots: createCurrentClassRequest.Slots as IWeekTimeSlot[],
            Sessions: createCurrentClassRequest.Sessions as IGeneratedScheduleEntries[],
          }
        ))
        //@ts-ignore
        navigate(NavigationEnum.HOME_SCREEN, { key: Date.now() })
      },
      nameAction: 'Confirm',
    })
  };
  const goTextStep = () => {
    console.log(
      'makeupRequired',
      makeupRequired,
      'trackPrepayment',
      trackPrepayment,
    );
    trackPrepayment ? goTextStepWithoutPayment() : navigate(NavigationEnum.PAYMENT_TRACKING_SET_UP, {
      makeupRequired: 1,
      trackPrepayment: trackPrepayment,
    });
  };

  const HandleMakeupRequired = (agreement: number) => {
    setMakeupRequired(agreement);
  };
  const HandleTrackPrepayment = (agreement: number) => {
    setTrackPrepayment(agreement);
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <ScreenHeader
          text={'Prepayment Configuration'}
          onBackPress={() => goBack()}
          withBackButton={true}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.subtitle}>
          UpkeepDay will track prepayments against student’s attendance
        </Text>
      </View>
      <View>
        <ListGradientCircleButtons
          onPress={HandleTrackPrepayment}
          twoLines={true}
          label="Do you receive Prepayment for this Class?"
          buttons={[
            { title: 'Yes', subtitle: ' - Track my prepayments' },
            { title: 'No', subtitle: ' ' },
          ]}
        />
      </View>
      <View style={{ flex: 1, padding: 20, justifyContent: 'flex-end' }}>
        <CustomButton text={'Next step'} onPress={goTextStep} />
      </View>
    </View>
  );
};
