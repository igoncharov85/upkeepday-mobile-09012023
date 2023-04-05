import { useNavigation } from '@react-navigation/native';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { CustomButton, TypeButton } from '../../../components/UI/CustomButton';
import { CustomInput } from '../../../components/UI/CustomInput';

interface IMessageBlock { }
export const MessageBlock: FC<IMessageBlock> = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message</Text>
      <Text style={styles.subTitle}>Enter Text</Text>
      <CustomInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
      />
      <View style={styles.btnContainer}>
        <CustomButton
          type={TypeButton.opacity}
          text={'Skip'}
          style={{ flex: 1, marginRight: 16 }}
        />
        <CustomButton text={'Add'} style={{ flex: 1 }} />
      </View>
    </View>
  );
});
