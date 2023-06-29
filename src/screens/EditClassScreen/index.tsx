import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';

import { ScreenHeader } from '../../components/ScreenHeader';
import styles from './styles';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import { NavigationEnum } from '../../common/constants/navigation';
import { dispatch } from '../../store/store';
import { updatedStatusClassesAction } from '../../store/classes/actions';


export const EditClassScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const item: any = route.params;
    console.log(item);

    return (
        <View style={styles.container}>
            <ScreenHeader
                text={item.item.Name}
                withBackButton={true}
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.buttonWrapper}>
                <ClassesEditButton title={'Update Class Name and Location'} navigationName={NavigationEnum.CLASSES_EDIT_NAME_SCREEN} data={item} />
                <ClassesEditButton title={'Update Finish Date (Extend)'} navigationName={NavigationEnum.CLASSES_EDIT_DATE_SCREEN} data={item} />
                <ClassesEditButton title={'Update Students'} navigationName={NavigationEnum.CLASSES_STUDENT_SCREEN} data={item} />
                <ClassesEditButton title={'Rollover Class'} navigationName={NavigationEnum.ADD_CLASS_SCREEN} />
                <ClassesEditButton title={'Archive Class'} navigationName={NavigationEnum.RESULT_CLASS_MODAL} data={
                    {
                        item: item.item,
                        actionBtn: () => dispatch(updatedStatusClassesAction({ id: item.ClassId, Status: 'Archived' })),
                        nameAction: 'Archive',
                    }
                } />
            </View>
        </View>
    )
};

const ClassesEditButton = ({ title, navigationName, data }:
    {
        title: string;
        navigationName: string;
        data?: any;
    }
) => {
    const navigation = useNavigation();
    const onPress = () => {
        //@ts-ignore
        navigation.navigate(navigationName, data ? data : null)
    };
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