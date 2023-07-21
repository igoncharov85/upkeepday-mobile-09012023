import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';

import { ScreenHeader } from '../../components/ScreenHeader';
import styles from './styles';
import ArrowRight from '../../../assets/svg/schedule/ArrowRight';
import { NavigationEnum } from '../../common/constants/navigation';
import { dispatch } from '../../store/store';
import { updatedStatusClassesAction } from '../../store/classes/actions';
import { updateCurrentClassRequestAction } from '../../store/shedule';


export const EditClassScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const item: any = route.params;

    const relloverClass = () => {
        const classLesson = item?.item;

        classLesson && dispatch(
            updateCurrentClassRequestAction({
                Class: {
                    Name: classLesson.Name,
                    StartDate: '',
                    EndDate: '',
                    EndNumber: classLesson.EndNumber,
                    EndScheduleType: classLesson.EndScheduleType,
                    MakeupRequired: classLesson.MakeupRequired,
                    TrackPrepayment: classLesson.TrackPrepayment,

                },
                Location: {
                    Name: classLesson.Location.Address,
                    Url: classLesson.Location.Url,
                    LocationType: classLesson.Location.LocationType,
                    AddressLine: classLesson.Location.Address,
                    LocationId: classLesson.Location.LocationId

                },
                Students: classLesson.Students,
                Slots: classLesson.Slots,
                Sessions: [],
            })
        );
    };
    return (
        <View style={styles.container}>
            <ScreenHeader
                text={item?.item.Name}
                withBackButton={true}
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.buttonWrapper}>
                <ClassesEditButton title={'Update Class Name and Location'} navigationName={NavigationEnum.CLASSES_EDIT_NAME_SCREEN} data={item} />
                {/* <ClassesEditButton title={'Update Finish Date (Extend)'} navigationName={NavigationEnum.CLASSES_EDIT_DATE_SCREEN} data={item} /> */}
                <ClassesEditButton title={'Update Students'} navigationName={NavigationEnum.CLASSES_STUDENT_SCREEN} data={item} />
                <ClassesEditButton title={'Rollover Class'} navigationName={NavigationEnum.ADD_CLASS_SCREEN} action={relloverClass} data={{ screenName: 'Rollover Class', item: item?.item }} />
                <ClassesEditButton title={'Archive Class'} navigationName={NavigationEnum.RESULT_CLASS_MODAL} data={
                    {
                        item: item?.item,
                        actionBtn: () => {
                            dispatch(updatedStatusClassesAction({ id: item?.item.ClassId, Status: 'Archived' }))
                            //@ts-ignore
                            navigation.navigate(NavigationEnum.CLASSES_TAB);
                        },

                        nameAction: 'Archive',
                    }
                } />
            </View>
        </View>
    )
};

const ClassesEditButton = ({ title, navigationName, data, action }:
    {
        title: string;
        navigationName: string;
        data?: any;
        action?: any;
    }
) => {
    action && action();
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