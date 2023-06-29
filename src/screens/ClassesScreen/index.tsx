import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, ScrollView, Touchable, TouchableOpacity, Text } from 'react-native';
import { ClassesNavigation } from './components/ClassesNavigation';
import ClassesItem from './components/ClassesItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';
import { dispatch } from '../../store/store';
import { fetchClassesAction, fetchClassesByIdAction } from '../../store/classes/actions';
import { TClassesStatus } from '../../common/types/classes.types';


export const ClassesScreen = () => {
    const { classes } = useAppSelector(state => state.classes);
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused && dispatch(fetchClassesAction(classes[0].Status.toLocaleLowerCase() as TClassesStatus));
    }, [isFocused]);
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