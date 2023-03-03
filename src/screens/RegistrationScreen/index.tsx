import React, { FC, memo, useState } from 'react';
import { View } from 'react-native';
import { IRegistrationRequest } from '../../common/types/auth.types';
import { TRegistrationScreen } from '../../common/types/component.styles';
import { ChooseRoleScreen } from './ChooseRoleScreen';
import { StudentRegistrationScreen } from './StudentRegistrationScreen';
import styles from './styles';

export const RegistrationScreen:FC<any> = memo(() => {
  const [currentScreen, setCurrentScreen] =
    useState<TRegistrationScreen>('type');

  const renderAppropriateScreen = (currentScreen: TRegistrationScreen) => {
    switch (currentScreen) {
      case 'type':
        return <ChooseRoleScreen setScreen={setCurrentScreen} />;
      case 'student':
        return <StudentRegistrationScreen setScreen={setCurrentScreen} />;
      case 'tutor':
        return <StudentRegistrationScreen setScreen={setCurrentScreen} />;
      default:
        return <ChooseRoleScreen setScreen={setCurrentScreen} />;
    }
  };
  return (
    <View style={styles.container}>
      {renderAppropriateScreen(currentScreen)}
    </View>
  );
});
