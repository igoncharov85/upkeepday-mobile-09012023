import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../../UI/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import { dispatch } from '../../../store/store';
import { logoutAction, userDeactivateAction, userSendMainDeactivateAction } from '../../../store/auth/actions';

const InfoModal = () => {
  const navigation = useNavigation();
  const route = useRoute(),
    {params}: any = route;
  const {uuid} = params || '';

  const handleSendMail = () => {
    dispatch(userSendMainDeactivateAction())
  };
  const handleDelete = () => {
    dispatch(userDeactivateAction(uuid))
    dispatch(logoutAction());
  };

  const closeModal = () => {
    navigation.goBack();
  };
  const label = uuid
      ? [
          'Sorry to see you go. Email us with any questions or feedback.',
          'Click on “Confirm” and your account will be permanently deleted.',
        ]
      : [
          'You are about to permanently delete your Private Tutor account. Please confirm you would like to delete it. ',
          'Deactivation link will be sent to your email address.',
        ],
    nameAction = uuid ? 'Delete my Account' : 'Confirm',
    actionBtn = uuid ? handleDelete : handleSendMail;

  

  return (
    <>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.modalWrapper}
        activeOpacity={1}>
        <LinearGradient
          colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 0.0}}
          angle={223.05}
          useAngle={true}
          style={styles.container}>
          <View />
          <View style={styles.content}>
            <View style={styles.container}>
              <View />
              <View style={styles.item}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: -0.3,
                    textAlign: 'center',
                  }}>
                  {label[0]}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    letterSpacing: -0.3,
                    textAlign: 'center',
                  }}>
                  {label[1]}
                </Text>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                <CustomButton text={nameAction} onPress={actionBtn} />
                <View style={{height: 12}} />
                <CustomButton
                  text={'Cancel'}
                  onPress={closeModal}
                  backgroundColor="red"
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default InfoModal;
