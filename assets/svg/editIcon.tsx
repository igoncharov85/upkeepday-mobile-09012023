import React, { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
};

export const EditIcon: FC<IProps> = ({ width, height }) => (
    <Svg
        width={width || 24}
        height={height || 24}
        viewBox="0 0 24 24"
        fill="none"
    >
        <G clipPath="url(#clip0_1480_7828)" fill="#FA9253">
            <Path d="M4.031 9.179l13.206 13.205c.067.066.15.114.241.137l5.875 1.464A.522.522 0 0024 23.48a.515.515 0 00-.016-.126L22.52 17.48a.52.52 0 00-.137-.241L9.177 4.033 4.031 9.179zM2.23.761L.76 2.231c-.982.982-.981 2.695 0 3.676l1.801 1.8 5.146-5.145-1.8-1.8A2.582 2.582 0 004.067 0C3.374 0 2.721.27 2.23.761z" />
        </G>
        <Defs>
            <ClipPath id="clip0_1480_7828">
                <Path fill="#fff" transform="rotate(-90 12 12)" d="M0 0H24V24H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);