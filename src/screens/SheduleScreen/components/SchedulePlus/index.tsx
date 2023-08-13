import {getFocusedRouteNameFromRoute, useNavigation, useRoute} from "@react-navigation/native";
import React, { FC, memo, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Plus from '../../../../../assets/svg/schedule/Plus';
import {NavigationEnum} from "../../../../common/constants/navigation";
import { AddSessionModal } from '../AddSessionModal';
import styles from './styles';
import { dispatch } from '../../../../store/store';
import { updateCurrentClassRequestAction } from '../../../../store/shedule';

interface ISchedulePlus {

}
export const SchedulePlus: FC<ISchedulePlus> = memo(() => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>  setVisible(!visible)}>
          <Plus />
        </TouchableOpacity>
      </View>
      <AddSessionModal visible={visible} visibleHandler={() =>  setVisible(!visible)}  />
    </>
  );
});
