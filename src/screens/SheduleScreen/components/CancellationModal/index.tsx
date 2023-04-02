import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationEnum} from '../../../../common/constants/navigation';
import {INavigationBase} from '../../../../common/types/component.styles';
import styles from './styles';

interface ModalData {
  title: string;
  description: string;
  // add any other data you want to display in the modal
}

interface ICancellationModalScreen {
  isVisible: boolean;
  closeModal: () => void;
  modalData: ModalData;
  onCancellationScreenRedirect: () => void;
}

const CancellationModalConainer = ({
  isVisible,
  closeModal,
  modalData,
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

  const handleShowModal = () => {
    handleAnimation(1);
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
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        angle={223.05}
        useAngle={true}
        style={styles.bgModal}
      />
      <TouchableOpacity style={{flex: 1}} onPress={handleHideModal} />

      <Animated.View style={[styles.modal]}>
        <LinearGradient
          colors={['#9A80BA', '#EFF1F5']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
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
  children?: React.ReactNode;
}

export const CancellationModal = ({children}: ICancellationModalWrapper) => {
  const navigation = useNavigation();
  const onCancellationScreenRedirect = () => {
    //@ts-ignore
    navigation.navigate(NavigationEnum.CANCELLATION_SCREEN);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  //@ts-ignore
  const [modalData, setModalData] = useState<ModalData>({});

  const handleLongPress = () => {
    setModalData({
      title: 'Custom Modal Title',
      description: 'Custom Modal Description',
    });
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
        modalData={modalData}
        onCancellationScreenRedirect={onCancellationScreenRedirect}
      />
    </>
  );
};
