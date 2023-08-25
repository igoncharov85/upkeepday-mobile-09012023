import { FC, useMemo } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { getStyles } from "./styles";

interface IProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
};

export const LinedButton: FC<IProps> = ({ title, onPress, ...props }) => {
    const styles = useMemo(() => getStyles(props.disabled), [props.disabled]);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};