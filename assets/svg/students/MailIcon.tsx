import * as React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

function MailIcon(props: any) {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
            <Path d="M14.5938 2.375H1.40625C0.632438 2.375 0 3.00466 0 3.78125V12.2188C0 12.9956 0.632844 13.625 1.40625 13.625H14.5938C15.3676 13.625 16 12.9953 16 12.2188V3.78125C16 3.00447 15.3673 2.375 14.5938 2.375ZM14.3778 3.3125C13.9232 3.76866 8.58266 9.12656 8.36325 9.34669C8.18 9.5305 7.82009 9.53062 7.63675 9.34669L1.62219 3.3125H14.3778ZM0.9375 12.0464V3.95359L4.97078 8L0.9375 12.0464ZM1.62219 12.6875L5.63263 8.664L6.97278 10.0085C7.52197 10.5595 8.47825 10.5593 9.02725 10.0085L10.3674 8.66403L14.3778 12.6875H1.62219ZM15.0625 12.0464L11.0292 8L15.0625 3.95359V12.0464Z" fill="url(#paint0_linear_10_13677)" />
            <Defs>
                <LinearGradient id="paint0_linear_10_13677" x1="6.15275" y1="-2.41964" x2="-4.41149" y2="13.9594" gradientUnits="userSpaceOnUse">
                    <Stop stop-color="#A5AFC4" />
                    <Stop offset="1" stop-color="#6D7B98" />
                </LinearGradient>
            </Defs>
        </Svg>

    )
}

export default MailIcon