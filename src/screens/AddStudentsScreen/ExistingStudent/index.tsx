import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { dispatch } from '../../../store/store';
import { fetchUsersAction } from '../../../store/user/actions';
import SearchIcon from '../../../../assets/svg/SearchIcon';
import styles from './styles';
import SelectedUser from '../../../../assets/svg/SelectedUser';
import { IExistingStudent } from '../../../common/types/schedule.types';
import { CustomButton } from '../../../components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../../store/hooks';

interface IExistingStudentProps {
    students: IExistingStudent[],
    selectedUsers: any[],
    onChancheUsers: (student: IExistingStudent) => void
}


export const ExistingStudent: React.FC<IExistingStudentProps> = ({ students, onChancheUsers, selectedUsers }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [searchText, setSearchText] = useState('');
    const { currentSchool } = useAppSelector(state => state.businessAccount);

    useEffect(() => {
        dispatch(fetchUsersAction({ schoolId: currentSchool?.SchoolId }));
    }, [currentSchool]);

    const goNextStep = () => { navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN) };

    const getName = (student: any) => {
        let fullName = student.FirstName + ' ' + student.LastName;
        if (fullName.length > 25) {
            fullName = fullName.slice(0, 25).concat("...");
        }
        return fullName;
    };

    const filteredStudents = students?.filter((user: any) => {
        const fullName = `${user.FirstName} ${user.LastName}`.toLowerCase();
        const searchQuery = searchText?.toLowerCase();
        return user.FirstName?.toLowerCase().startsWith(searchQuery) ||
            user.LastName?.toLowerCase().startsWith(searchQuery) ||
            fullName.startsWith(searchQuery);
    });

    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', position: 'relative', marginTop: 26, marginHorizontal: 20 }}>
                <View style={{ position: 'absolute', zIndex: 1, top: 12, left: 12 }}>
                    <SearchIcon style={{ positon: 'absolute', }} />
                </View>
                <TextInput style={styles.input} value={searchText} onChangeText={setSearchText} />
            </View>
            <DecorationLine />
            <ScrollView style={{ overflow: 'scroll', height: '80%' }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View >
                        {filteredStudents?.filter((user) =>
                            user.FirstName?.toLowerCase().startsWith(searchText?.toLowerCase()) ||
                            user.LastName?.toLowerCase().startsWith(searchText?.toLowerCase()) ||
                            `${user.FirstName} ${user.LastName}`.toLowerCase().startsWith(searchText?.toLowerCase())).map((user) => {
                                //@ts-ignore
                                let active = selectedUsers.some((selectedUser) => (user?.EnrolledClasses ? selectedUser?.StudentId === user?.StudentId : selectedUser?.Email === user?.Email));
                                return (
                                    <Student name={getName(user)} onClick={onChancheUsers} user={user} key={user?.Email || user.Id} selectedUser={active} />
                                )
                            })}
                    </View>
                </View >
            </ScrollView>
            <View style={{ padding: 20, height: 92, flex: 1, justifyContent: 'flex-end' }}>
                <CustomButton text={'Next Step'} onPress={goNextStep} />
            </View>
        </View >

    )
}


interface Student {
    name?: string,
    user: IExistingStudent,
    onClick: (user: IExistingStudent) => void,
    selectedUser: boolean
}
const Student: React.FC<Student> = ({ name, user, onClick, selectedUser }) => {
    //@ts-ignore
    const [selected, setSelected] = useState(selectedUser)

    const onSelectUser = () => {
        onClick(user)
        setSelected(!selected)
    }

    return (
        <>
            <TouchableOpacity onPress={onSelectUser}>
                <View style={styles.student}>
                    <Text style={styles.studentName}>{name}</Text>
                    <View style={styles.boxContainer}>
                        <SelectedUser />
                        {!selected && <View style={styles.emptyBox} />}
                    </View>
                </View>
            </TouchableOpacity>
            <DecorationLine />
        </>
    );
}

const DecorationLine = () => (
    <View style={styles.decorationLine} />
)