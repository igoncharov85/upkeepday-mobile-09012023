import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EditIcon from "../../../../../assets/svg/classes/EditIcon";
import MailIcon from "../../../../../assets/svg/students/MailIcon";
import { NavigationEnum } from "../../../../common/constants/navigation";

import styles from "./styles";
import { IStudentResponse } from "../../../../common/types/user";
import PhoneIcon from "../../../../../assets/svg/students/PhoneIcon";
import { dispatch } from "../../../../store/store";
import { deleteStudentAction, updateStudentStatus } from "../../../../store/user/actions";
import CheckIcon from "../../../../../assets/svg/classes/CheckIcon";
import OrangeCrossIcon from "../../../../../assets/svg/students/OrangeCrossIcon";

interface IStudentsItem {
    item: IStudentResponse | any
}

export enum EClassesStatus {
    scheduled = 'Scheduled',
    archived = 'Archived',
    nonScheduled = 'NonScheduled'
}

const StudentsItem: React.FC<IStudentsItem> = ({ item }) => {
    const navigation = useNavigation();

    const studentStatus = item.Status;
    const handleEdit = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.EDIT_STUDENTS_SCREEN, { item });
    };

    const handleInfo = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.PREVIEW_STUDENTS_SCREEN, { item });
    }
    const onArchived = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: item,
            actionBtn: () => {
                dispatch(updateStudentStatus({ status: 'Archived', StudentId: item.StudentId }))
                //@ts-ignore
                navigation.navigate(NavigationEnum.STUDENTS_TAB)
            },
            nameAction: 'Archive Student',
        })
    }
    const handleDelete = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: item,
            actionBtn: () => {
                dispatch(deleteStudentAction({ StudentId: item.StudentId }))
                //@ts-ignore
                navigation.navigate(NavigationEnum.STUDENTS_TAB)
            },
            nameAction: 'Delete  Permanently',
        })
    };
    return (
        <View style={styles.container}>
            <View style={[styles.part]}>
                <Text style={styles.title}>{item.FirstName} {item.LastName}</Text>
            </View>
            <View style={[styles.part, styles.partTop]}>
                <View>
                    <View style={styles.payment}>
                        <View style={styles.paymentItem}>
                            <PhoneIcon />
                        </View>
                        <Text style={styles.text}>
                            {
                                //@ts-ignore
                                item.Phone}</Text>
                    </View>
                    <View style={styles.payment}>
                        <View style={styles.paymentItem}>
                            <MailIcon />
                        </View>
                        <Text style={styles.text}>{item.Email}</Text>
                    </View>
                    <Text style={styles.text}>
                        <Text style={styles.title}>Notes: </Text>
                        {item.Notes}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleInfo}>
                        <Text style={[styles.underlineText, styles.textRight]}>Enrolled Classes: {item.EnrolledClasses.length}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.underlineText, styles.textRight]}>Balance: <Text style={{ color: '#169861' }}>
                        {item.Balance}
                    </Text>
                    </Text>
                </View>
            </View>

            <View style={styles.part}>
                <View style={styles.link}>
                    {studentStatus === EClassesStatus.scheduled && (
                        <>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={handleEdit}>
                                <EditIcon />
                            </TouchableOpacity>
                        </>
                    )}
                    {studentStatus === EClassesStatus.nonScheduled && (
                        <>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={handleEdit}
                            >
                                <EditIcon />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={onArchived}
                            >
                                <OrangeCrossIcon />
                            </TouchableOpacity>
                        </>
                    )}
                    {studentStatus === EClassesStatus.archived && (
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={handleDelete}
                        >
                            <CheckIcon />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

export default StudentsItem;