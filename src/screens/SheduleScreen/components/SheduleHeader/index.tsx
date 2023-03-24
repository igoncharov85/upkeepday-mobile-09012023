import React, {FC, memo, useEffect} from 'react';
import {Text, View} from 'react-native';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import styles from './styles';

interface ISheduleHeader {
  text: string
}
export const SheduleHeader: FC<ISheduleHeader> = memo(({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{text}</Text>
      <SearchIcon />
    </View>
  );
});
