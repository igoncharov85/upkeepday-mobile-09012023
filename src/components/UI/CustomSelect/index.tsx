import React, {FC, memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SelectArrowIcon from '../../../../assets/svg/SelectArrowIcon';
import {StyleEnum} from '../../../common/constants/styles/styles.enum';
import styles from './styles';

export interface IOption {
  value: string;
  key: string;
}
interface ICustomSelect {
  value: string;
  options: Array<IOption>;
  onChange: (key: string) => void;
  placeholder: string;
  label?: string;
}
export const CustomSelect: FC<ICustomSelect> = memo(
  ({onChange, options, placeholder, value, label}) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const onChangeHandle = (key: string) => {
      setIsOpen(!isOpen);
      onChange && onChange(key);
    };
    const renderSelectItem = (item: IOption) => {
      return (
        <TouchableOpacity
          key={item.key}
          style={styles.valueWrapper}
          activeOpacity={StyleEnum.TOUCHABLE_OPACITY}
          onPress={() => onChangeHandle(item.key)}>
          <Text style={styles.itemText}>{item.value}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <>
        <Text style={styles.labelText}>{label}</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.valueFieldWrapper}
            activeOpacity={StyleEnum.TOUCHABLE_OPACITY}
            onPress={() => setIsOpen(!isOpen)}>
            {!value ? (
              placeholder && (
                <Text style={styles.placeHolderText}>{placeholder}</Text>
              )
            ) : (
              <Text style={styles.valueText}>{value}</Text>
            )}
            <View
              style={{
                ...styles.iconWrapper,
                transform: isOpen ? [{rotate: '180deg'}] : [],
              }}>
              <SelectArrowIcon />
            </View>
          </TouchableOpacity>
          {isOpen && (
            <ScrollView style={styles.selectItemsWrapper}>
              {options.map(item => renderSelectItem(item))}
            </ScrollView>
          )}
        </View>
      </>
    );
  },
);
