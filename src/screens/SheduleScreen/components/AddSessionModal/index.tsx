import React, {FC, memo, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
interface IAddSession {
  title: string;
  onPress?: () => void;
}
interface IAddSessionModal {
  visible: boolean;
  visibleHandler?: () => void;
}
export const AddSessionModal: FC<IAddSessionModal> = memo(
  ({visible, visibleHandler}) => {
    return visible ? (
      <LinearGradient
        colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        angle={223.05}
        useAngle={true}
        style={styles.container}>
        <View></View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <AddSessionBlock title={'Add Trial'} onPress={visibleHandler} />
          <AddSessionBlock title={'Add Trial'} onPress={visibleHandler} />
        </View>
      </LinearGradient>
    ) : null;
  },
);

const AddSessionBlock: FC<IAddSession> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.sessionBlock}>
        <Text style={styles.sessionText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
