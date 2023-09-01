import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PaymentTrackingSetUp} from '../PaymentTrackingSetUp';
import styles from './styles';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import {dispatch} from '../../store/store';
import {logoutAction, userDeactivateAction} from '../../store/auth/actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationEnum } from '../../common/constants/navigation';

const MoreScreen: React.FC = () => {
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<any>>()
  const onLogout = () => {
    dispatch(logoutAction());
  };
  const onDeactivated = () => {
    // dispatch(userDeactivateAction(''));
    navigate(NavigationEnum.INFO_MODAL)
  };

  return (
    <View style={styles.container}>
      <MorePoint action={onLogout} label="Logout" />
      <MorePoint action={onDeactivated} label="Deactivate and Delete my account" />
    </View>
  );
};
const MorePoint = ({action, label}: {label: string; action: any}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.block}>
      <View
        style={styles.labelWrapper}>
        <Text>{label}</Text>
        <ArrowRight />
      </View>
    </TouchableOpacity>
  );
};
export default MoreScreen;
