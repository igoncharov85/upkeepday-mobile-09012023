import React, { FC, memo, useMemo } from 'react';
import { View, TextInput, ViewStyle, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { getStyle } from './styles';
import SearchIcon from '../../../../assets/svg/SearchIcon';

interface Props extends TextInputProps {
    containerStyle?: ViewStyle;
};

export const Search: FC<Props> = memo(({ containerStyle, ...otherProps }) => {
    const { value, placeholder, onBlur, onChangeText } = otherProps;
    const styles = useMemo(() => getStyle(), []);

    const handleOnChangeText = async (value: string) => {
        onChangeText?.(value);
        
    };

    const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (value?.replaceAll(' ', '').length) {
            onBlur?.(event);
        };
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputContainer}  >
                <View style={styles.searchContainer}>
                    <SearchIcon />
                </View>
                <TextInput
                    {...otherProps}
                    style={[styles.input, otherProps.style]}
                    placeholder={placeholder || ''}
                    value={value}
                    onChangeText={handleOnChangeText}
                    onBlur={handleOnBlur}
                />
            </View>
        </View>
    );
})
