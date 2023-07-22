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
import { deleteStudentAction, deleteUserAction, fetchStudentsByIdAction, fetchUsersByIdAction } from '../../../../store/user/actions';
import { useAppSelector } from '../../../../store/hooks';
import { EditStudentsNavigation } from './StudentsNavigation';

interface IAddStudentsScreen { }


function removeEmptyObjects(array: any[]) {
    return array.filter(obj => Object.keys(obj).length !== 0);
}

const PreviewStudentScreen: React.FC<IAddStudentsScreen> = () => {
    const route = useRoute();
    const { item }: any = route.params;

    const isFocused = useIsFocused();
    const { studentList, loading }: any = useAppSelector((state: any) => state.user);
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [studentsList, setStudentsList] = useState(studentList);
    const [status, setStatus] = useState('');
    //@ts-ignore
    const goNextStep = () => navigation.navigate(NavigationEnum.STUDENTS_TAB);

    function onDeleteStudent(ClassId: number, Name: string) {
        //@ts-ignore
        navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: {
                StudentName: `${item.FirstName} ${item.LastName}`,
                ClassName: Name
            },
            actionBtn: () => { dispatch(deleteUserAction({ StudentId: item.StudentId, Classes: [ClassId] })) },
            nameAction: 'Confirm',
        })

    }
    const filterStudents = (studentList: any[], searchText: string, status: string) => {
        return studentList.filter((user: any) => {
            const fullName = `${user.FirstName} ${user.LastName}`.toLowerCase();
            const searchQuery = searchText?.toLowerCase();
            return user.FirstName?.toLowerCase().startsWith(searchQuery) ||
                user.LastName?.toLowerCase().startsWith(searchQuery) ||
                fullName.startsWith(searchQuery);
        });
    }
    const onHandleNavigation = (type: any) => {
        setStatus(type);
    }

    const goBack = () => navigation.goBack()

    useEffect(() => {
        dispatch(fetchStudentsByIdAction({ StudentId: item.StudentId }));
    }, [isFocused]);
    const filteredStudents = filterStudents(studentList, searchText, status);

    return loading ? <Text>loading...</Text> : (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ padding: 20, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 1, maxWidth: '50%' }}>
                    <ScreenHeader text={'Students'} onBackPress={goBack} withBackButton={true} />

                </View>


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
                        <EditStudentsNavigation onHandleNavigation={onHandleNavigation} />
                        <DecorationLine />
                        <ScrollView style={{ overflow: 'scroll', height: '72%' }} showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <View>
                                    {filteredStudents.map((user: any) => {
                                        return (
                                            <Student item={user} onDeleteClass={onDeleteStudent} key={user.ClassId} />
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ padding: 20, height: 92, flex: 1, justifyContent: 'flex-end' }}>
                            <CustomButton text={'Ok'} onPress={goNextStep} />
                        </View>
                    </View >
                </View>

            </View >
        </View>
    )
}
interface IStudent {
    item: any;
    onDeleteClass: any;
}
const Student: React.FC<IStudent> = ({ item, onDeleteClass }) => {
    const { Name, Attended, EndDate, Scheduled, StartDate, Status, ClassId }: any = item || {};
    const onDeleteStudent = () => {
        onDeleteClass(ClassId, Name);
    }
    return (
        <>
            <View style={styles.student}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.studentName}>{Name}</Text>
                    <Text style={styles.text}>{StartDate} - {EndDate}</Text>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.text}>Total attended: {Attended}</Text>
                    <Text style={styles.text}>Total scheduled: {Scheduled}</Text>
                </View>
                {Status == 'Scheduled' && (
                    <TouchableOpacity onPress={onDeleteStudent}>
                        <CheckIcon />
                    </TouchableOpacity>)}
            </View>
            <DecorationLine />
        </>
    );
}

const DecorationLine = () => (
    <View style={styles.decorationLine} />
)


export default PreviewStudentScreen;