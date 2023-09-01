import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DocumentIcon from "../../../../../assets/svg/classes/DocumentIcon";
import EditIcon from "../../../../../assets/svg/classes/EditIcon";
import MailIcon from "../../../../../assets/svg/classes/MailIcon";
import ScheduledIcon from "../../../../../assets/svg/classes/ScheduledIcon";
import PaymentIcon from "../../../../../assets/svg/classes/PaymentIcon";
import { NavigationEnum } from "../../../../common/constants/navigation";
import { EClassesStatus, IClassesResponse } from "../../../../common/types/classes.types";
import DeleteIcon from "../../../../../assets/svg/classes/DeleteIcon";
import { formatDateForPeriod } from "../../../../services/utils/fullDateToValue.util";
import { dispatch } from "../../../../store/store";
import { deleteClassesAction } from "../../../../store/classes/actions";
import { useAppSelector } from "../../../../store/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import More from "../../../../../assets/svg/schedule/More";
import { useUiContext } from "../../../../UIProvider";
import { getStyles } from "./styles";
import { businessAccountActions, selectBusinessAccount } from "../../../../store/businessAccount";

interface IClassesItem {
    item: IClassesResponse
};

const ClassesItem: React.FC<IClassesItem> = ({ item }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), [])
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { currentSchool } = useAppSelector(selectBusinessAccount);

    const handleEdit = () => {
        dispatch(businessAccountActions.setCurrentClass(item));
        dispatch(businessAccountActions.setIsEdit(true));
        navigation.navigate(currentSchool ? NavigationEnum.ADD_SCHOOL_CLASS_SCREEN : NavigationEnum.EDIT_CLASS_SCREEN, { item, isClear: false });
    };

    const handleDocument = () => {
        navigation.navigate(NavigationEnum.CLASSES_PREVIEW_SCREEN, { item });
    }

    const handleDelete = () => {
        navigation.navigate(NavigationEnum.RESULT_CLASS_MODAL, {
            item: item,
            actionBtn: () => { 
                dispatch(deleteClassesAction({ id: item.ClassId, schoolId: currentSchool?.SchoolId }));
                navigation.goBack();
            },
            nameAction: 'Delete  Permanently',
        })
    };

    const onOpenMoreOptions = () => {
        dispatch(businessAccountActions.setCurrentClass(item));
        navigation.navigate(NavigationEnum.MORE_OPTIONS_SCREEN, { currentClass: item });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.part, styles.partTop]}>
                <View>
                    <Text style={styles.title}>{item.Name}</Text>
                    <Text style={styles.text}>{formatDateForPeriod(item.StartDate)} - {formatDateForPeriod(item.EndDate)}</Text>
                    <View style={styles.payment}>
                        <View style={styles.paymentItem}>
                            <PaymentIcon active={item.TrackPrepayment} />
                        </View>
                        <Text style={styles.underlineText}>Payment Tracking</Text>
                    </View>
                    <Text style={styles.text}>Total classes held: {item.TotalClassesHeld}</Text>
                </View>
                <View>
                    <Text style={styles.text} />
                    <Text style={[styles.text, styles.textRight]}>{item.Location?.Address || 'Location Address'}</Text>
                    <Text style={[styles.underlineText, styles.textRight]}>{item.Students?.length} students</Text>
                    <Text style={[styles.text, styles.textRight]}>Scheduled classes: {item.ScheduledClasses}</Text>
                </View>
            </View>
            <View style={styles.part}>
                <View style={styles.link}>
                    {item.Status?.toLocaleLowerCase() === EClassesStatus.scheduled ? (
                        <>
                            <TouchableOpacity
                                style={styles.linkItem}
                                onPress={handleEdit}>
                                <EditIcon />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }} style={styles.linkItem}>
                                <MailIcon />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.linkItem} onPress={handleDocument}>
                                <DocumentIcon />
                            </TouchableOpacity>
                            {currentSchool
                                ? <View style={styles.moreWrapper}>
                                    <TouchableOpacity onPress={onOpenMoreOptions} style={styles.moreButton}>
                                        <More color={colors.border} />
                                    </TouchableOpacity>
                                </View>
                                : <TouchableOpacity onPress={() => { }} style={styles.linkItem}>
                                    <ScheduledIcon />
                                </TouchableOpacity>
                            }
                        </>
                    ) : (
                        <TouchableOpacity style={styles.linkItem} onPress={handleDelete}>
                            <DeleteIcon />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ClassesItem;