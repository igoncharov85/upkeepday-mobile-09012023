import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';

import { ScreenHeader } from '../../components/ScreenHeader';
import styles from './styles';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import { NavigationEnum } from '../../common/constants/navigation';


export const EditClassScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScreenHeader
                text={'Music Class Name'}
                withBackButton={true}
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.buttonWrapper}>

                <ClassesEditButton title={'Update Finish Date (Extend) '} navigationName={NavigationEnum.ADD_CLASS_SCREEN} />
                <ClassesEditButton title={'Update Students'} navigationName={NavigationEnum.DATE_RECURRENCE_SCREEN} />
                <ClassesEditButton title={'Rollover Class'} navigationName={NavigationEnum.ADD_STUDENTS_SCREEN} />
                <ClassesEditButton title={'Delete Class Permanently'} navigationName={NavigationEnum.ADD_CLASS_SCREEN} />

            </View>
        </View>
    )
};

const ClassesEditButton = ({ title, navigationName }:
    {
        title: string;
        navigationName: string;
    }
) => {
    const navigation = useNavigation();
    //ts-ignore
    const onPress = () => navigation.navigate(navigationName);
    return (
        <TouchableOpacity onPress={onPress} style={styles.block}>
            <View style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Text>{title}</Text>
                <ArrowRight />
            </View>
        </TouchableOpacity>
    )

}