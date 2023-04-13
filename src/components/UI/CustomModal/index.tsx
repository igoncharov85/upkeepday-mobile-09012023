import React, { memo, useState } from 'react';
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



interface CustomModalProps {
  isVisible: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  height?: number;
  withOverlay?: boolean;
}

export const CustomModal = ({ isVisible, closeModal, children, height, withOverlay }: CustomModalProps) => {
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
      <TouchableOpacity style={!withOverlay && styles.overlay} onPress={handleHideModal} activeOpacity={1} />
      <Animated.View style={[styles.modal, height ? { height: height } : { height: '50%', }]}>
        {children && children}
      </Animated.View>
    </Modal>
  );
};

