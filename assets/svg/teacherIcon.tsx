import React, { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
};

export const TeacherIcon: FC<IProps> = ({ width, height, color }) => (
    <Svg
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        fill="none"
    >
        <G clipPath="url(#clip0_168_4899)" fill={color || "#171930"}>
            <Path d="M23.164 13.222v-7.11a3.004 3.004 0 00-3-3H12.31a3 3 0 00-3 3v1.582H3.124A2.292 2.292 0 00.836 9.982v3.764a7.703 7.703 0 00.698 3.225 6.44 6.44 0 01.555 2.273l.135 2.565a1.521 1.521 0 001.515 1.44h1.125a1.523 1.523 0 001.522-1.44l.135-2.565a6.44 6.44 0 01.555-2.273c.463-1.011.7-2.112.698-3.225V9.322a.659.659 0 00-.015-.128h3.855a.75.75 0 010 1.5H9.31v2.527a3.004 3.004 0 003 3h.62l-1.282 2.867a.75.75 0 101.37.612l1.556-3.479H17.9l1.556 3.48a.75.75 0 101.37-.613l-1.283-2.867h.62a3.009 3.009 0 003-3zm-5.76.27h-3.458a.75.75 0 110-1.5h3.458a.75.75 0 010 1.5zm1.125-3.076h-4.583a.75.75 0 110-1.5h4.583a.75.75 0 010 1.5zm0-3.074h-4.583a.75.75 0 110-1.5h4.583a.75.75 0 010 1.5z" />
            <Path d="M4.301 6.764a3.007 3.007 0 100-6.015 3.007 3.007 0 000 6.015z" />
        </G>
        <Defs>
            <ClipPath id="clip0_168_4899">
                <Path fill="#fff" transform="translate(0 -.001)" d="M0 0H24V24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);