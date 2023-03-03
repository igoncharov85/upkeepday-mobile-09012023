import React, {FC, memo} from 'react';
import {View, Text, Touchable, Pressable, TouchableOpacity} from 'react-native';
import BackIcon from '../../../assets/svg/BackIcon';
import {StyleEnum} from '../../common/constants/styles/styles.enum';
import styles from './styles';

interface ScreenHeader {
  text: string;
  withBackButton?: boolean;
  onBackPress?: any;
}
export const ScreenHeader: FC<ScreenHeader> = memo(
  ({text, onBackPress, withBackButton}) => {
    return (
      <View style={styles.header}>
        {withBackButton && (
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={onBackPress}
            activeOpacity={StyleEnum.TOUCHABLE_OPACITY}>
            <BackIcon />
          </TouchableOpacity>
        )}

        <Text style={styles.headerText}>{text}</Text>
      </View>
    );
  },
);
