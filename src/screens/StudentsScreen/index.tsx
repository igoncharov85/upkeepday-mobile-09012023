import React from 'react';
import { View, ScrollView } from 'react-native';
import { StudentsNavigation } from './components/StudentsNavigation';
import StudentItem from './components/StudentItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';

const StudentsScreen = () => {
    const { users } = useAppSelector(state => state.user);
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