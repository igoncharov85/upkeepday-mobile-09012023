import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import ArrowRight from '../../../assets/svg/schedule/ArrowRight'
import { dispatch } from '../../store/store'
import { logoutAction } from '../../store/auth/actions'

const MoreScreen: React.FC = () => {
    const onLogout = () => {
        dispatch(logoutAction())
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