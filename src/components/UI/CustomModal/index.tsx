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
import styles from './styles';

interface ModalData {
  title: string;
  description: string;
  // add any other data you want to display in the modal
}

interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  modalData: ModalData;
}

const CustomModal = ({isVisible, closeModal, modalData}: CustomModalProps) => {
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
      <TouchableOpacity style={styles.overlay} onPress={handleHideModal} />
      <Animated.View style={[styles.modal]}>
        <Text>{modalData.title}</Text>
        <Text>{modalData.description}</Text>
        <TouchableOpacity onPress={handleHideModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

interface CustomComponentProps {
  children?: React.ReactNode;
}

const CustomComponent = ({children}: CustomComponentProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //@ts-ignore
  const [modalData, setModalData] = useState<ModalData>({});

  const handleLongPress = () => {
    setModalData({
      title: 'Custom Modal Title',
      description: 'Custom Modal Description',
      // add any other data you want to display in the modal
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
      <CustomModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        modalData={modalData}
      />
    </>
  );
};
