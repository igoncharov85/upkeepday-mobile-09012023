import React, { FC, useCallback } from 'react'
import { TouchableOpacity } from 'react-native';
import { LoggerIcon } from '../loggerIcon';
import { ModalLogger } from '../modalLogger';
import { styles } from './styles';
import { dispatch } from '../../../../../store/store';
import { loggerActions } from '../../../../../store/logger';


export const Logger: FC = ({ }) => {
    const onOpen = useCallback(() => {
        dispatch(loggerActions.setIsVisible(true));
    }, []);

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={onOpen} >
                <LoggerIcon color={'gray'} />
            </TouchableOpacity >
            <ModalLogger />
        </>
    );
};