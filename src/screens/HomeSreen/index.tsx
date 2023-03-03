import React, {FC, memo, useEffect} from 'react';
import {Text, View} from 'react-native';
import {INavigationBase} from '../../common/types/component.styles';
import {CustomButton} from '../../components/UI/CustomButton';
import NavigationActions from '../../services/navigation-service';
import {logoutAction} from '../../store/auth/actions';
import {dispatch} from '../../store/store';
import styles from './styles';

interface IHomeScreen extends INavigationBase {}
export const HomeScreen: FC<IHomeScreen> = memo(({navigation}) => {
  useEffect(() => {
    NavigationActions.setNavigator(navigation);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student Screen</Text>
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={() => dispatch(logoutAction())}
          text={'logout'}
        />
      </View>
    </View>
  );
});
