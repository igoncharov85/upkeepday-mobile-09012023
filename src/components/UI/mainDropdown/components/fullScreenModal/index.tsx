import React, { FC, useCallback, useMemo, useState } from 'react';
import { Modal, ModalProps, View } from "react-native";
import { getStyle } from './styles';
import { ScreenContainer } from '../../../screenContainer';
import { ScreenHeader } from '../../../../ScreenHeader';
import { RadioButton } from '../../../radioButton';
import { CustomButton } from '../../../CustomButton';

interface IProps extends ModalProps {
    data: any[];
    selected: any | null;
    labelField: string;
    valueField: string;
    setSelected: (value: any) => void;
    setIsVisible: (value: boolean) => void;
};

export const FullScreenModal: FC<IProps> = ({ data, selected, labelField, valueField, setSelected, setIsVisible, ...props }) => {
    const styles = useMemo(() => getStyle(), []);
    const [selectedLocal, setSelectedLocal] = useState(selected);

    const onGoBack = useCallback(() => {
        setIsVisible(false);
        setSelectedLocal(selected);
    }, [selected]);

    const onSave = useCallback(() => {
        setSelected(selectedLocal);
        setIsVisible(false);
    }, [selectedLocal]);

    return (
        <Modal {...props} style={styles.container}>
            <ScreenContainer scrollEnabled headerComponent={<ScreenHeader withBackButton onBackPress={onGoBack} containerStyle={styles.header} text={'Type of Permission'} />}>
                <View style={styles.radioButtonsWrapper}>
                    {
                        data?.map(item =>
                            <RadioButton
                                key={item?.[valueField]}
                                isCurrent={item?.[valueField] === selectedLocal}
                                title={item?.[labelField]}
                                onPress={() => setSelectedLocal(item?.[valueField])}
                            />)
                    }
                </View>
                <CustomButton onPress={onSave} style={styles.button} text={'Save'} />
            </ScreenContainer>
        </Modal>
    );
};