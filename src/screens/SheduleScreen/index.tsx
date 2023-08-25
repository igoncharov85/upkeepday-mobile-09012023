import React, { FC, memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { INavigationBase } from '../../common/types/component.styles';
import NavigationActions from '../../services/navigation-service';
import { fetchCountriesAction, fetchStatesAction } from '../../store/auth/actions';
import { dispatch } from '../../store/store';
import { fetchUsersAction } from '../../store/user/actions';
import { fetchLocationAction } from '../../store/location/actions';
import { ScheduleNavigation } from './components/SheduleNavigation';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from '../../store/hooks';
import { businessAccountActions } from '../../store/businessAccount';

interface IHomeScreen extends INavigationBase { }

export const ScheduleScreen: FC<IHomeScreen> = memo(({ navigation }) => {
    const [key, setKey] = useState(0);
    const isFocused = useIsFocused();
    const { currentSchool } = useAppSelector(state => state.businessAccount);

    useEffect(() => {
        dispatch(businessAccountActions.setIsSelectAccount(true));
    }, []);

    useEffect(() => {
        NavigationActions.setNavigator(navigation);
        dispatch(fetchUsersAction({ schoolId: currentSchool?.SchoolId }));
        dispatch(fetchLocationAction(currentSchool?.SchoolId));
        dispatch(fetchStatesAction('USA'));
        dispatch(fetchCountriesAction());
    }, [currentSchool]);

    useEffect(() => { setKey(key) }, [isFocused]);

    return (
        <View style={styles.container}>
            <ScheduleNavigation />
        </View >
    );
});

