import React, { FC, memo, useCallback, useMemo } from "react";
import { getStyles } from "./styles";
import { View, Text, TouchableOpacity } from "react-native";
import OrangeCrossIcon from "../../../../../assets/svg/students/OrangeCrossIcon";
import { dispatch } from "../../../../store/store";
import { ITeacher, businessAccountFormActions } from "../../../../store/businessAccountForm";

interface IProps {
    item: ITeacher;
};

export const TeacherListItem: FC<IProps> = memo(({ item }) => {
    const styles = useMemo(() => getStyles(), []);

    const onDelete = useCallback(() => {
        dispatch(businessAccountFormActions.deleteTeacher(item));
    }, [item]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${item?.FirstName || ''} ${item?.LastName || ''}`}</Text>
            <TouchableOpacity onPress={onDelete}>
                <OrangeCrossIcon colorStart={'#AA290D'} colorEnd={'#FA6B6B'} />
            </TouchableOpacity>
        </View>
    );
});