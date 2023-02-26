import React, {FC, memo} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

interface ScreenHeader {
  text: string;
}
export const ScreenHeader: FC<ScreenHeader> = memo(({text}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
});
