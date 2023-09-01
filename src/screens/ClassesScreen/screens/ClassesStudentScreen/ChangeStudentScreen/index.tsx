import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '../../../../../components/ScreenHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationEnum } from '../../../../../common/constants/navigation';
import { CustomButton } from '../../../../../components/UI/CustomButton';
import { ExistingStudent } from './ExistingStudent';
import { NewStudent } from './NewStudent';
import { IExistingStudent } from '../../../../../common/types/schedule.types';
import { useAppSelector } from '../../../../../store/hooks';
import { IUserStudent } from '../../../../../common/types/user';
import { updateCurrentClassRequestAction } from '../../../../../store/shedule';
import { dispatch } from '../../../../../store/store';
import { ListButtons } from '../../ClassesEditNameScreen/components/ListButtons';
import { updateUserAction } from '../../../../../store/user/actions';
import { updateSchoolClassStudentsAction } from '../../../../../store/businessAccount/actions';

interface IAddStudentsScreen {

}

enum TypeAction {
    ExistingStudent = 0,
    NewStudent = 1,
}

function removeEmptyObjects(array: any[]) {
    return array.filter(obj => Object.keys(obj).length !== 0);
}

const ChangeStudentScreen: React.FC<IAddStudentsScreen> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item, currentStudent }: any = route.params;

    const { students } = useAppSelector(state => state.user)
    const [typeAction, setTypeAction] = useState(0);
    const { currentSchool } = useAppSelector(state => state.businessAccount);
    const [selectedStudents, setSelectedStudents] = useState<Array<IExistingStudent | any>>([]);
    const [existingStudent, setExistingStudent] = useState<Array<any>>(students || []);
    const [newStudents, setNewStudents] = useState<Array<IExistingStudent>>([]);
    const [resultData, setResultData] = useState<any>({
        existingStudents: [],
        newStudents: [],
    });
    console.log(existingStudent)

    const goNextStep = () => {
        if (currentSchool) {
            dispatch(updateSchoolClassStudentsAction({
                ExistingStudents: resultData.existingStudents,
                NewStudents: resultData.newStudents,
            }));
        } else {
            dispatch(updateUserAction({
                StudentId: item?.ClassId,
                ExistingStudents: resultData.existingStudents,
                NewStudents: resultData.newStudents,
            }))
        };
        navigation.goBack();
    };
    const handleTypeChange = (type: any) => {
        setTypeAction(type);
    }
    const setThisScreen = () => {
        setTypeAction(TypeAction.ExistingStudent);
    }
    const handleChancheUsers = (student: IExistingStudent) => {

        setSelectedStudents(existingStudents => {
            //@ts-ignore
            if (student?.StudentId) {
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
        setExistingStudent([...students, ...newStudents]);
    }, [newStudents]);

    useEffect(() => {
        let newStudentsData: any = [];
        let existingStudentsData: any = [];
        removeEmptyObjects(selectedStudents).forEach((item) => {
            if (item?.StudentId) {
                existingStudentsData.push(item.StudentId);
            }
            else {
                newStudentsData.push(item);
            }
        });
        setResultData(
            {
                newStudents: newStudentsData,
                existingStudents: existingStudentsData
            }
        )

    }, [selectedStudents, newStudents]);
    useEffect(() => {
        const { currentStudent }: any = route.params;
        const currentStudentArray = currentStudent.map((item: any) => {
            return { StudentId: item.StudentId }
        });
        setSelectedStudents(currentStudentArray)
    }, [currentStudent]);
    const goBack = () => navigation.goBack()

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ScreenHeader text={'Update Students '} onBackPress={goBack} withBackButton={true} />


                </View>


                <View style={{ marginTop: 0 }}>
                    <ListButtons buttons={['Existing student', 'New Student']} onPress={handleTypeChange} index={typeAction} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingBottom: 12 }}>
                    {typeAction === TypeAction.ExistingStudent ?
                        <ExistingStudent onSave={goNextStep} students={existingStudent} onChancheUsers={handleChancheUsers} selectedUsers={selectedStudents} /> :
                        <NewStudent handleTypeChange={setThisScreen} onAddNewStudent={handleAddNewStudent} />
                    }
                </View>

            </View >
        </View>
    )
}

export default ChangeStudentScreen;