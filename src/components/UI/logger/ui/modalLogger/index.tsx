import React, { FC, useCallback, useMemo, } from 'react'
import { FlatList, Modal, TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import { ILog } from '../../entity/ILogger';
import { LoggerItem } from '../loggerItem';
import { getStyle } from './styles';
import { useAppSelector } from '../../../../../store/hooks';
import { dispatch } from '../../../../../store/store';
import { loggerActions } from '../../../../../store/logger';

export const ModalLogger: FC = ({ }) => {
    const { isVisible, logs } = useAppSelector(state => state.logger);
    const styles = useMemo(() => getStyle(), []);

    const renderItem = useCallback(({ item }: any) => <LoggerItem item={item} />, []);
    const keyExtractor = useCallback((item: ILog) => item.id, []);
    const onClose = useCallback(() => { dispatch(loggerActions.setIsVisible(false)) }, []);

    return (
        <Modal visible={isVisible}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={onClose} >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity >
                </View>
                <FlatList
                    data={logs}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    style={styles.container}
                />
            </SafeAreaView>
        </Modal >
    );
};