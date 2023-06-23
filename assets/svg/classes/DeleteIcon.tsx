
import * as React from "react"
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import Svg, { Defs, G, Path, Rect, Stop, LinearGradient as Grad, ClipPath } from "react-native-svg"

const DeleteIcon = (props: any) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LinearGradient
        colors={['#FA6B6B', '#AA290D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 4,
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 40 40">
          <Rect width="40" height="40" rx="4" fill="url(#paint0_linear_2118_10370)" />
          <G clipPath="url(#clip0_2118_10370)">
            <Path
              d="M9.42103 31.7243C9.19455 31.7243 8.97315 31.6572 8.78482 31.5314C8.5965 31.4056 8.44972 31.2268 8.36304 31.0175C8.27637 30.8083 8.2537 30.5781 8.29789 30.3559C8.34209 30.1338 8.45116 29.9298 8.61133 29.7697L29.7697 8.61127C29.9845 8.39652 30.2757 8.27588 30.5794 8.27588C30.8831 8.27588 31.1744 8.39652 31.3891 8.61127C31.6039 8.82601 31.7245 9.42097 31.7245 9.72466C31.7245 9.72466 31.6039 10.0159 31.3891 10.2307L10.2307 31.3891C10.1245 31.4955 9.99828 31.5799 9.85932 31.6375C9.72037 31.695 9.57142 31.7245 9.42103 31.7243Z"
              fill="white"
            />
            <Path
              d="M30.5794 31.7243C30.429 31.7245 30.28 31.695 30.1411 31.6375C30.0021 31.5799 29.8759 31.4955 29.7697 31.3891L8.61127 10.2307C8.39652 10.0159 8.27588 9.72466 8.27588 9.42097C8.27588 9.11727 8.39652 8.82601 8.61127 8.61127C8.82601 8.39652 9.11727 8.27588 9.42097 8.27588C9.72466 8.27588 10.0159 8.39652 10.2307 8.61127L31.3891 29.7697C31.5492 29.9298 31.6583 30.1338 31.7025 30.3559C31.7467 30.5781 31.724 30.8083 31.6374 31.0175C31.5507 31.2268 31.4039 31.4056 31.2156 31.5314C31.0273 31.6572 30.8058 31.7243 30.5794 31.7243Z"
              fill="white"
            />
          </G>
          <Defs>
            <Grad
              id="paint0_linear_2118_10370"
              x1={14.3762}
              y1={64.4383}
              x2={55.4859}
              y2={23.4845}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#FA6B6B" />
              <Stop offset="1" stopColor="#AA290D" />
            </Grad>
            <ClipPath id="clip0_2118_10370">
              <Rect width="23.4483" height="23.4483" fill="white" transform="translate(8.27588 8.27588)" />
            </ClipPath>
          </Defs>
        </Svg>
      </LinearGradient>
    </View>
  );
};

export default DeleteIcon;
