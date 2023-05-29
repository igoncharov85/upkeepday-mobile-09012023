import React, { useState, useEffect, memo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { dispatch } from '../../../store/store';
import { fetchUsersAction } from '../../../store/user/actions';
import { useAppSelector } from '../../../store/hooks';
import SearchIcon from '../../../../assets/svg/SearchIcon';
import styles from './styles';
import SelectedUser from '../../../../assets/svg/SelectedUser';
import { IExistingStudent } from '../../../common/types/schedule.types';
import { CustomButton } from '../../../components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';

interface IExistingStudentProps {
    students: IExistingStudent[],
    selectedUsers: any[],
    onChancheUsers: (student: IExistingStudent) => void
}


export const ExistingStudent: React.FC<IExistingStudentProps> = ({ students, onChancheUsers, selectedUsers }) => {

    const navigation = useNavigation();
    // const [existingStudents, setExistingStudents] = useState<Array<IExistingStudent>>([])
    const [searchText, setSearchText] = useState('');
    const goNextStep = () => {

        //@ts-ignore
        navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN)
    };


    useEffect(() => {
        dispatch(fetchUsersAction());
    }, []);
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
                        {students?.filter((user) => user.FirstName?.toLowerCase().includes(searchText?.toLowerCase())).map((user) => {
                            //@ts-ignore
                            let active = selectedUsers.some((selectedUser) => (user?.EnrolledClasses ? selectedUser?.id === user?.StudentId : selectedUser?.Email === user?.Email));

                            return (
                                //@ts-ignore
                                <Student name={user.FirstName} onClick={onChancheUsers} user={user} key={user?.Email || user.Id} selectedUser={active} />
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
                    {selected && <SelectedUser />}
                </View>
            </TouchableOpacity>
            <DecorationLine />
        </>
    );
}

const DecorationLine = () => (
    <View style={styles.decorationLine} />
)