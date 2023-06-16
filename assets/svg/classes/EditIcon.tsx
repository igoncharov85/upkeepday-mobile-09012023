import * as React from "react"
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import Svg, { ClipPath, Defs, G, LinearGradient as Grad, Path, Rect, Stop } from "react-native-svg"

const EditIcon = () => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LinearGradient
        colors={['#FAD99B', '#FA9253']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 40 }}
        style={{
          flex: 1,
          borderRadius: 4,
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 40 40">
          <Rect width="40" height="40" rx="4" fill="url(#paint0_linear_10_5055)" />
          <G clipPath="url(#clip0_10_5055)">
            <Path
              d="M22.8213 12.0311L9.61616 25.2372C9.54972 25.3038 9.50175 25.3879 9.47891 25.4783L8.01525 31.3532C7.97146 31.53 8.02343 31.7181 8.15249 31.8472C8.25015 31.9448 8.38321 31.9989 8.51931 31.9989C8.561 31.9989 8.60364 31.9937 8.64514 31.9833L14.52 30.5194C14.6115 30.4966 14.6947 30.4488 14.7612 30.3823L27.9674 17.1772L22.8213 12.0311Z"
              fill="white"
            />
            <Path
              d="M31.2389 10.2305L29.769 8.76052C28.7865 7.77808 27.0743 7.77903 26.093 8.76052L24.2924 10.5611L29.4383 15.7071L31.2389 13.9065C31.7296 13.4159 32 12.763 32 12.0686C32 11.3741 31.7296 10.7212 31.2389 10.2305Z"
              fill="white"
            />
          </G>
          <Defs>
            <Grad
              id="paint0_linear_10_5055"
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#FAD99B" />
              <Stop offset="1" stopColor="#FA9253" />
            </Grad>
            <ClipPath id="clip0_10_5055">
              <Rect width="24" height="24" fill="white" transform="translate(8 8)" />
            </ClipPath>
          </Defs>
        </Svg>
      </LinearGradient>
    </View>
  );
};

export default EditIcon