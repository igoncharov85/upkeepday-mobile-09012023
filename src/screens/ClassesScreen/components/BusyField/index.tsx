import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const BusyField = ({ start, duration }: { start: number, duration: number }) => {
    return (
        <View style={[styles.wrapper, {
            top: `${(start / 60 * 100)}%`,
            height: `${duration / 60 * 100}%`

        }]} pointerEvents="none">

            <View style={styles.container}>
                {Array.from(Array(100).keys()).map(item => (
                    <View style={styles.line} />

                ))}
            </View>
        </View>
    );
};



export default BusyField;
