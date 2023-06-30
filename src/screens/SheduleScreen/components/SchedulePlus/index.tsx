import React, { FC, memo, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Plus from '../../../../../assets/svg/schedule/Plus';
import { AddSessionModal } from '../AddSessionModal';
import styles from './styles';
import { dispatch } from '../../../../store/store';
import { updateCurrentClassRequestAction } from '../../../../store/shedule';

interface ISchedulePlus {
  onButtonPress: () => void
}
export const SchedulePlus: FC<ISchedulePlus> = memo(({ onButtonPress }) => {
  const [visible, setVisible] = useState(false);
  const onChangeVisible = () => {
    setVisible(!visible);
    dispatch(
      updateCurrentClassRequestAction({
        Class: {
          Name: '',
          StartDate: '',
          EndDate: '',
          EndNumber: 0,
          EndScheduleType: '',
          MakeupRequired: false,
          TrackPrepayment: false,

        },
        Location: {
          LocationId: 0,
          LocationType: '',
          Url: '',
          AddressLine: '',
        },
        Students: [],
        Slots: [],
        Sessions: [],
      })
    );

  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onChangeVisible}>
          <Plus />
        </TouchableOpacity>
      </View>
      <AddSessionModal visible={visible} visibleHandler={onChangeVisible} onPress={onButtonPress} />
    </>
  );
});
