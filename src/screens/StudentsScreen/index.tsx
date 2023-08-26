import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { StudentsNavigation } from './components/StudentsNavigation';
import StudentItem from './components/StudentItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';
import { ScreenLoading } from '../../components/UI/ScreenLoading';
import moment from 'moment';

const StudentsScreen = () => {
    const { users, findUsers, loading } = useAppSelector(state => state.user);
    return (
        <View style={{ flex: 1 }}>
            <StudentsNavigation />
            {loading ? <ScreenLoading /> : <ScrollView>
                <View style={styles.container}>
                    {
                        findUsers?.map((item, index) => (
                            <StudentItem key={index} item={item} />
                        ))
                    }
                </View>
            </ScrollView>}

        </View>
    )
}

export default StudentsScreen;