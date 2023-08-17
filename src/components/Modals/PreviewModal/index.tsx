import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import styles from './styles';
import { dispatch } from '../../../store/store';
import { deleteSessionClassesAction, updatedSessionClassesAction } from '../../../store/classes/actions';
import { EClassesChange, TClassesChange } from '../../../common/types/classes.types';



interface IPreviewModal { }

const PreviewModal = ({ }: IPreviewModal) => {
  const route = useRoute()
  const navigation = useNavigation()
  const { SessionId, newTime, completeAction, deleteItem, } = route.params as any

  const onDeleteSlot = () => {
    dispatch(deleteSessionClassesAction(SessionId as number))
    handleHideModal();
    completeAction()
    
  };

  const onEditSlit = (change: TClassesChange) => {
    dispatch(updatedSessionClassesAction({ id: SessionId as number, change: change, StartDateTime: newTime as string }))
    handleHideModal();
    completeAction()
  }

  const handleHideModal = () => {
    navigation.goBack()
    completeAction()
  };

  const editMode = deleteItem
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
      <TouchableOpacity style={{ flex: 1 }} onPress={handleHideModal} />

      <Animated.View
        style={[styles.modal, {
          height: deleteItem ? 164 : 103,
        }]}
      >
        <LinearGradient
          colors={['#9A80BA', '#EFF1F5']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 1]}
          style={styles.bgGradient}
        >
          {deleteItem && (<Text
            style={styles.title}
          >This is repeating class</Text>)}
          <Text
            onPress={deleteItem ? () => onEditSlit(EClassesChange.current) : onDeleteSlot}
            style={styles.cancelScheduled}
          >
            Save for this session only
          </Text>
          {deleteItem && (<Text
            onPress={() => onEditSlit(EClassesChange.future)}
            style={styles.cancelScheduled}
          >
            Save for all future sessions
          </Text>)}
          <TouchableOpacity onPress={handleHideModal}>
            <Text
              style={styles.cancelBtn}
            >Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
    textAlign: 'center',
  },
  bgGradient: {
    position: 'absolute',
    flex: 1,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.0705882,
    shadowRadius: 6,
    paddingBottom: 20,
    justifyContent: 'space-around',
  },
  bgModal: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  cancelScheduled: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25);',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  cancelBtn: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.3,
    color: '#FFFFFF',
  },
});
export default PreviewModal;
