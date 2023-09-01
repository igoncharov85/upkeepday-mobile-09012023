import React, { FC, useMemo } from 'react'
import { dispatch } from '../../store/store'
import { logoutAction } from '../../store/auth/actions'
import { CustomButton } from '../../components/UI/CustomButton';
import { ChevronIcon } from '../../../assets/svg/chevronIcon';
import { useUiContext } from '../../UIProvider';
import { getStyles } from './styles'
import { ScreenContainer } from '../../components/UI/screenContainer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationEnum } from '../../common/constants/navigation';

export const MoreScreen: FC = () => {
    const { t, colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onLogout = () => { dispatch(logoutAction()) };
    const onOpenStudents = () => {navigation.navigate(NavigationEnum.STUDENTS_SCREEN) };

    return (
        <ScreenContainer containerStyle={styles.container}>
            <CustomButton onPress={onLogout} style={styles.button} textStyle={styles.text} text={t('logout')} icon={<ChevronIcon color={colors.text} position={'RIGHT'} />} />
            <CustomButton onPress={onOpenStudents} style={styles.button} textStyle={styles.text} text={t('students')} icon={<ChevronIcon color={colors.text} position={'RIGHT'} />} />
        </ScreenContainer>
    );
};