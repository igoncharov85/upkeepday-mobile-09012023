import { FC, useMemo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { getStyles } from "./styles";
import { RadioButtonIcon } from "../../../../assets/svg/radioButtonIcon";

interface IProps {
    isCurrent: boolean;
    title: string;
    onPress: () => void;
};

export const RadioButton: FC<IProps> = ({ isCurrent, title, onPress }) => {
    const styles = useMemo(() => getStyles(), []);

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.checkBox}>
                {isCurrent && <RadioButtonIcon />}
            </View>
        </TouchableOpacity>
    );
};