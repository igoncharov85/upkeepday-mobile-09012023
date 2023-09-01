import React, { FC, memo, useMemo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useUiContext } from "../../../../UIProvider";
import { getStyles } from "./styles";
import MinPlus from "../../../../../assets/svg/schedule/MinPlus";

interface IProps {
    onPress: () => void;
};

export const AddNewStudentButton: FC<IProps> = memo(({ onPress }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('addNewStudent')}</Text>
            <TouchableOpacity onPress={onPress} >
                <MinPlus />
            </TouchableOpacity>
        </View>
    );
});