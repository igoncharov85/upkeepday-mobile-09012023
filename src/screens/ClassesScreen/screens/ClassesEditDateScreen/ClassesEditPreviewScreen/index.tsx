import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Conflict from '../../../../../../assets/svg/Conflict';
import {NavigationEnum} from '../../../../../common/constants/navigation';
import {ScreenHeader} from '../../../../../components/ScreenHeader';

import {CustomButton} from '../../../../../components/UI/CustomButton';
import {ScreenLoading} from '../../../../../components/UI/ScreenLoading';
import {useTypedNavigation} from '../../../../../hook/useTypedNavigation';
import {useTypedRoute} from '../../../../../hook/useTypedRoute';
import {findScheduleConflicts} from '../../../../../services/utils/findConflict.util';
import {getWeekDates} from '../../../../../services/utils/fullDateToValue.util';
import {addDayAndHoursToDate} from '../../../../../services/utils/generateDate.util';
import {PatchClassesAction} from '../../../../../store/classes/actions';
import {useAppSelector} from '../../../../../store/hooks';
import {dispatch} from '../../../../../store/store';
import {DaysOfWeek} from './DaysOfWeek';
import styles from './styles';
import {WeekTable} from './WeekTable';

interface IDatePreviewScreen {}
const ClassesEditPreviewScreen: React.FC<IDatePreviewScreen> = () => {
  const {navigate, goBack} = useTypedNavigation();
  const {params} = useTypedRoute<NavigationEnum.CLASSES_EDIT_PREVIEW_SCREEN>();
  const {item, sendString} = params;
  const today = new Date();
  const weekDates = getWeekDates(today);

  const [startDateWeek, setStartDateWeek] = useState(
    new Date(weekDates.startDate),
  );
  const [endDateWeek, setEndDateWeek] = useState(new Date(weekDates.endDate));
  const [screenLoading, setScreenLoading] = useState(false);

  const {currentSession, generatedSessions, loading} = useAppSelector(
    state => state.classes,
  );
  const classes = useAppSelector(state => state.classes);
  const [slots, setSlots] = useState<any[]>(generatedSessions as []);
  const [conflict, setConflict] = useState<any[]>(
    findScheduleConflicts(slots, currentSession),
  );

  const handeScheduleSlots = (slots: any[]) => {
    setSlots(slots);
    setConflict(findScheduleConflicts(slots, currentSession));
  };

  const goToNextWeek = () => {
    setStartDateWeek(
      new Date(addDayAndHoursToDate(startDateWeek.toISOString(), 7, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(endDateWeek.toISOString(), 7, 0)),
    );
  };
  const goToPrevWeek = () => {
    setStartDateWeek(
      new Date(addDayAndHoursToDate(startDateWeek.toISOString(), -7, 0)),
    );
    setEndDateWeek(
      new Date(addDayAndHoursToDate(endDateWeek.toISOString(), -7, 0)),
    );
  };

  const onSave = () => {
    navigate(NavigationEnum.RESULT_CLASS_MODAL, {
      item: {
        ...item,
        ScheduledClasses: slots.length,
      },

      actionBtn: () => {
        dispatch(
          PatchClassesAction({
            id: item.ClassId,
            to: sendString,
            Sessions: slots,
          }),
        );
        navigate(NavigationEnum.CLASSES_TAB);
      },
      nameAction: 'Confirm',
    });
  };

  useEffect(() => {
    return () => {
      setScreenLoading(false);
    };
  }, []);
  useEffect(() => {
    if (generatedSessions?.length) {
      setScreenLoading(true);
    }
  }, [loading, generatedSessions]);

  return loading ? (
    <ScreenLoading />
  ) : (
    <View style={{height: '100%'}}>
      <View style={styles.header}>
        <ScreenHeader
          text={'Preview Day and Time'}
          onBackPress={goBack}
          withBackButton={true}
        />
      </View>
      <View style={{marginHorizontal: 20, marginTop: 12}}>
        <DaysOfWeek startOfWeek={startDateWeek} />
      </View>
      <View style={{flex: 1}}>
        <WeekTable
          startOfWeek={startDateWeek}
          endOfWeek={endDateWeek}
          onHandleData={handeScheduleSlots}
          conflict={conflict}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 8,
        }}>
        <View>
          <CustomButton
            text={'<'}
            onPress={goToPrevWeek}
            style={{height: 24, width: 40}}
          />
        </View>
        {conflict.length > 0 && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Conflict />
            <Text
              style={{
                marginLeft: 4,
                fontSize: 12,
                lineHeight: 19,
                color: '#F4380E',
              }}>
              You have a conflict. Please check each week
            </Text>
          </View>
        )}
        <View>
          <CustomButton
            text={'>'}
            onPress={goToNextWeek}
            style={{height: 24, width: 40}}
          />
        </View>
      </View>
      <Text style={{textAlign: 'center'}}>
        <Text style={{fontSize: 17, lineHeight: 34, fontWeight: '700'}}>
          Scheduled Classes:{' '}
        </Text>
        {/* <Text style={{ opacity: 0.4 }}>{slots?.length || 0}</Text> */}
        <Text style={{opacity: 0.4}}>
          {item.ScheduledClasses} + {slots?.length - item.ScheduledClasses}
        </Text>
      </Text>
      <View style={{padding: 20, justifyContent: 'flex-end'}}>
        <CustomButton
          text={'Save'}
          onPress={!conflict.length ? onSave : () => {}}
          disabled={!(conflict.length < 1)}
        />
      </View>
    </View>
  );
};

export default ClassesEditPreviewScreen;
