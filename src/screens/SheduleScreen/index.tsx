import React, {FC, memo, useEffect} from 'react';
import {Text, View} from 'react-native';
import {INavigationBase} from '../../common/types/component.styles';
import {CustomButton} from '../../components/UI/CustomButton';
import NavigationActions from '../../services/navigation-service';
import {logoutAction} from '../../store/auth/actions';
import {
  addLocationAction,
  fetchLocationAction,
} from '../../store/location/actions';
import {
  createScheduleAction,
  generateScheduleAction,
} from '../../store/shedule/actions';
import {dispatch} from '../../store/store';
import {fetchUsersAction} from '../../store/user/actions';
import styles from './styles';

interface IHomeScreen extends INavigationBase {}
export const ScheduleScreen: FC<IHomeScreen> = memo(({navigation}) => {
  useEffect(() => {
    NavigationActions.setNavigator(navigation);
  }, []);

  useEffect(() => {
    console.log('worked');
    dispatch(
      createScheduleAction({
        ClassName: 'Music',
        ClassLocationType: 1,
        ClassLocationId: 3,
        StartDate: '2023-01-01',
        EndScheduleType: 'FixedClassesNumber',
        EndNumber: 10,
        MakeupRequired: true,
        TrackPrepayment: false,
        ExistingStudents: [{StudentId: 2}, {StudentId: 3}],
        NewStudents: [],
        WeekTimeSlots: [
          {
            Duration: 60,
            DayOfWeek: 1,
            StartTime: '17:30:00',
          },
          {
            Duration: 60,
            DayOfWeek: 3,
            StartTime: '18:30:00',
          },
          {
            Duration: 60,
            DayOfWeek: 3,
            StartTime: '16:00:00',
          },
        ],
        ScheduledEntries: [
          {
            Duration: 60,
            WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302',
            StartDateTime: '2023-01-03T17:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9',
            StartDateTime: '2023-01-05T16:00:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6',
            StartDateTime: '2023-01-05T18:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302',
            StartDateTime: '2023-01-10T17:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9',
            StartDateTime: '2023-01-12T16:00:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6',
            StartDateTime: '2023-01-12T18:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302',
            StartDateTime: '2023-01-17T17:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '6d90e553-393f-4c46-9969-90cbdc699ae9',
            StartDateTime: '2023-01-19T16:00:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: '02ec4f25-36ff-4d9a-af29-fa41fb4f11a6',
            StartDateTime: '2023-01-19T18:30:00',
          },
          {
            Duration: 60,
            WeekTimeSlotId: 'a99a1aa5-be98-475e-a401-3abcbd51d302',
            StartDateTime: '2023-01-24T17:30:00',
          },
        ],
      }),
    );
    //dispatch(fetchUsersAction())
    /*dispatch(
      generateScheduleAction({
        ScheduleType: 'FixedClassesNumber',
        StartDate: '2023-01-01',
        Number: 10,
        WeekTimeSlots: [
          {DayOfWeek: 1, StartTime: '17:30:00', Duration: 60},
          {DayOfWeek: 3, StartTime: '18:30:00', Duration: 60},
          {DayOfWeek: 3, StartTime: '16:00:00', Duration: 60},
        ],
      }),
    );*/
    /*dispatch(addLocationAction({
      AddressLine: 'string',
      City: 'string',
      Country: 'string',
      LocationType: 'string',
      Name: 'string',
      PostalCode: 'string',
      State: 'string',
      Url: 'string'
    }))*/
    //dispatch(fetchLocationAction())
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student Screen</Text>
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={() => dispatch(logoutAction())}
          text={'logout'}
        />
      </View>
    </View>
  );
});
