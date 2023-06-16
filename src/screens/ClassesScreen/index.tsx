import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationEnum } from '../../common/constants/navigation';
import { ClassesNavigation } from './components/ClassesNavigation';
import ClassesItem from './components/ClassesItem';
import styles from './styles';


export const ClassesScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <ClassesNavigation />
            <ScrollView>
                <View style={styles.container}>
                    <ClassesItem />
                    <ClassesItem />
                    <ClassesItem />
                    <ClassesItem />
                    <ClassesItem />

                </View>
            </ScrollView>
        </View>
    )
}