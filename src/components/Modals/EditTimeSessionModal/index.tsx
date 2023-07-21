import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { CustomButton } from '../../UI/CustomButton';
import { ScreenHeader } from '../../ScreenHeader';
import CustomTimePicker from './CustomTimePicker';

interface IEditTimeSessionModalModal {
}

const EditTimeSessionModal = ({

}: IEditTimeSessionModalModal) => {
  const navigation = useNavigation()
  const route = useRoute()
  const { addDuration, newTime } = route.params as any
  const goBack = () => navigation.goBack();
  const [time, setTime] = useState({});

  const onSetTime = (time: any) => {
    setTime(time)
  }
  const onSave = () => {
    addDuration(time)
    goBack()
  }
  const currentTime = new Date(newTime);
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity style={styles.background} onPress={goBack} activeOpacity={1} />
        <View style={styles.container}>
          <ScreenHeader text="Set start time" withBackButton={true} onBackPress={goBack} />
          <CustomTimePicker
            onSetTime={onSetTime}
            data={{ hour: currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours(), minute: currentTime.getMinutes(), dayPart: currentTime.getHours() > 12 ? "PM" : 'AM' }}
            maxDuration={1600}
          />
          <CustomButton text="Save" onPress={onSave} />
        </View>
      </View>
    </>
  );
};

export default EditTimeSessionModal;
