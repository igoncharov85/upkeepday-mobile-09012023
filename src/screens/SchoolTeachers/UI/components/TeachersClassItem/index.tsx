import React, { FC, useMemo } from "react";
import { View, Text } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { IClassesResponse } from "../../../../../common/types/classes.types";

interface IProps {
    item: IClassesResponse;
};

export const TeachersClassItem: FC<IProps> = ({ item }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text numberOfLines={2} style={styles.title}>{item.Name}</Text>
            <View style={styles.detailsWrapper}>
                <Text style={styles.text}>{t('totalHeld') + 8}</Text>
                <Text style={styles.text}>{t('totalScheduled') + 10}</Text>
            </View>
        </View>
    );
};