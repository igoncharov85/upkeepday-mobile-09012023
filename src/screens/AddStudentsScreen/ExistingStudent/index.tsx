import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { dispatch } from '../../../store/store';
import { fetchUsersAction } from '../../../store/user/actions';
import { useAppSelector } from '../../../store/hooks';
import SearchIcon from '../../../../assets/svg/SearchIcon';
import styles from './styles';
import SelectedUser from '../../../../assets/svg/SelectedUser';
import { updateCurrentClassRequestAction } from '../../../store/shedule';
import { IExistingStudent } from '../../../common/types/schedule.types';
import { CustomButton } from '../../../components/UI/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationEnum } from '../../../common/constants/navigation';

interface IExistingStudentProps {
    students: IExistingStudent[]
    onChancheUsers: (student: IExistingStudent) => void
}


export const ExistingStudent: React.FC<IExistingStudentProps> = ({ students, onChancheUsers }) => {

    const navigation = useNavigation();
    // const [existingStudents, setExistingStudents] = useState<Array<IExistingStudent>>([])
    const [searchText, setSearchText] = useState('');
    const goNextStep = () => {

        //@ts-ignore
        navigation.navigate(NavigationEnum.PREPAYMENT_CONFIGURATION_SCREEN)
    };

    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [])


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
                        {students?.filter((user) => user.FirstName?.toLowerCase().includes(searchText?.toLowerCase())).map((user) => (
                            <Student name={user.FirstName} onClick={onChancheUsers} user={user} key={user?.Email || user.Id} />
                        ))}
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
}
const Student: React.FC<Student> = ({ name, user, onClick }) => {
    const [selected, setSelected] = useState(user.Id ? false : true)

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