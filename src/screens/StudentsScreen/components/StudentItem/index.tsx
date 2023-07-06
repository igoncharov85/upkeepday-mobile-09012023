import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EditIcon from "../../../../../assets/svg/classes/EditIcon";
import MailIcon from "../../../../../assets/svg/students/MailIcon";
import { NavigationEnum } from "../../../../common/constants/navigation";
import { EClassesStatus } from "../../../../common/types/classes.types";

import styles from "./styles";
import { IStudentResponse } from "../../../../common/types/user";
import PhoneIcon from "../../../../../assets/svg/students/PhoneIcon";
import { dispatch } from "../../../../store/store";
import { deleteStudentAction } from "../../../../store/user/actions";

interface IStudentsItem {
    item: IStudentResponse
}



const StudentsItem: React.FC<IStudentsItem> = ({ item }) => {
    const navigation = useNavigation();

    const handleEdit = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.EDIT_STUDENTS_SCREEN, { item });
    };

    const handleDocument = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.CLASSES_PREVIEW_SCREEN, { item });
    }

    const handleDelete = () => {
        //@ts-ignore
        navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: item,
            actionBtn: () => { dispatch(deleteStudentAction({ StudentId: item.StudentId })) },
            nameAction: 'Delete  Permanently',
        })
    };

    return (
        <View style={styles.container}>
            <View style={[styles.part, styles.partTop]}>
                <View>
                    <Text style={styles.title}>{item.FirstName} {item.LastName}</Text>
                    <View style={styles.payment}>
                        <View style={styles.paymentItem}>
                            <PhoneIcon />
                        </View>
                        <Text style={styles.text}>{item.PhoneNumber}</Text>
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
                    <Text style={[styles.underlineText, styles.textRight]}>Enrolled Classes: {item.EnrolledClasses.length}</Text>
                    <Text style={[styles.underlineText, styles.textRight]}>Balance: <Text style={{ color: '#169861' }}>
                        {item.Balance}
                    </Text>
                    </Text>
                </View>
            </View>

            <View style={styles.part}>
                <View style={styles.link}>
                    {item.EnrolledClasses[0].Status?.toLocaleLowerCase() === EClassesStatus.scheduled ? (
                        <>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={handleEdit}>
                                <EditIcon />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={handleEdit}
                        >
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

export default StudentsItem;