import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

interface IButton {
    title: string,
    subtitle: string,
}
interface IListButtons {
    buttons: IButton[],
    onPress?: (agreement: number) => void,
    label?: string,
    twoLines?: boolean,
    noLineDescription?: boolean
     noMarginTop?: boolean
}
export const ListGradientCircleButtons: React.FC<IListButtons> = ({ buttons, onPress, label, twoLines, noLineDescription,noMarginTop}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePress = (index: number) => {
        setActiveIndex(index);
        onPress && onPress(index)
    };

    return (
        <View style={ [{ marginHorizontal: 20 }, noMarginTop ? {} : {
            marginTop: 20
        }]}>
            <Text style={{
                color: '#171930',
                fontSize: 14,
                lineHeight: 34
            }}>{label && label}</Text>
            <View style={{ flexDirection: 'column' }}>
                {buttons.map((item, index) => (
                    <CircleButton key={index} noLineDescription={noLineDescription} index={index} activeIndex={activeIndex} buttonTitle={item} handlePress={handlePress} twoLines={twoLines && twoLines} />
                ))}
            </View>
        </View>
    );
}

export const CircleButton = ({ index, activeIndex, buttonTitle, handlePress, twoLines, noLineDescription }: { index: number, activeIndex: number, buttonTitle: IButton, handlePress: (number: number) => void, twoLines?: boolean, noLineDescription?: boolean }) => {
    const activeItem = activeIndex === index;
    return (
        <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            activeOpacity={1}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 20
            }}
        >
            <LinearGradient
                colors={['#EAAFC8', '#654EA3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    height: 28,
                    width: 28,
                    borderRadius: 100,
                    marginRight: 10,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LinearGradient colors={activeItem ? ['#EAAFC8', '#654EA3'] : ['transparent', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={[{ borderWidth: 6, borderColor: '#F2F2F2', borderRadius: 100, height: 26, width: 26, backgroundColor: '#F2F2F2', }]} />
            </LinearGradient>
            <View style={noLineDescription ? {} : { flexDirection: 'row', alignItems: 'center', paddingRight: 20, }}>
                <Text style={{ color: '#171930', fontWeight: '600', fontSize: 20 }}>
                    {buttonTitle.title}
                </Text>
                <Text numberOfLines={2} style={[{ color: '#171930', fontSize: 14,  opacity: 0.4, flexWrap: 'wrap',
                    },noLineDescription ? {} : {lineHeight: 19, maxWidth: '85%', marginLeft: 10, marginTop: twoLines ? 0 : 20}]}>
                    {buttonTitle.subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}