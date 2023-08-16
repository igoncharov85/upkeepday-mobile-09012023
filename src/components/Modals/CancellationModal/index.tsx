import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEnum } from '../../../common/constants/navigation';
import styles from './styles';
import { IScheduleItem } from '../../../common/types/schedule.types';
import { StudentCheckInModal } from '../../../screens/SheduleScreen/components/StudentCheckInModal';




interface ICancellationModalScreen { }

export const CancellationModal = () => {

  const navigation = useNavigation()
  const route = useRoute()

  const { item } = route.params as any
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onStudentCheckIn = () => {
    setIsModalVisible(!isModalVisible);
  }
  const goBack = () => navigation.goBack()

  const navigateToCancellationScreen = () => {
    goBack()
    //@ts-ignore
    navigation.navigate(NavigationEnum.CANCELLATION_SCREEN, { itemData: item })
  }

  return (
    <>
      <LinearGradient
        colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.0 }}
        angle={223.05}
        useAngle={true}
        style={styles.bgModal}
      />
      <TouchableOpacity style={{ flex: 1 }} onPress={goBack} />

      <Animated.View style={[styles.modal, { height: item.ClassName ? 164 : 116 }]}>
        <LinearGradient
          colors={['#9A80BA', '#EFF1F5']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 1]}
          style={styles.bgGradient}>

          <Text
            onPress={navigateToCancellationScreen}
            style={styles.cancelScheduled}>
            Cancel Scheduled Class
          </Text>
          {item.ClassName && (<Text
            onPress={onStudentCheckIn}
            style={styles.cancelScheduled}>
            Student Check-in
          </Text>)}
          <TouchableOpacity onPress={goBack}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
      {item.ClassName && (<StudentCheckInModal data={item} visible={isModalVisible} visibleHandler={onStudentCheckIn} onPress={() => null} hideOwnModal={goBack} />)}

    </>
  );
};

