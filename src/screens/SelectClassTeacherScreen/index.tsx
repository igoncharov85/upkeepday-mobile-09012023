import React, { FC, useCallback, useMemo } from "react";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../components/UI/screenContainer";
import { useAddTeachers } from "./presenters/useAddTeachers";
import { ScreenHeader } from "../../components/ScreenHeader";
import { Search } from "../../components/UI/search";
import { FlatList } from "react-native";
import { CustomButton } from "../../components/UI/CustomButton";
import { LinedButton } from "../../components/UI/linedButton";
import { ITeacher } from "../../store/businessAccount/entities/ITeacher";
import { useUiContext } from "../../UIProvider";
import { RadioButton } from "../../components/UI/radioButton";

export const SelectClassTeacherScreen: FC = () => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { filteredTeachers, search, currentTeacher, onSetCurrentTeacher, goBack, setSearch, onAddLater, onSave } = useAddTeachers();

    const renderItem = useCallback(({ item }: { item: ITeacher }) => (
        <RadioButton isCurrent={currentTeacher?.TeacherId === item.TeacherId} title={`${item.FirstName} ${item.LastName}`} onPress={onSetCurrentTeacher(item)} />
    ), [currentTeacher]);

    const keyExtractor = useCallback((item: ITeacher) => item.Phone, []);

    return (
        <ScreenContainer
            headerComponent={
                <ScreenHeader containerStyle={styles.header}
                    text={t('SelectTeachers')}
                    withBackButton={true}
                    onBackPress={goBack}
                    optionalComponent={<LinedButton title={'Add Later'} onPress={onAddLater} />}
                />}
        >
            <Search placeholder={t('namePlaceholder')} value={search} onChangeText={setSearch} />
            <FlatList
                style={styles.list}
                data={filteredTeachers}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
            <CustomButton text={t('stepCounter').replace('{step}', '3').replace('{total}', '10')} style={styles.button} onPress={onSave} disabled={!currentTeacher} />
        </ScreenContainer>
    );
};