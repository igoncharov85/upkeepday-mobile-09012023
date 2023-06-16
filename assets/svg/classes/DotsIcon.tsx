import * as React from "react"
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import Svg, { ClipPath, Defs, G, LinearGradient as Grad, Path, Rect, Stop } from "react-native-svg"


const DotsIcon = () => {
  return (
    <View>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <Defs>
          <Grad
            id="paint0_linear_10_5085"
            x1="27.0764"
            y1="8.59049"
            x2="18.8607"
            y2="17.5468"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#A5AFC4" />
            <Stop offset="1" stopColor="#6D7B98" />
          </Grad>
          <Grad
            id="paint1_linear_10_5085"
            x1="15.0764"
            y1="8.59049"
            x2="6.86066"
            y2="17.5468"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#A5AFC4" />
            <Stop offset="1" stopColor="#6D7B98" />
          </Grad>
          <Grad
            id="paint2_linear_10_5085"
            x1="3.07637"
            y1="8.59049"
            x2="-5.13934"
            y2="17.5468"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#A5AFC4" />
            <Stop offset="1" stopColor="#6D7B98" />
          </Grad>
        </Defs>
        <Path
          d="M30.8284 13.1716C32.3905 14.7337 32.3905 17.2663 30.8284 18.8284C29.2663 20.3905 26.7337 20.3905 25.1716 18.8284C23.6095 17.2663 23.6095 14.7337 25.1716 13.1716C26.7337 11.6095 29.2663 11.6095 30.8284 13.1716Z"
          fill="url(#paint0_linear_10_5085)"
        />
        <Path
          d="M18.8284 13.1716C20.3905 14.7337 20.3905 17.2663 18.8284 18.8284C17.2663 20.3905 14.7337 20.3905 13.1716 18.8284C11.6095 17.2663 11.6095 14.7337 13.1716 13.1716C14.7337 11.6095 17.2663 11.6095 18.8284 13.1716Z"
          fill="url(#paint1_linear_10_5085)"
        />
        <Path
          d="M6.82842 13.1716C8.39051 14.7337 8.39051 17.2663 6.82842 18.8284C5.26632 20.3905 2.73366 20.3905 1.17157 18.8284C-0.390523 17.2663 -0.390523 14.7337 1.17157 13.1716C2.73366 11.6095 5.26632 11.6095 6.82842 13.1716Z"
          fill="url(#paint2_linear_10_5085)"
        />
      </Svg>
    </View>
  );
};
export default DotsIcon