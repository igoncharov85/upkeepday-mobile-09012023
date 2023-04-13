import React, { FC, memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface IMonthItem {
    sesion?: number;
    day: string;
    isCurrentMonth?: boolean;
}



export const MonthItem: FC<IMonthItem> = memo(({ sesion, day, isCurrentMonth }) => {
    return (
        <View style={styles.itemContainer}>
            <LinearGradient
                colors={
                    sesion ? ['#EAAFC8', '#654EA3'] : ['transparent', 'transparent']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 9,
                    alignItems: 'center',
                }}>
                <Text
                    style={[
                        styles.monthItemText,
                        sesion ? styles.monthItemActiveText : null,
                        !isCurrentMonth && { opacity: 0.5 }
                    ]}>
                    {day}
                </Text>
                {sesion ? (
                    <Text style={styles.numberOfClasses}>{`${sesion} Sessions`}</Text>
                ) : null}
            </LinearGradient>
        </View>
    );
});

