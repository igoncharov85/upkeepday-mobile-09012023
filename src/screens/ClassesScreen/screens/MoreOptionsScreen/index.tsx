import React, { FC, memo, useMemo } from "react";
import { ScreenContainer } from "../../../../components/UI/screenContainer";
import { ScreenHeader } from "../../../../components/ScreenHeader";
import { useUiContext } from "../../../../UIProvider";
import { getStyles } from "./styles";
import { CustomButton } from "../../../../components/UI/CustomButton";
import { ChevronIcon } from "../../../../../assets/svg/chevronIcon";
import { useMoreOptions } from "./presenters/useMoreOptions";

export const MoreOptionsScreen: FC = memo(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { currentClass, goBack, onUpdateStudents, onRolloverClass, onArchiveClass } = useMoreOptions();

    return (
        <ScreenContainer contentContainerStyle={styles.container} scrollEnabled headerComponent={<ScreenHeader withBackButton onBackPress={goBack} containerStyle={styles.header} text={currentClass?.Name || ''} />}>
            <CustomButton onPress={onUpdateStudents} style={styles.button} textStyle={styles.text} text={t('updateStudents')} icon={<ChevronIcon color={colors.text} position={'RIGHT'} />} />
            <CustomButton onPress={onRolloverClass} style={styles.button} textStyle={styles.text} text={t('rolloverClass')} icon={<ChevronIcon color={colors.text} position={'RIGHT'} />} />
            <CustomButton onPress={onArchiveClass} style={styles.button} textStyle={styles.text} text={t('archiveClass')} icon={<ChevronIcon color={colors.text} position={'RIGHT'} />} />
        </ScreenContainer>
    );
});