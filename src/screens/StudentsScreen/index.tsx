import React from 'react';
import { View, ScrollView } from 'react-native';
import { StudentsNavigation } from './components/StudentsNavigation';
import StudentItem from './components/StudentItem';
import styles from './styles';
import { useAppSelector } from '../../store/hooks';
import { ScreenLoading } from '../../components/UI/ScreenLoading';
import { selectBusinessAccount } from '../../store/businessAccount';
import { SheduleHeader } from '../SheduleScreen/components/SheduleHeader';
import { useUiContext } from '../../UIProvider';

const StudentsScreen = () => {
    const { t } = useUiContext();
    const { users, loading } = useAppSelector(state => state.user);
    const { currentSchool } = useAppSelector(selectBusinessAccount);

    return (
        <View style={{ flex: 1 }}>
            {currentSchool && <SheduleHeader isSelection text={t('students')} />}
            <StudentsNavigation />
            {loading ? <ScreenLoading /> : <ScrollView>
                <View style={styles.container}>
                    {
                        users.map((item, index) => (
                            <StudentItem key={index} item={item} />
                        ))
                    }
                </View>
            </ScrollView>}
        </View>
    )
}

export default StudentsScreen;