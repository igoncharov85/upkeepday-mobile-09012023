import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../common/constants/navigation';
import { ListButtons } from '../AddClassScreen/components/ListButtons';
import { CustomButton } from '../../components/UI/CustomButton';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';
import { IExistingStudent } from '../../common/types/schedule.types';
import { useAppSelector } from '../../store/hooks';
import { IUserStudent } from '../../common/types/user';
import { updateCurrentClassRequestAction } from '../../store/shedule';
import { dispatch } from '../../store/store';

interface IAddStudentsScreen {

}

enum TypeAction {
    ExistingStudent = 0,
    NewStudent = 1,
}
export const AddStudentsScreen: React.FC<IAddStudentsScreen> = () => {

    const { students } = useAppSelector(state => state.user)
    const [typeAction, setTypeAction] = useState(0);
    const navigation = useNavigation();
    const [selectedStudents, setSelectedStudents] = useState<Array<IExistingStudent | any>>([]);
    const [existingStudent, setExistingStudent] = useState<Array<any>>(students || []);
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

        setSelectedStudents(existingStudents => {
            // return [...existingStudents, student];

            const index = existingStudents?.findIndex(event => event.Phone ? (event.Phone === student?.Phone) : (event.Id === student?.Id));
            if (!student?.Phone) {
                const index = existingStudents?.findIndex(event => event.Id === student?.Id);
                //@ts-ignore

                const id = student?.StudentId;
                if (index === -1) {
                    return [...existingStudents, { id }];
                } else {
                    return existingStudents?.filter((_, i) => i !== index);
                }

            } else {
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
        setExistingStudent([...students, ...newStudents]);
    }, [newStudents]);

    useEffect(() => {
        dispatch(updateCurrentClassRequestAction({
            Students: selectedStudents || []
        }));
    }, [selectedStudents, newStudents]);

    const goBack = () => navigation.goBack()

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                    <ScreenHeader text={'Add Students'} onBackPress={goBack} withBackButton={true} />


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
                        <ExistingStudent students={existingStudent} onChancheUsers={handleChancheUsers} /> :
                        <NewStudent handleTypeChange={setThisScreen} onAddNewStudent={handleAddNewStudent} />
                    }
                </View>

            </View >
        </View>
    )
}