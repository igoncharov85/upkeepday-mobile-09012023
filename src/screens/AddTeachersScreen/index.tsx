import React, { FC, useCallback, useMemo } from "react";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { useAddTeachers } from "./presenters/useAddTeachers";
import { ScreenHeader } from "../../components/ScreenHeader";
import { Search } from "../../components/UI/search";
import { FlatList } from "react-native";
import { TeacherListItem } from "./components/teacherListItem";
import { CustomButton } from "../../components/UI/CustomButton";
import { LinedButton } from "../../components/UI/linedButton";
import { ITeacher } from "../../store/businessAccount/entities/ITeacher";

export const AddTeachersScreen: FC = () => {
    const styles = useMemo(() => getStyles(), []);
    const { filteredTeachers, search, isTeachersListEmpty, goBack, setSearch, onAddLater, onAddTeacher, onSave } = useAddTeachers();

    const renderItem = useCallback(({ item }: { item: ITeacher }) => (
        <TeacherListItem item={item} />
    ), []);

    const keyExtractor = useCallback((item: ITeacher) => item.Phone, []);

    return (
        <ScreenContainer
            headerComponent={
                <ScreenHeader containerStyle={styles.header}
                    text="School Teachers"
                    withBackButton={true}
                    onBackPress={goBack}
                    optionalComponent={<LinedButton title={'Add Later'} onPress={onAddLater} disabled={!isTeachersListEmpty} />}
                />}
        >
            <CustomButton style={styles.addingButton} text={'Add New'} onPress={onAddTeacher} />
            <Search value={search} onChangeText={setSearch} />
            <FlatList
                style={styles.list}
                data={filteredTeachers}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
            <CustomButton text={'Save'} style={styles.button} onPress={onSave} disabled={isTeachersListEmpty} />
        </ScreenContainer>
    );
};