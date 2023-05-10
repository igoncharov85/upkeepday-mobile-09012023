import React from 'react';
import { Text, View } from 'react-native';
import { CustomInput, ICustomInputProps } from '../../../../components/UI/CustomInput';
import styles from './styles';


interface IInputForm extends ICustomInputProps {
    labelText?: string;
    style?: {};
}

export const InputForm: React.FC<IInputForm> = ({ labelText, style, ...props }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.label}>{labelText && labelText}</Text>
            <CustomInput
                style={style && style}
                //@ts-ignore
                onChangeText={props?.onChange}
                value={props?.value}
                {...props} />
            {props?.validationErrorText ? (
                <Text style={{ color: 'red' }}>{props?.validationErrorText}</Text>
            ) : null}
        </View>
    )
}