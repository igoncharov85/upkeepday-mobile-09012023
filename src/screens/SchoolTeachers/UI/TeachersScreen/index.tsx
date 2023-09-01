import React, { FC, useCallback, useMemo } from "react";
import { getStyles } from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { ScreenContainer } from "../../../../components/UI/screenContainer";
import { ITeacher } from "../../../../store/businessAccount/entities/ITeacher";
import { useTeachers } from "../../presenters/useTeachers";
import { TeacherItem } from "../components/TeacherItem";
import { DeleteTeacherModal } from "../components/DeleteTeacherModal";

export const TeachersScreen: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { schoolTeachers, isDeleteModal, deleteTeacher, onClose } = useTeachers();

    const renderItem = useCallback(({ item }: { item: ITeacher }) => (
        <TeacherItem item={item} deleteTeacher={deleteTeacher} />
    ), []);

    return (
        <ScreenContainer>
            <FlatList
                contentContainerStyle={styles.list}
                data={schoolTeachers}
                renderItem={renderItem}
            />
            <DeleteTeacherModal isVisible={isDeleteModal} onClose={onClose} />
        </ScreenContainer>
    );
};