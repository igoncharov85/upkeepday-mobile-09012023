import React, { FC, memo, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';

import styles from './styles';
import { dispatch } from '../../../../store/store';
import { fetchStudentsAction } from '../../../../store/user/actions';
import { useAppSelector } from '../../../../store/hooks';

interface NavigationButtonProps {
    active: boolean;
    name: string;
    onPress: () => void;
}

const STUDENTS_NAVIGATION = [
    { active: false, name: 'Scheduled', status: 'scheduled' },
    { active: false, name: 'Non-Scheduled', status: 'nonscheduled' },
    { active: false, name: 'Archived', status: 'archived' },
];

interface IStudentsNavigation {

}
export const StudentsNavigation: FC<IStudentsNavigation> = memo(() => {
    const [activeIndex, setActiveIndex] = useState(0);
    const isFocused = useIsFocused();
    const { currentSchool } = useAppSelector(state => state.businessAccount);

    useEffect(() => {
        dispatch(fetchStudentsAction({ status: STUDENTS_NAVIGATION?.[activeIndex]?.status || '', schoolId: currentSchool?.SchoolId }));
    }, [activeIndex, isFocused, currentSchool],);

    return (
        <>
            <View style={styles.container}>
                <LinearGradient
                    colors={['rgba(165, 175, 196, 0.2)', 'rgba(109, 123, 152, 0.2)']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 1]}
                    angle={180}
                    style={styles.buttonWrapper}>
                    {STUDENTS_NAVIGATION.map((item, index) => (
                        <NavigationButton
                            key={index}
                            active={index === activeIndex}
                            name={item.name}
                            onPress={() => setActiveIndex(index)}
                        />
                    ))}
                </LinearGradient>
            </View>
        </>
    );
});

const NavigationButton: FC<NavigationButtonProps> = memo(
    ({ active, name, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            {active ? (
                <LinearGradient
                    colors={['#A5AFC4', '#6D7B98']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    angle={222.53}
                    useAngle={true}
                    style={styles.buttonLinearGradient}>
                    <Text style={styles.buttonText_active}>{name}</Text>
                </LinearGradient>
            ) : (
                <Text style={styles.buttonText}>{name}</Text>
            )}
        </TouchableOpacity>
    ),
);
