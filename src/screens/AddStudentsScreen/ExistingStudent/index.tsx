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

interface IExistingStudentProps {

}


export const ExistingStudent: React.FC<IExistingStudentProps> = () => {
    const { students } = useAppSelector(state => state.user)
    const [existingStudents, setExistingStudents] = useState<Array<IExistingStudent>>([])
    const [searchText, setSearchText] = useState('');


    const onChancheUsers = (id: number) => {
        setExistingStudents(existingStudents => {
            const index = existingStudents.findIndex(event => event.StudentId === id);
            if (index === -1) {
                return [...existingStudents, { StudentId: id }];
            } else {
                return existingStudents.filter((_, i) => i !== index);
            }
        });
    };
    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [])


    useEffect(() => {
        return () => {

            dispatch(updateCurrentClassRequestAction({ ExistingStudents: existingStudents, }))
            // Выполнить действия при удалении компонента
            console.log('Компонент удаляется!');
        };
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
            <ScrollView style={{ overflow: 'scroll', height: '85%' }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View >
                        {students.filter((user) => user.FirstName?.toLowerCase().includes(searchText?.toLowerCase())).map((user) => (
                            <Student name={user.FirstName} onClick={onChancheUsers} id={user.StudentId} key={user.StudentId} />
                        ))}
                    </View>
                </View >
            </ScrollView>
        </View >

    )
}


interface Student {
    name: string,
    id: number,
    onClick: (id: number) => void,
}
const Student: React.FC<Student> = ({ name, id, onClick }) => {
    const [selected, setSelected] = useState(false)

    const onSelectUser = () => {
        onClick(id)
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