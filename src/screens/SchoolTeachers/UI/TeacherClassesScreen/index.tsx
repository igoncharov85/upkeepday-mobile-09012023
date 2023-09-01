import React, { FC, useCallback, useMemo } from "react";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { getStyles } from "./styles";
import { ScreenContainer } from "../../../../components/UI/screenContainer";
import { useUiContext } from "../../../../UIProvider";
import { useTeacherClasses } from "../../presenters/useTeacherClasses";
import { FlatList } from "react-native";
import { TeachersClassItem } from "../components/TeachersClassItem";
import { Search } from "../../../../components/UI/search";
import { IClassesResponse } from "../../../../common/types/classes.types";

export const TeacherClassesScreen: FC = () => {
	const { colors, t } = useUiContext();
	const styles = useMemo(() => getStyles(colors), [colors]);
	const { filteredClasses, editingTeacher, search, setSearch, goBack } = useTeacherClasses();

	const renderItem = useCallback(({ item }: { item: IClassesResponse }) => (
		<TeachersClassItem item={item} />
	), []);

	return (
		<ScreenContainer scrollEnabled headerComponent={<ScreenHeader center containerStyle={styles.header} text={t('teachersClasses').replace('{name}', `${editingTeacher?.FirstName} ${editingTeacher?.LastName}`)} withBackButton={true} onBackPress={goBack} />}>
			<Search containerStyle={styles.search} value={search} onChangeText={setSearch} />
			<FlatList
				contentContainerStyle={styles.list}
				data={filteredClasses}
				renderItem={renderItem}
			/>
		</ScreenContainer>
	);
};