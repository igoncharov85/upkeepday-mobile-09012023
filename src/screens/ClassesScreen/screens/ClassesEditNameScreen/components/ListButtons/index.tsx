import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

interface IListButtons {
    buttons: string[],
    onPress?: (number: number) => void,
    label?: string,
    index?: number
}

export const ListButtons: React.FC<IListButtons> = (({ buttons, onPress, label, index }) => {
    const [activeIndex, setActiveIndex] = useState(index ? index : 0);

    const handlePress = (index: number) => {
        setActiveIndex(index);
        onPress && onPress(index);
    };

    useEffect(() => {
        setActiveIndex(index ? index : 0);
    }, [index]);
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label && label}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {buttons.map((buttonTitle, index) => (
                    <ButtonItem key={index} index={index} activeIndex={activeIndex} buttonTitle={buttonTitle} handlePress={handlePress} />
                ))}
            </View>
        </View>
    );
});
const ButtonItem = ({ index, activeIndex, buttonTitle, handlePress }: { index: number, activeIndex: number, buttonTitle: string, handlePress: (number: number) => void }) => {
    return (
        <TouchableOpacity
            key={index}
            style={[styles.btn, {
                backgroundColor: activeIndex === index ? '#AF9CC9' : 'rgba(109, 123, 152,0.5)',
            }]}
            onPress={() => handlePress(index)}
        >
            <Text style={{ color: activeIndex === index ? 'white' : '#171930' }}>
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    )
}