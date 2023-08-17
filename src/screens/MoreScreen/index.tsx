import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { PaymentTrackingSetUp } from "../PaymentTrackingSetUp";
import styles from './styles'
import ArrowRight from '../../../assets/svg/schedule/ArrowRight'
import { dispatch } from '../../store/store'
import { logoutAction } from '../../store/auth/actions'
import { useTypedNavigation } from '../../hook/useTypedNavigation';
import { NavigationEnum } from '../../common/constants/navigation';

const MoreScreen: React.FC = () => {
    const { navigate } = useTypedNavigation();
    const onLogout = () => {
        dispatch(logoutAction())
        navigate(NavigationEnum.LOGIN)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLogout} style={styles.block}>
                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text>Logout</Text>
                    <ArrowRight />
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default MoreScreen;