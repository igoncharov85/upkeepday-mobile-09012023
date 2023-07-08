import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { StudentsNavigation } from './components/StudentsNavigation';
import StudentItem from './components/StudentItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';
import { dispatch } from '../../store/store';
import { fetchClassesAction } from '../../store/classes/actions';
import { TClassesStatus } from '../../common/types/classes.types';
import { fetchStudentsAction } from '../../store/user/actions';


const StudentsScreen = () => {
    const { users } = useAppSelector(state => state.user);

    useEffect(() => {

    }, [users]);
    return (
        <View style={{ flex: 1 }}>
            <StudentsNavigation />
            <ScrollView>
                <View style={styles.container}>
                    {
                        users.map((item, index) => (
                            <StudentItem key={index} item={item} />
                        ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}

export default StudentsScreen;