import React, { useCallback, useMemo } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { ClassesNavigation } from './components/ClassesNavigation';
import ClassesItem from './components/ClassesItem';
import { getStyles } from './styles';
import { useAppSelector } from '../../store/hooks';
import { IClassesResponse } from '../../common/types/classes.types';
import { useUiContext } from '../../UIProvider';

export const ClassesScreen = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(), []);
    const { classes, loading } = useAppSelector(state => state.classes);

    const keyExtractor = useCallback((item: IClassesResponse) => String(item.ClassId), [])

    const renderItem = useCallback(({ item, index }: { item: IClassesResponse, index: number }) => (
        <ClassesItem item={item} key={index} />
    ), []);

    return (
        <View style={styles.container}>
            <ClassesNavigation />
            <FlatList
                contentContainerStyle={styles.list}
                data={loading ? [] : classes}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={loading ? <ActivityIndicator style={styles.loader} color={colors.primary} size={'large'} /> : null}
            />
        </View>
    )
};