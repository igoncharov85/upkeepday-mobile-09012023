import React, { FC, useMemo } from 'react';
import { Keyboard, ScrollView, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { getStyle } from './styles';

interface IProps {
    edges?: Edge[];
    setRef?: (value: any) => void;
    children: React.ReactNode;
    scrollEnabled?: boolean;
    keyboardShouldPersistTaps?: boolean;
    containerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    headerComponent?: React.ReactNode;
}

export const ScreenContainer: FC<IProps> = ({ headerComponent, edges, setRef, children, scrollEnabled = false, keyboardShouldPersistTaps = true, containerStyle, contentContainerStyle }) => {
    const styles = useMemo(() => getStyle(), []);

    return (
        <SafeAreaView style={[styles.container, containerStyle]} edges={edges} >
            {!!headerComponent && headerComponent}
            {scrollEnabled
                ? <ScrollView
                    nestedScrollEnabled
                    ref={(ref) => setRef?.(ref)}
                    scrollEnabled={scrollEnabled}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.contentContainerStyle, contentContainerStyle]}
                    style={styles.contentContainerStyle}
                    keyboardDismissMode='interactive'
                    keyboardShouldPersistTaps={'handled'}
                >
                    {children}
                </ScrollView>
                : <View style={[styles.container, contentContainerStyle]} onStartShouldSetResponder={keyboardShouldPersistTaps ? Keyboard.dismiss : undefined as any}>
                    {children}
                </View>}
        </SafeAreaView>
    );
};
