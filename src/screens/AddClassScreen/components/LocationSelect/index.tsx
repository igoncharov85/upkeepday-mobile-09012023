import React, { FC, memo } from 'react';
import { CustomSelect } from '../../../../components/UI/CustomSelect';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SelectArrowIcon from '../../../../../assets/svg/SelectArrowIcon';


interface ILocationSelect {
    value: string;
    onChange: () => void;
    placeholder?: string;
    labelText?: string;
}
export const LocationSelect: FC<ILocationSelect> = memo(
    ({ onChange, placeholder, value, labelText }) => {

        return (

            <View style={styles.container}>
                <Text style={styles.label}>{labelText}</Text>
                <View style={styles.containerInput}>
                    <TouchableOpacity
                        style={styles.valueFieldWrapper}
                        activeOpacity={1}
                        onPress={onChange}
                    >

                        {!value ? (
                            placeholder && (
                                <Text style={styles.placeHolderText}>{placeholder}</Text>
                            )
                        ) : (
                            <Text style={styles.valueText}>{value}</Text>
                        )}
                        <View
                            style={styles.iconWrapper}>
                            <SelectArrowIcon />
                        </View>
                    </TouchableOpacity>


                </View>
            </View>

        );
    },
);
