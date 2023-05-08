import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEnum } from '../../../../common/constants/navigation';
import styles from './styles';
import { IScheduleItem } from '../../../../common/types/schedule.types';



interface ICancellationModalScreen {
  isVisible: boolean;
  closeModal: () => void;
  onCancellationScreenRedirect: () => void;
}

const CancellationModalConainer = ({
  isVisible,
  closeModal,
  onCancellationScreenRedirect,
}: ICancellationModalScreen) => {
  const [animation] = useState(new Animated.Value(0));
  const handleAnimation = (toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const handleHideModal = () => {
    handleAnimation(0);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={handleHideModal}>
      <LinearGradient
        colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.0 }}
        angle={223.05}
        useAngle={true}
        style={styles.bgModal}
      />
      <TouchableOpacity style={{ flex: 1 }} onPress={handleHideModal} />

      <Animated.View style={[styles.modal]}>
        <LinearGradient
          colors={['#9A80BA', '#EFF1F5']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 1]}
          style={styles.bgGradient}>
          <Text
            onPress={onCancellationScreenRedirect}
            style={styles.cancelScheduled}>
            Cancel Scheduled Class
          </Text>
          <TouchableOpacity onPress={handleHideModal}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};
interface ICancellationModalWrapper {

}
interface ICancellationModalWrapper {
  children: React.ReactNode;
  data: IScheduleItem;
}

export const CancellationModal = ({ children, data }: ICancellationModalWrapper) => {
  const navigation = useNavigation();
  const onCancellationScreenRedirect = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.CANCELLATION_SCREEN, {
      itemData: data
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleLongPress = () => {

    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onLongPress={handleLongPress}>
        {children}
      </TouchableOpacity>
      <CancellationModalConainer
        isVisible={isModalVisible}
        closeModal={closeModal}
        onCancellationScreenRedirect={onCancellationScreenRedirect}
      />
    </>
  );
};
