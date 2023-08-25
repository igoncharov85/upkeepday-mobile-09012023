import React, { FC } from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
};

export const RadioButtonIcon: FC<IProps> = ({ width, height }) => (
    <Svg
        width={width || 20}
        height={height || 20}
        viewBox="0 0 20 20"
        fill="none"
    >
        <Circle cx={10} cy={10} r={10} fill="url(#paint0_linear_106_14590)" />
        <Defs>
            <LinearGradient
                id="paint0_linear_106_14590"
                x1={10}
                y1={0}
                x2={10}
                y2={20}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6B53A5" />
                <Stop offset={1} stopColor="#DCA5C5" />
            </LinearGradient>
        </Defs>
    </Svg>
);