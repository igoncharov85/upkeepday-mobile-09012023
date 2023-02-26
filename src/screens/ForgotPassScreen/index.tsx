import React, {FC, memo, useState} from 'react';
import {
  INavigationBase,
  TSetPasswordScreen,
} from '../../common/types/component.styles';
import {SendEmailScreen} from './SendEmailScreen';
import {SetPasswordScreen} from './SetPasswordScreen';

interface ILoginScreen extends INavigationBase {}
export const ForgotPassword: FC<ILoginScreen> = memo(({navigation}) => {
  const [currentScreen, setCurrentScreen] =
    useState<TSetPasswordScreen>('email');

  const renderAppropriateScreen = () => {
    switch (currentScreen) {
      case 'email':
        return (
          <SendEmailScreen
            navigation={navigation}
            setScreen={setCurrentScreen}
          />
        );
      case 'setpass':
        return (
          <SetPasswordScreen
            navigation={navigation}
            setScreen={setCurrentScreen}
          />
        );
    }
  };

  return renderAppropriateScreen();
});
