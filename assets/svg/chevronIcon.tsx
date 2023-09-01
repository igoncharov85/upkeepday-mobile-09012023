import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
    position?: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
}

const TRANSFORM_DEGREE = {
    UP: '0deg',
    RIGHT: '90deg',
    DOWN: '180deg',
    LEFT: '270deg',
}

export const ChevronIcon: FC<IProps> = ({ width, height, color, position = 'UP' }) => (
    <View style={{ transform: [{ rotate: TRANSFORM_DEGREE[position] }] }}>
        <Svg
            width={width || 16}
            height={height || 16}
            viewBox="0 0 16 16"
            fill="none"
        >
            <Path
                d="M3.333 10L8 5.333 12.667 10"
                stroke={color || "#64748B"}
                strokeWidth={1.7094}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);