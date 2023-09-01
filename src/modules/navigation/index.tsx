import React, { memo, useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { StackNavigator } from './StackNavigator';
import { ActivityIndicator, BackHandler, Platform, StyleSheet } from 'react-native';
import { ColorEnum } from '../../common/constants/styles/colors.enum';
import { NavigationEnum } from '../../common/constants/navigation';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAppSelector } from '../../store/hooks';
import { setCurrentScreenAction } from '../../store/app';
import { dispatch } from '../../store/store';
import { loggerActions } from '../../store/logger';
import { getSchoolsAction } from '../../store/businessAccount/actions';
import { businessAccountActions } from '../../store/businessAccount';
import { getUserAction } from '../../store/auth/actions';

export const RootNavigation = memo(() => {
    const { currentScreen } = useAppSelector(state => state.app);
    const { user, isAuth } = useAppSelector(state => state.auth);
    const linking = {
        prefixes: ['classplan://'],
        config: {
            screens: {
                [NavigationEnum.REGISTRATION_FINAL]: 'verif/:uuid',
                [NavigationEnum.FORGOT_PASSWORD_SEND_PASSWORD]: 'reset/:uuid',
                [NavigationEnum.INFO_MODAL]: 'deactivate/:uuid',
            },
        },
    };

    useEffect(() => {
        dispatch(loggerActions.clear());
        dispatch(getUserAction());
    }, []);

    useEffect(() => {
        dispatch(getSchoolsAction());
    }, [user]);

    const getCurrentRoute = (state: any): any => {
        if (state.index === undefined || state.index < 0) {
            return undefined;
        }
        const nestedState = state.routes[state.index].state;
        if (nestedState !== undefined) {
            return getCurrentRoute(nestedState);
        }
        return state.routes[state.index].name;
    };
    let navigationRef = useNavigationContainerRef();
    const goBackPanHandler = () => {
        currentScreen === NavigationEnum.LOGIN
            ? Platform.OS == 'android'
                ? BackHandler.exitApp()
                : null
            : navigationRef.current?.canGoBack()
                ? navigationRef.current.goBack()
                : null;
    };
    const goBackDetector = Gesture.Pan()
        .minDistance(45)
        .onEnd(event => {
            if (event.translationX > 0 && navigationRef && navigationRef.current) {
                goBackPanHandler();
            }
        });
    return (
        <NavigationContainer
            linking={linking}
            ref={navigationRef}
            onStateChange={state => {
                dispatch(setCurrentScreenAction(getCurrentRoute(state)));
            }}
            fallback={
                <ActivityIndicator
                    style={StyleSheet.absoluteFill}
                    color={ColorEnum.BUTTON_ACCENT}
                    size="large"
                />
            }>
            <GestureDetector gesture={goBackDetector}>
                <StackNavigator />
            </GestureDetector>
        </NavigationContainer>
    );
});
