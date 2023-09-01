import React, { FC } from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
};

export const DiamondIcon: FC<IProps> = ({ width, height }) => (
    <Svg
        width={width || 24}
        height={height || 22}
        viewBox="0 0 24 22"
        fill="none"
    >
        <Path
            d="M6.726 8.148L9.95 19.355 0 8.148h6.726z"
            fill="url(#paint0_linear_106_14348)"
        />
        <Path
            d="M6.85 6.743H0L6.338.857a.702.702 0 01.496-.204h3.53l-3.515 6.09z"
            fill="url(#paint1_linear_106_14348)"
        />
        <Path
            d="M8.472 6.743l3.513-6.09 3.514 6.09H8.472z"
            fill="url(#paint2_linear_106_14348)"
        />
        <Path
            d="M15.783 8.148l-3.798 13.199L8.188 8.148h7.595z"
            fill="url(#paint3_linear_106_14348)"
        />
        <Path
            d="M17.121 6.743L13.607.653h3.999c.195 0 .38.081.514.224L24 6.743h-6.879z"
            fill="url(#paint4_linear_106_14348)"
        />
        <Path
            d="M23.97 8.148l-9.95 11.207 3.224-11.207h6.727z"
            fill="url(#paint5_linear_106_14348)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_106_14348"
                x1={0}
                y1={8.14816}
                x2={0}
                y2={19.355}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
            <LinearGradient
                id="paint1_linear_106_14348"
                x1={0}
                y1={0.653244}
                x2={0}
                y2={6.74284}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
            <LinearGradient
                id="paint2_linear_106_14348"
                x1={8.47183}
                y1={0.653702}
                x2={8.47183}
                y2={6.74288}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
            <LinearGradient
                id="paint3_linear_106_14348"
                x1={8.18802}
                y1={8.14816}
                x2={8.18802}
                y2={21.3467}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
            <LinearGradient
                id="paint4_linear_106_14348"
                x1={13.6073}
                y1={0.653229}
                x2={13.6073}
                y2={6.74287}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
            <LinearGradient
                id="paint5_linear_106_14348"
                x1={14.0204}
                y1={8.14816}
                x2={14.0204}
                y2={19.355}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#654EA3" />
                <Stop offset={1} stopColor="#EAAFC8" />
            </LinearGradient>
        </Defs>
    </Svg>
);