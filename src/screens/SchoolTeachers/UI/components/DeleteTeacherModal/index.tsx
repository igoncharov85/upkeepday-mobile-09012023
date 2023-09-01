import React, { FC, useCallback, useMemo } from "react";
import { View, Image, Text } from "react-native";
import { getStyles } from "./styles";
import { useUiContext } from "../../../../../UIProvider";
import { Modal } from "react-native";
import { CustomButton } from "../../../../../components/UI/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import { useAppSelector } from "../../../../../store/hooks";
import { selectBusinessAccount } from "../../../../../store/businessAccount";
import { dispatch } from "../../../../../store/store";
import { deleteSchoolTeacherAction } from "../../../../../store/businessAccount/actions";

const BACKGROUND = require('../../../../../../assets/images/gradientBackground.png');

interface IProps {
    isVisible: boolean;
    onClose: () => void;
};

export const DeleteTeacherModal: FC<IProps> = ({ isVisible, onClose }) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { editingTeacher } = useAppSelector(selectBusinessAccount);

    const onDelete = useCallback(() => {
        dispatch(deleteSchoolTeacherAction());
        onClose();
    }, []);

    return (
        <Modal transparent visible={isVisible} style={styles.modal}>
            <Image source={BACKGROUND} style={styles.backgroundImage} />
            <View style={styles.container}>
                <Text style={styles.text}>{t('deleteTeacher').replace('{name}', `${editingTeacher?.FirstName} ${editingTeacher?.LastName}`)}</Text>
                <View style={styles.buttonsWrapper}>
                    <CustomButton style={styles.button} text={t('confirm')} onPress={onDelete} />
                    <CustomButton style={styles.button} text={t('cancel')} onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};