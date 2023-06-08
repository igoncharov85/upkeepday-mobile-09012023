import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Animated } from 'react-native';
import styles from './styles';
import { CustomButton, TypeButton } from '../../../components/UI/CustomButton';
import { CustomInput } from '../../../components/UI/CustomInput';

interface IMessageBlock { toggleButtonDisabled: () => void, onChangeMessage: (text: string) => void }
export const MessageBlock: FC<IMessageBlock> = memo(({ toggleButtonDisabled, onChangeMessage }) => {
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const onChangeMessages = (text: string) => {
    setMessage(text);
  };
  const onHandlePress = () => {
    toggleButtonDisabled()
    onChangeMessage(message)
    setIsDisabled(true)
  }
  const onHandleSkip = () => {
    toggleButtonDisabled()
    setIsDisabled(true)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message</Text>
      <Text style={styles.subTitle}>Enter Text</Text>
      <CustomInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        onChangeText={(text) => onChangeMessages(text)}
      />
      <View style={styles.btnContainer}>
        <CustomButton
          type={TypeButton.opacity}
          text={'Skip'}
          style={{ flex: 1, marginRight: 16 }}
          onPress={onHandleSkip}
        />
        <CustomButton text={'Add'} style={{ flex: 1 }} onPress={onHandlePress} />
      </View>
    </View>
  );
});
