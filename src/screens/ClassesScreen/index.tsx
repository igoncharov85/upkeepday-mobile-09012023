import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassesNavigation } from './components/ClassesNavigation';
import ClassesItem from './components/ClassesItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';
import { ScreenLoading } from '../../components/UI/ScreenLoading';


export const ClassesScreen = () => {
    const { classes, loading } = useAppSelector(state => state.classes);
    const isFocused = useIsFocused();

    return (
        <View style={{ flex: 1 }}>
            <ClassesNavigation />
            <ScrollView>
                <View style={styles.container}>
                    {loading ? <ScreenLoading /> :
                        classes.map((item, index) => (

                            <ClassesItem item={item} key={index} />
                        ))
                    }

                </View>
            </ScrollView>

        </View>
    )
}