import {useRoute} from '@react-navigation/native';
import React, {FC, memo, useState} from 'react';
import {View} from 'react-native';
import {TRegistrationScreen} from '../../common/types/component.styles';
import {useTypedNavigation} from '../../hook/useTypedNavigation';
import {ChooseRoleScreen} from './ChooseRoleScreen';
import {StudentRegistrationScreen} from './StudentRegistrationScreen';
import styles from './styles';

export const RegistrationScreen: FC = memo(() => {
  const navigation = useTypedNavigation();
  const route = useRoute();
  const [currentScreen, setCurrentScreen] =
    useState<TRegistrationScreen>('type');

  const renderAppropriateScreen = (currentScreen: TRegistrationScreen) => {
    switch (currentScreen) {
      case 'type':
        return (
          <ChooseRoleScreen
            navigation={navigation}
            route={route}
            setScreen={setCurrentScreen}
          />
        );
      case 'student':
        return (
          <StudentRegistrationScreen
            navigation={navigation}
            route={route}
            setScreen={setCurrentScreen}
            type={currentScreen}
          />
        );
      case 'teacher':
        return (
          <StudentRegistrationScreen
            navigation={navigation}
            route={route}
            setScreen={setCurrentScreen}
            type={currentScreen}
          />
        );
      default:
        return (
          <ChooseRoleScreen
            navigation={navigation}
            route={route}
            setScreen={setCurrentScreen}
          />
        );
    }
  };
  return (
    <View style={styles.container}>
      {renderAppropriateScreen(currentScreen)}
    </View>
  );
});
