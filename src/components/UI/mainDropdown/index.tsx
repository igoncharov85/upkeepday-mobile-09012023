import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text, ViewStyle, TouchableOpacity } from "react-native";
import { getStyle } from './styles';
import { ChevronIcon } from '../../../../assets/svg/chevronIcon';
import { CustomInput } from '../CustomInput';
import { Dropdown } from 'react-native-element-dropdown';
import { FullScreenModal } from './components/fullScreenModal';

interface IProps {
    title: string;
    data?: any[];
    search?: boolean;
    searchValue?: string;
    selected?: any | null;
    placeholder?: string;
    labelField?: string;
    valueField?: string;
    fullScreen?: boolean;
    onChangeSearch?: (value: string) => void;
    setSelected?: (value: any) => void;
    onEndReached?: () => void;
    onFocus?: () => void;
    containerStyle?: ViewStyle;
    dropdownStyle?: ViewStyle;
};

export const MainDropdown: FC<IProps> = ({ title, data, search = false, searchValue = '', selected, placeholder = '', labelField = '', valueField = '', fullScreen = false, onChangeSearch = () => { }, setSelected = () => { }, onFocus, containerStyle, dropdownStyle }) => {
    const styles = useMemo(() => getStyle(), []);
    const [isFocused, setIsFocused] = useState(false);

    const handleOnFocus = useCallback(() => {
        setIsFocused(true);
        onFocus?.();
    }, []);

    const onBlur = useCallback(() => { setIsFocused(false) }, []);
    const renderRightIcon = useCallback(() => (<ChevronIcon position={isFocused ? 'UP' : 'DOWN'} />), [isFocused]);
    const renderInputSearch = useCallback(() => (<CustomInput onFocus={() => { }} wrapperStyle={styles.inputSearchStyle} value={searchValue} onChangeText={onChangeSearch} />), [searchValue]);

    const renderItem = useCallback((item: any, selected?: boolean) => (
        <View style={selected ? styles.selectedItemContainer : styles.itemContainer}>
            <Text numberOfLines={2} style={styles.itemText}>{item?.[labelField]}</Text>
        </View>
    ), []);

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>
            {fullScreen
                ? <TouchableOpacity onPress={handleOnFocus} style={[styles.button]}>
                    <Text numberOfLines={1} style={styles.text}>{data?.find(item => item?.[valueField] === selected)?.[labelField]}</Text>
                    <ChevronIcon position={'DOWN'} />
                </TouchableOpacity>
                : <Dropdown
                    search={search}
                    data={data || []}
                    value={selected}
                    labelField={labelField}
                    valueField={valueField}
                    placeholder={placeholder}
                    style={[styles.dropdown, dropdownStyle]}
                    itemTextStyle={styles.text}
                    selectedTextStyle={styles.text}
                    placeholderStyle={styles.text}
                    containerStyle={styles.dropdownList}
                    onChange={setSelected}
                    onFocus={handleOnFocus}
                    onBlur={onBlur}
                    renderRightIcon={renderRightIcon}
                    renderInputSearch={renderInputSearch}
                    selectedTextProps={{ numberOfLines: 1 }}
                    renderItem={renderItem}
                />
            }
            <FullScreenModal
                visible={fullScreen && isFocused}
                data={data || []}
                selected={selected}
                setSelected={setSelected}
                labelField={labelField}
                valueField={valueField}
                setIsVisible={setIsFocused}
            />
        </View>
    );
};