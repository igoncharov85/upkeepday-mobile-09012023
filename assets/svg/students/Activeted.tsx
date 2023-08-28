import * as React from "react"
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg"


const ActivetedIcon = () => {
    return (
        <View>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <Defs>
                    <LinearGradient id="paint0_linear_2891_10678" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                        <Stop stopColor="#F3AF2C" />
                        <Stop offset="1" stopColor="#E9600D" />
                    </LinearGradient>
                </Defs>
                <Rect width="40" height="40" rx="4" fill="url(#paint0_linear_2891_10678)" />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.7452 8.76537C35.3968 9.3355 35.4559 10.3287 34.8763 10.972L18.5617 29.0803C17.9791 29.7269 16.9788 29.768 16.3451 29.1715L6.9044 20.2839C6.31564 19.7296 6.25928 18.806 6.76442 18.1746C7.3218 17.4779 8.35976 17.382 9.02311 17.9786L16.3478 24.5671C16.9844 25.1397 17.9644 25.0885 18.5379 24.4527L32.5709 8.89373C33.1387 8.2641 34.1071 8.20703 34.7452 8.76537Z"
                    fill="white"
                />
            </Svg>
        </View>
    );
};

export default ActivetedIcon