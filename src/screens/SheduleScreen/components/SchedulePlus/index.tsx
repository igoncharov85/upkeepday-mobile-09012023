import React, { FC, memo, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Plus from '../../../../../assets/svg/schedule/Plus';
import { AddSessionModal } from '../AddSessionModal';
import styles from './styles';

interface ISchedulePlus {
  onButtonPress: () => void
}
export const SchedulePlus: FC<ISchedulePlus> = memo(({ onButtonPress }) => {
  const [visible, setVisible] = useState(false);
  const onChangeVisible = () => {
    setVisible(!visible);

  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onChangeVisible}>
          <Plus />
        </TouchableOpacity>
      </View>
      <AddSessionModal visible={visible} visibleHandler={onChangeVisible} onPress={onButtonPress} />
    </>
  );
});
