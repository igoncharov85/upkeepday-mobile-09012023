import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationEnum } from '../../../../common/constants/navigation';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { dispatch } from '../../../../store/store';
import { ScreenHeader } from '../../../../components/ScreenHeader';
import SearchIcon from '../../../../../assets/svg/SearchIcon';
import styles from './styles';
import CheckIcon from '../../../../../assets/svg/classes/CheckIcon';
import MinPlus from '../../../../../assets/svg/schedule/MinPlus';
import { deleteUserAction, fetchUsersByIdAction } from '../../../../store/user/actions';
import { useAppSelector } from '../../../../store/hooks';
import { ScreenLoading } from '../../../../components/UI/ScreenLoading';

interface IAddStudentsScreen { }


function removeEmptyObjects(array: any[]) {
    return array.filter(obj => Object.keys(obj).length !== 0);
}

const ClassesStudentScreen: React.FC<IAddStudentsScreen> = () => {
    const route = useRoute();
    const { item }: any = route.params;
    const isFocused = useIsFocused();
    const { currentStudent, loading }: any = useAppSelector((state: any) => state.user);
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [studentsList, setStudentsList] = useState(currentStudent);
    //@ts-ignore
    const goNextStep = () => navigation.navigate(NavigationEnum.CLASSES_TAB);

    const onDeleteStudent = (studentId: number) => {

        dispatch(deleteUserAction({ StudentId: studentId, Classes: [item.ClassId] }));
        setStudentsList(studentsList.filter((student: any) => student.StudentId !== studentId));
    }

    const onAddStudent = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.CHANGE_STUDENT_SCREEN, { item, currentStudent });
    }
    const filteredStudents = studentsList?.filter((user: any) => {
        const fullName = `${user.FirstName} ${user.LastName}`.toLowerCase();
        const searchQuery = searchText?.toLowerCase();
        return user.FirstName.toLowerCase().startsWith(searchQuery) ||
            user.LastName.toLowerCase().startsWith(searchQuery) ||
            fullName.startsWith(searchQuery);
    });
    const goBack = () => navigation.goBack()
    useEffect(() => {
        isFocused && dispatch(fetchUsersByIdAction(item.ClassId));
    }, [isFocused]);
    useEffect(() => {
        setStudentsList(currentStudent)
    }, [currentStudent])
    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                    <ScreenHeader text={'Students'} onBackPress={goBack} withBackButton={true} />
                </View>
                <TouchableOpacity onPress={onAddStudent} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <Text style={styles.studentName}>Add New Student</Text>
                    <MinPlus />
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', position: 'relative', marginTop: 26, marginHorizontal: 20 }}>

                            <View style={{ position: 'absolute', zIndex: 1, top: 12, left: 12 }}>
                                <SearchIcon style={{ positon: 'absolute', }} />
                            </View>
                            <TextInput style={styles.input} value={searchText} onChangeText={setSearchText} />
                        </View>
                        <DecorationLine />
                        {loading ? <ScreenLoading /> :
                            <ScrollView style={{ overflow: 'scroll', height: '80%' }} showsVerticalScrollIndicator={false}>
                                <View style={styles.container}>
                                    <View>
                                        {/* Используем filteredStudents вместо studentsList */}
                                        {filteredStudents.map((user: any) => {
                                            return (
                                                <Student name={`${user.FirstName} ${user.LastName}`} onClick={() => onDeleteStudent(user.StudentId)} key={user.StudentId} />
                                            );
                                        })}
                                    </View>
                                </View>
                            </ScrollView>}
                        <View style={{ padding: 20, height: 92, flex: 1, justifyContent: 'flex-end' }}>
                            <CustomButton text={'Finish'} onPress={goNextStep} />
                        </View>
                    </View >
                </View>

            </View >
        </View>
    )
}
interface Student {
    name?: string,
    onClick: () => void,
}
const Student: React.FC<Student> = ({ name, onClick }) => {
    return (
        <>
            <View style={styles.student}>
                <Text style={styles.studentName}>{name}</Text>
                <TouchableOpacity onPress={onClick}>
                    <CheckIcon />
                </TouchableOpacity>
            </View>
            <DecorationLine />
        </>
    );
}

const DecorationLine = () => (
    <View style={styles.decorationLine} />
)
const CheckButton = (onPress: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <CheckIcon />
        </TouchableOpacity>
    )

};
export default ClassesStudentScreen;