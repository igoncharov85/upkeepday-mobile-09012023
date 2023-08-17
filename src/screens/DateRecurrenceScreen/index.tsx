import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationEnum } from '../../common/constants/navigation';
import { IWeekTimeSlot } from '../../common/types/schedule.types';
import { ScreenHeader } from '../../components/ScreenHeader';
import { CustomButton } from '../../components/UI/CustomButton';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { getWeekDates } from '../../services/utils/fullDateToValue.util';
import { useAppSelector } from '../../store/hooks';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { generateScheduleAction } from '../../store/shedule/actions';
import { dispatch } from '../../store/store';
import { EndScheduleType } from '../SelectDateScreen';
import styles from './styles';
import { WeekTable } from './WeekTable';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface IDateRecurrenceScreen { }
export const DateRecurrenceScreen: React.FC<IDateRecurrenceScreen> = () => {
  const [weekTimeSlots, setWeekTimeSlots] = useState<IWeekTimeSlot[]>([]);
  const { goBack, navigate } = useTypedNavigation();
  const route = useRoute();
  const today = new Date();
  const weekDates = getWeekDates(today);
  //@ts-ignore
  let { endScheduleType, finishDate, numberOf } = route?.params || {
    endScheduleType: EndScheduleType.FixedClassesNumber,
    finishDate: '',
    numberOf: 0,
  };
  const { createCurrentClassRequest } = useAppSelector(state => state.schedule);

  const getNumber =
    endScheduleType === EndScheduleType.FixedClassesNumber
      ? createCurrentClassRequest.Class?.EndNumber
      : numberOf;

  const goNextStep = async () => {
    const numberClass = createCurrentClassRequest.Class?.EndNumber;
    const endDate = finishDate;

    dispatch(
      updateCurrentClassRequestAction({
        Class: {
          EndNumber: getNumber,
          EndDate: endDate,
        },
      }),
    );
    dispatch(
      generateScheduleAction({
        ScheduleType: createCurrentClassRequest.Class!
          .EndScheduleType as string,
        StartDate: createCurrentClassRequest.Class!.StartDate as string,
        Number: getNumber,
        EndDate: (endDate as string) || '',
        Slots: weekTimeSlots,
      }),
    );

    navigate(NavigationEnum.DATE_PREVIEW_SCREEN);
  };

  const setDataForWeek = (data: IWeekTimeSlot[]) => {
    setWeekTimeSlots(data);
  };

  return (
    <View style={{ height: '100%' }}>
      <View style={styles.header}>
        <ScreenHeader
          text={'Day and Time Recurrence'}
          onBackPress={goBack}
          withBackButton={true}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>
          Populate a week and UpkeepDay will replicate other recurrences
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 56, marginRight: 20 }}>
        {days.map(day => (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.daysOfWeekText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <WeekTable
          startOfWeek={weekDates.startDate}
          endOfWeek={weekDates.endDate}
          onHandleData={setDataForWeek}
        />
      </View>
      <View style={{ padding: 20, justifyContent: 'flex-end' }}>
        <CustomButton
          text={'Next Step'}
          disabled={!weekTimeSlots.length}
          onPress={weekTimeSlots.length ? goNextStep : () => { }}
        />
      </View>
    </View>
  );
};
