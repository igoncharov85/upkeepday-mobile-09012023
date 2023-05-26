import React, { FC, memo, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface IMonthItem {
    sesion?: number;
    day: string;
    isCurrentMonth?: boolean;
    item?: any;
}



export const MonthItem: FC<IMonthItem> = memo(({ sesion, day, isCurrentMonth, item }) => {
    const hasLesson = sesion && isCurrentMonth
    return (
        <TouchableOpacity onPress={() => console.log(item, 'item info')} style={styles.itemContainer}>
            {/* <View > */}
            <LinearGradient
                colors={
                    hasLesson ? ['#EAAFC8', '#654EA3'] : ['transparent', 'transparent']
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
                        hasLesson ? styles.monthItemActiveText : null,
                        !isCurrentMonth && { opacity: 0.5 }
                    ]}>
                    {day}
                </Text>
                {hasLesson ? (
                    <Text style={styles.numberOfClasses}>{`${sesion} Sessions`}</Text>
                ) : null}
            </LinearGradient>
            {/* </View> */}
        </TouchableOpacity>
    );
});

