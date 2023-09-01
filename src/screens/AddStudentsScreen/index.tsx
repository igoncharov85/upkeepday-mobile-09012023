import React, { FC, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
import { ListButtons } from '../AddClassScreen/components/ListButtons';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';
import { IExistingStudent } from '../../common/types/schedule.types';
import { useAppSelector } from '../../store/hooks';
import { setLocalStudentData, updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../../components/ScreenHeader';
import { LinedButton } from '../../components/UI/linedButton';
import { scaleVertical } from '../../services/utils/Utils';
import { ScreenContainer } from '../../components/UI/screenContainer';

enum TypeAction {
    ExistingStudent = 0,
    NewStudent = 1,
}

function removeEmptyObjects(array: any[]) {
    return array.filter(obj => Object.keys(obj).length !== 0);
}

export const AddStudentsScreen: FC = () => {
    const { students } = useAppSelector(state => state.user)
    const [typeAction, setTypeAction] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { createCurrentClassRequest, localStudentData } = useAppSelector(state => state.schedule);
    const [selectedStudents, setSelectedStudents] = useState<Array<IExistingStudent | any>>(createCurrentClassRequest.Students || []);
    const [existingStudent, setExistingStudent] = useState<Array<any>>(localStudentData);
    const [newStudents, setNewStudents] = useState<Array<IExistingStudent>>([]);

    useEffect(() => { setExistingStudent(localStudentData) }, []);

    useEffect(() => {
        setExistingStudent([...students || [], ...newStudents || [], ...localStudentData || []]);
    }, [newStudents, students]);

    useEffect(() => {
        dispatch(updateCurrentClassRequestAction({
            Students: removeEmptyObjects(selectedStudents) || []
        }));
    }, [selectedStudents, newStudents, existingStudent]);

    const goNextStep = () => navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN);
    const handleTypeChange = (type: any) => {
        setTypeAction(type);
    };

    const setThisScreen = () => {
        setTypeAction(TypeAction.ExistingStudent);
    };

    const handleChancheUsers = (student: IExistingStudent) => {
        setSelectedStudents(existingStudents => {
            if (student?.StudentId) {
                let index = existingStudents.some((event) => event.StudentId === student?.StudentId)
                const StudentId = student?.StudentId;
                if (index) {
                    return existingStudents?.filter(event => event.StudentId !== StudentId);
                } else {
                    return [...existingStudents, { StudentId }];
                }
            } else {
                const index = existingStudents?.findIndex(event => event.Phone === student?.Phone);
                if (index === -1) {
                    return [...existingStudents, student];
                } else {
                    return existingStudents?.filter((_, i) => i !== index);
                }
            }
        });
    };

    const handleAddNewStudent = (students: IExistingStudent) => {
        setNewStudents([...newStudents, students]);
        setSelectedStudents([...selectedStudents, students])
    };

    return (
        <ScreenContainer >
            <ScreenHeader containerStyle={{ padding: scaleVertical(20) }} withBackButton onBackPress={navigation.goBack} text={'Add Students'} optionalComponent={<LinedButton title={'Add Later'} onPress={goNextStep} />} />
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                </View>
                <View style={{ marginTop: -30 }}>
                    <ListButtons buttons={['Existing student', 'New Student']} onPress={handleTypeChange} index={typeAction} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {typeAction === TypeAction.ExistingStudent ?
                        <ExistingStudent students={existingStudent} onChancheUsers={handleChancheUsers} selectedUsers={removeEmptyObjects(selectedStudents)} /> :
                        <NewStudent handleTypeChange={setThisScreen} onAddNewStudent={handleAddNewStudent} />
                    }
                </View>
            </View >
        </ScreenContainer>
    )
}