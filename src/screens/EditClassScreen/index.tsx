import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import { NavigationEnum } from '../../common/constants/navigation';

import { ScreenHeader } from '../../components/ScreenHeader';
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { useTypedRoute } from '../../hook/useTypedRoute';
import { updatedStatusClassesAction } from '../../store/classes/actions';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';
import styles from './styles';

export const EditClassScreen = () => {
  const { navigate, goBack } = useTypedNavigation();
  const route = useRoute();
  const { item } = route.params as any;
  console.log(item, 'item')
  const relloverClass = () => {
    const classLesson = item;

    classLesson &&
      dispatch(
        updateCurrentClassRequestAction({
          Class: {
            Name: classLesson.Name,
            StartDate: '',
            EndDate: '',
            EndNumber: classLesson.EndNumber,
            EndScheduleType: classLesson.EndScheduleType,
            MakeupRequired: classLesson.MakeupRequired,
            TrackPrepayment: classLesson.TrackPrepayment,
          },
          Location: {
            Name: classLesson.Location.Address,
            Url: classLesson.Location.Url,
            LocationType: classLesson.Location.LocationType,
            AddressLine: classLesson.Location.Address,
            LocationId: classLesson.Location.LocationId,
          },
          Students: classLesson.Students,
          Slots: classLesson.Slots,
          Sessions: [],
        }),
      );
  };
  return (
    <View style={styles.container}>
      <ScreenHeader
        text={item?.Name}
        withBackButton={true}
        onBackPress={() => goBack()}
      />
      <View style={styles.buttonWrapper}>
        <ClassesEditButton
          title={'Update Class Name and Location'}
          navigationName={NavigationEnum.CLASSES_EDIT_NAME_SCREEN}
          data={item}
        />
        <ClassesEditButton
          title={'Update Students'}
          navigationName={NavigationEnum.CLASSES_STUDENT_SCREEN}
          data={item}
        />
        <ClassesEditButton
          title={'Rollover Class'}
          navigationName={NavigationEnum.ADD_CLASS_SCREEN}
          action={relloverClass}
          data={{ screenName: 'Rollover Class', item: item?.item }}
        />
        <ClassesEditButton
          title={'Archive Class'}
          navigationName={NavigationEnum.RESULT_CLASS_MODAL}
          data={{
            item: item,
            actionBtn: () => {
              dispatch(
                updatedStatusClassesAction({
                  id: item?.ClassId,
                  Status: 'Archived',
                }),
              );
              navigate(NavigationEnum.CLASSES_TAB);
            },

            nameAction: 'Archive',
          }}
        />
      </View>
    </View>
  );
};

const ClassesEditButton = ({
  title,
  navigationName,
  data,
  action,
}: {
  title: string;
  navigationName: string;
  data?: any;
  action?: any;
}) => {
  action && action();
  const { navigate } = useNavigation();
  const onPress = () => {
    console.log('---------\ndata\n', data)
    // @ts-ignore
    navigate(navigationName, data ? data : null);
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.block}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{title}</Text>
        <ArrowRight />
      </View>
    </TouchableOpacity>
  );
};
