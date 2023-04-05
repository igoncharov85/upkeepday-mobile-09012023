import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";


interface IListButtons {
    buttons: string[],
    onPress?: (number: number) => void,
    label?: string
}
export const ListGradientCircleButtons: React.FC<IListButtons> = ({ buttons, onPress, label }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index: number) => {
        setActiveIndex(index);
        console.log(activeIndex, index)
    };

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{
                color: 'rgba(109, 123, 152,0.5)',
                fontSize: 14,
                lineHeight: 19
            }}>{label}</Text>
            <View style={{ flexDirection: 'column' }}>
                {buttons.map((buttonTitle, index) => (
                    <CircleButton key={index} index={index} activeIndex={activeIndex} buttonTitle={buttonTitle} handlePress={handlePress} />
                ))}
            </View>
        </View>
    );
}

const CircleButton = ({ index, activeIndex, buttonTitle, handlePress }: { index: number, activeIndex: number, buttonTitle: string, handlePress: (number: number) => void }) => {
    const activeItem = activeIndex === index;
    console.log(activeItem)
    return (
        <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            activeOpacity={1}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        >
            <LinearGradient
                colors={['#EAAFC8', '#654EA3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: 28, width: 28, borderRadius: 100, marginRight: 10, position: 'relative', justifyContent: 'center', alignItems: 'center' }}
            >
                <LinearGradient colors={activeItem ? ['#EAAFC8', '#654EA3'] : ['transparent', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={[{ borderWidth: 6, borderColor: '#F2F2F2', borderRadius: 100, height: 26, width: 26, backgroundColor: '#F2F2F2' }]} />
            </LinearGradient>
            <Text style={{ color: '#171930' }}>
                {buttonTitle}
            </Text>
        </TouchableOpacity>
    )
}