import React, { FC, memo, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { ScreenContainer } from "../../../../components/UI/screenContainer";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { useUiContext } from "../../../../UIProvider";
import { getStyles } from "./styles";
import { useUpdateClassStudents } from "./presenters/useUpdateClassStudents";
import { Search } from "../../../../components/UI/search";
import { Student } from "../ClassesStudentScreen";
import { AddNewStudentButton } from "../../components/AddNewStudentButton";

export const UpdateClassStudentsScreen: FC = memo(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { currentClass, students, search, setSearch, goBack, onDelete, onAdd } = useUpdateClassStudents();

    const keyExtractor = useCallback((item: any) => String(item.StudentId), []);

    const renderItem = useCallback(({ item }: { item: any }) => (
        <Student containerStyle={styles.studentContainer} name={`${item.FirstName} ${item.LastName}`} onClick={() => onDelete(item)} key={item.StudentId} />
    ), [currentClass]);

    return (
        <ScreenContainer contentContainerStyle={styles.container} scrollEnabled headerComponent={<ScreenHeader withBackButton center onBackPress={goBack} containerStyle={styles.header} text={`${t('students')} ${currentClass?.Name || ''}`} />}>
            <AddNewStudentButton onPress={onAdd} />
            <Search containerStyle={styles.search} value={search} onChangeText={setSearch} />
            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={styles.list}
            />
        </ScreenContainer>
    );
});