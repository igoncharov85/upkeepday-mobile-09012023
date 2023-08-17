import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTypedNavigation} from '../../../hook/useTypedNavigation';
import {ScreenHeader} from '../../ScreenHeader';
import {CustomButton} from '../../UI/CustomButton';
import CustomTimePicker from './CustomTimePicker';
import styles from './styles';

interface IDurationSessionModalModal {}

const DurationSessionModal = ({}: IDurationSessionModalModal) => {
  const {goBack} = useTypedNavigation();
  const route = useRoute();
  const {addDuration, duration} = route.params as any;
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    dayPart: 0,
  });

  const onSetTime = (time: any) => {
    setTime(time);
  };
  const onSave = () => {
    addDuration(time);
    goBack();
  };
  return (
    <>
      <View style={styles.modalWrapper}>
        <TouchableOpacity
          style={styles.background}
          onPress={goBack}
          activeOpacity={1}
        />
        <View style={styles.container}>
          <ScreenHeader
            text="Duration Set-up"
            withBackButton={true}
            onBackPress={goBack}
          />
          <CustomTimePicker
            block={{hour: true, minute: true, dayPart: true}}
            visible={true}
            onSetTime={onSetTime}
            data={{hour: 0, minute: 0}}
            maxDuration={duration}
          />
          <CustomButton
            text="Save"
            disabled={time.hour === 0 && time.minute === 0}
            onPress={time.hour === 0 && time.minute === 0 ? () => {} : onSave}
          />
        </View>
      </View>
    </>
  );
};

export default DurationSessionModal;
