import { FC } from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

interface IProps {
    width?: number;
    height?: number;
}

const MailIcon: FC<IProps> = ({ width, height }) => {
    return (
        <Svg
            width={width || 16}
            height={height || 16}
            viewBox="0 0 16 16"
            fill="none"
        >
            <Path
                d="M14.594 2.375H1.406C.632 2.375 0 3.005 0 3.781v8.438c0 .777.633 1.406 1.406 1.406h13.188c.774 0 1.406-.63 1.406-1.406V3.78c0-.777-.633-1.406-1.406-1.406zm-.216.938L8.363 9.346a.547.547 0 01-.726 0L1.622 3.313h12.756zM.938 12.046V3.954L4.97 8 .937 12.046zm.684.642l4.01-4.024 1.34 1.345c.55.55 1.506.55 2.055 0l1.34-1.345 4.01 4.024H1.623zm13.44-.642L11.03 8l4.034-4.046v8.092z"
                fill="url(#paint0_linear_168_4797)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_168_4797"
                    x1={6.15275}
                    y1={-2.41964}
                    x2={-4.41149}
                    y2={13.9594}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#A5AFC4" />
                    <Stop offset={1} stopColor="#6D7B98" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default MailIcon