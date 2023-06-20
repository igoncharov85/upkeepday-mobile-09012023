import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const BusyField = () => {
    return (
        <View style={styles.wrapper} pointerEvents="none">

            <View style={styles.container}>
                {Array.from(Array(20).keys()).map(item => (
                    <View style={styles.line} />

                ))}
            </View>
        </View>
    );
};



export default BusyField;
