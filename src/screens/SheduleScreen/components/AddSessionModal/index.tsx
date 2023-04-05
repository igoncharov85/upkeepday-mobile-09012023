import React, { FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface AddSessionProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

interface AddSessionModalProps {
  visible: boolean;
  visibleHandler: () => void;
  onPress: () => void;
}

export const AddSessionModal: FC<AddSessionModalProps> = memo(
  ({ visible, visibleHandler, onPress }) => {
    const onCreateLesson = () => {
      visibleHandler();
      onPress();
    }
    return visible ? (

      <LinearGradient
        colors={['rgba(178, 178, 178, 0.88)', 'rgba(23, 25, 48, 0.898039)']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 0.0 }}
        angle={223.05}
        useAngle={true}
        style={styles.container}>
        <View />
        <View style={{ width: '100%', alignItems: 'center' }}>
          <SessionButton title={'Add Trial'} disabled={true} />
          <SessionButton title={'Add Class'} onPress={onCreateLesson} />
        </View>
      </LinearGradient>
    ) : null;
  },
);

const SessionButton: FC<AddSessionProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.sessionBlock, disabled ? styles.sessionBlockDisabled : null]}>
        <Text style={[styles.sessionText, , disabled ? styles.sessionTextDisabled : null]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
