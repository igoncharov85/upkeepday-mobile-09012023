import React, { FC, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { getStyle } from './styles';
import { useAppSelector } from '../../../../../../store/hooks';
import { useUiContext } from '../../../../../../UIProvider';
import { ChevronIcon } from '../../../../../../../assets/svg/chevronIcon';
import { EditIcon } from '../../../../../../../assets/svg/editIcon';
import { scaleHorizontal } from '../../../../../../services/utils/Utils';
import { dispatch } from '../../../../../../store/store';
import { businessAccountActions } from '../../../../../../store/businessAccount';

export const AccountSelector: FC = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const { currentSchool } = useAppSelector(store => store.businessAccount);
    const { user } = useAppSelector(store => store.auth);
    const { isSelectAccount } = useAppSelector(store => store.businessAccount);

    const onOpenModal = useCallback(() => {
        dispatch(businessAccountActions.setIsSelectAccount(true));
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.titleWrapper} onPress={onOpenModal}>
                <Text numberOfLines={1} style={styles.title}>{currentSchool?.BusinessName || `${user?.FirstName} ${user?.LastName}`}</Text>
                <ChevronIcon position={isSelectAccount ? 'UP' : 'DOWN'} color={colors.title} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
                <EditIcon height={scaleHorizontal(20)} width={scaleHorizontal(20)} />
            </TouchableOpacity>
        </View>
    );
};