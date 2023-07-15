import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import TimePicker from '../../../screens/SheduleScreen/components/TimePicker';
import { CustomButton } from '../../UI/CustomButton';
import { ScreenHeader } from '../../ScreenHeader';
import CustomTimePicker from './CustomTimePicker';

interface IDurationSessionModalModal {
}

const DurationSessionModal = ({

}: IDurationSessionModalModal) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { addDuration, duration } = route.params as any
  const goBack = () => navigation.goBack();
  const [time, setTime] = useState({});

  const onSetTime = (time: any) => {
    console.log('time', time)
    setTime(time)

  }
  const onSave = () => {
    addDuration(time)
    goBack()
  }
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity style={styles.background} onPress={goBack} activeOpacity={1} />
        <View style={styles.container}>
          <ScreenHeader text="Duration set-up" withBackButton={true} onBackPress={goBack} />
          <CustomTimePicker
            block={{ hour: true, minute: true, dayPart: true }}
            visible={true}
            onSetTime={onSetTime}
            data={{ hour: 0, minute: 0 }}
            maxDuration={duration}
          />
          <CustomButton text="Save" onPress={onSave} />
        </View>
      </View>
    </>
  );
};

export default DurationSessionModal;
