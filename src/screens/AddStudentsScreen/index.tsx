import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigationEnum } from '../../common/constants/navigation';
import { ListButtons } from '../AddClassScreen/components/ListButtons';
import { CustomButton } from '../../components/UI/CustomButton';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';
import { IExistingStudent } from '../../common/types/schedule.types';
import { useAppSelector } from '../../store/hooks';
import { IUserStudent } from '../../common/types/user';
import { setLocalStudentData, updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';

interface IAddStudentsScreen {

}

enum TypeAction {
    ExistingStudent = 0,
    NewStudent = 1,
}

export function removeEmptyObjects(array: any[]) {
    return array.filter(obj => Object.keys(obj).length !== 0);
}

export const AddStudentsScreen: React.FC<IAddStudentsScreen> = () => {

    const { students } = useAppSelector(state => state.user)
    
    const [typeAction, setTypeAction] = useState(0);
    const navigation = useNavigation();
    const { createCurrentClassRequest, localStudentData } = useAppSelector(state => state.schedule);
    const [selectedStudents, setSelectedStudents] = useState<Array<IExistingStudent | any>>(createCurrentClassRequest.Students || []);
    const [existingStudent, setExistingStudent] = useState<Array<any>>(localStudentData);
    const [newStudents, setNewStudents] = useState<Array<IExistingStudent>>([]);
    //@ts-ignore
    const goNextStep = () => navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN);
    const handleTypeChange = (type: any) => {
        setTypeAction(type);
    }
    const setThisScreen = () => {
        setTypeAction(TypeAction.ExistingStudent);
    }
    const handleChancheUsers = (student: IExistingStudent) => {
        //@ts-ignore


        setSelectedStudents(existingStudents => {


            //@ts-ignore
            if (student?.StudentId) {
                //@ts-ignore

                //@ts-ignore
                let index = existingStudents.some((event) => event.StudentId === student?.StudentId)
                //@ts-ignore
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
    }

    const handleAddNewStudent = (students: IExistingStudent) => {
        setNewStudents([...newStudents, students]);
        setSelectedStudents([...selectedStudents, students])
    }
    useEffect(() => {
        setExistingStudent([...students || [], ...newStudents || [], ...localStudentData || []]);
    }, [newStudents, students]);

    useEffect(() => {
        dispatch(updateCurrentClassRequestAction({
            Students: removeEmptyObjects(selectedStudents) || []
        }));
    }, [selectedStudents, newStudents, existingStudent]);


    useEffect(() => {
        setExistingStudent(localStudentData)
    }, [])
    const goBack = () => {
        navigation.goBack()
        dispatch(setLocalStudentData(existingStudent))
    }

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                    <ScreenHeader text={'Add Students'} onBackPress={() => goBack()} withBackButton={true} />
                </View>
                <TouchableOpacity style={{ position: 'absolute', top: 24, right: 20, zIndex: 1 }} onPress={goNextStep}>
                    <Text style={{ color: '#171930', fontSize: 14, lineHeight: 19, opacity: 0.4 }}>Add Later</Text>
                </TouchableOpacity>

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
        </View>
    )
}
