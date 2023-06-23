import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassesNavigation } from './components/ClassesNavigation';
import ClassesItem from './components/ClassesItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';


export const ClassesScreen = () => {
    const { classes } = useAppSelector(state => state.classes);

    return (
        <View style={{ flex: 1 }}>
            <ClassesNavigation />
            <ScrollView>
                <View style={styles.container}>
                    {
                        classes.map((item, index) => (

                            <ClassesItem item={item} key={index} />
                        ))
                    }

                </View>
            </ScrollView>

        </View>
    )
}