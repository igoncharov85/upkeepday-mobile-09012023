import React, { FC, useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getStyles } from "./styles";
import PhoneIcon from "../../../../../../assets/svg/students/PhoneIcon";
import { useUiContext } from "../../../../../UIProvider";
import { ITeacher } from "../../../../../store/businessAccount/entities/ITeacher";
import { useNavigation } from "@react-navigation/native";
import { NavigationEnum } from "../../../../../common/constants/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MailIcon from "../../../../../../assets/svg/students/MailIcon";
import DeleteIcon from "../../../../../../assets/svg/classes/DeleteIcon";
import EditIcon from "../../../../../../assets/svg/classes/EditIcon";
import { dispatch } from "../../../../../store/store";
import { businessAccountActions } from "../../../../../store/businessAccount";

interface IProps {
    item: ITeacher;
    deleteTeacher: (value: ITeacher) => void;
};

export const TeacherItem: FC<IProps> = ({ item, deleteTeacher }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const onEdit = useCallback(() => {
        dispatch(businessAccountActions.setEditingTeacher(item));
        navigate(NavigationEnum.EDIT_TEACHER);
    }, [item]);

    const onDelete = useCallback(() => { deleteTeacher(item) }, [item]);
    const onOpenClasses = useCallback(() => { navigate(NavigationEnum.TEACHERS_CLASSES_SCREEN) }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topWrapper}>
                <Text style={styles.name}>{item.FirstName} {item.LastName}</Text>
                <TouchableOpacity onPress={onOpenClasses}>
                    <Text style={styles.linedText}>{`${t('classes')}: ${0}`}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contactWrapper}>
                <PhoneIcon />
                <Text style={styles.text}>{item.Phone}</Text>
            </View>
            <View style={styles.contactWrapper}>
                <MailIcon />
                <Text style={styles.text}>{item.Email || t('cantFind')}</Text>
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.title}>{t('typeOfRights')}</Text>
                <Text style={styles.text}>{item.Permission || t('cantFind')}</Text>
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.title}>{t('notes')}</Text>
                <Text style={styles.text} >{item.Notes || '—'}</Text>
            </View>
            <View style={styles.buttonsWrapper}>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <EditIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <DeleteIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};