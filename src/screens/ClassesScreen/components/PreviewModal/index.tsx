import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { dispatch } from '../../../../store/store';
import { deleteSessionClassesAction, updatedSessionClassesAction } from '../../../../store/classes/actions';
import { EClassesChange, TClassesChange } from '../../../../common/types/classes.types';



interface IPreviewModal {
  isVisible: boolean;
  closeModal: () => void;
  editMode?: boolean;
  currentSessionId?: number;
  newTime?: string;
}

const PreviewModal = ({
  isVisible,
  closeModal,
  editMode = false,
  currentSessionId,
  newTime,
}: IPreviewModal) => {
  const [animation] = useState(new Animated.Value(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAnimation = (toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onDeleteSlot = () => {
    dispatch(deleteSessionClassesAction(currentSessionId as number))
    handleHideModal();

  };
  const onEditSlit = (change: TClassesChange) => {
    dispatch(updatedSessionClassesAction({ id: currentSessionId as number, change: change, StartDateTime: newTime as string }))
    handleHideModal();
  }
  const handleHideModal = () => {
    handleAnimation(0);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  return (
    <>
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

        <Animated.View style={[styles.modal, {
          height: editMode ? 164 : 103,
        }]}>
          <LinearGradient
            colors={['#9A80BA', '#EFF1F5']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 1]}
            style={styles.bgGradient}>
            {editMode && (<Text style={styles.title}>This is repeating class</Text>)}
            <Text
              onPress={editMode ? () => onEditSlit(EClassesChange.current) : onDeleteSlot}
              style={styles.cancelScheduled}>
              Save for this session only
            </Text>
            {editMode && (<Text
              onPress={() => onEditSlit(EClassesChange.future)}
              style={styles.cancelScheduled}>
              Save for all future sessions
            </Text>)}
            <TouchableOpacity onPress={handleHideModal}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </Modal>
    </>
  );
};

export default PreviewModal;
