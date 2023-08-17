import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import {NavigationEnum} from '../../common/constants/navigation';
import {useTypedNavigation} from '../../hook/useTypedNavigation';
import {logoutAction} from '../../store/auth/actions';
import {dispatch} from '../../store/store';
import styles from './styles';

const MoreScreen: React.FC = () => {
  const {navigate} = useTypedNavigation();
  const onLogout = () => {
    dispatch(logoutAction());
    navigate(NavigationEnum.LOGIN);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogout} style={styles.block}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Logout</Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MoreScreen;
