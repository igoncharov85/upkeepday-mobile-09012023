import * as React from "react"
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import Svg, { ClipPath, Defs, G, LinearGradient as Grad, Path, Rect, Stop } from "react-native-svg"

const MailIcon = () => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LinearGradient
        colors={['#6BAEFA', '#144ACE']}
        start={{ x: 14.3762, y: 64.4383 }}
        end={{ x: 55.4859, y: 23.4845 }}
        style={{
          flex: 1,
          borderRadius: 4,
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 40 40">
          <Rect width="40" height="40" rx="4" fill="url(#paint0_linear_10_5070)" />
          <G clipPath="url(#clip0_10_5070)">
            <Path
              d="M23.847 21.0792L21.6694 23.2641C20.7864 24.1502 19.2327 24.1693 18.3306 23.2641L16.1529 21.0792L8.33179 28.9257C8.62292 29.0603 8.9439 29.1406 9.28515 29.1406H30.7148C31.0561 29.1406 31.377 29.0604 31.668 28.9257L23.847 21.0792Z"
              fill="white"
            />
            <Path
              d="M30.7149 10.8594H9.28517C8.94392 10.8594 8.62294 10.9397 8.33191 11.0743L16.6893 19.4595C16.6899 19.46 16.6906 19.4601 16.6911 19.4607C16.6917 19.4613 16.6918 19.462 16.6918 19.462L19.4092 22.1885C19.6979 22.4771 20.3023 22.4771 20.5909 22.1885L23.3078 19.4625C23.3078 19.4625 23.3085 19.4613 23.309 19.4607C23.309 19.4607 23.3102 19.46 23.3108 19.4595L31.668 11.0743C31.377 10.9396 31.0561 10.8594 30.7149 10.8594Z"
              fill="white"
            />
            <Path
              d="M7.24304 12.1396C7.09242 12.4442 7 12.7823 7 13.1445V26.8554C7 27.2176 7.09232 27.5557 7.24299 27.8603L15.0777 20.0002L7.24304 12.1396Z"
              fill="white"
            />
            <Path
              d="M32.7569 12.1396L24.9224 20.0003L32.7569 27.8604C32.9076 27.5559 33 27.2178 33 26.8555V13.1445C33 12.7823 32.9076 12.4442 32.7569 12.1396Z"
              fill="white"
            />
          </G>
          <Defs>
            <Grad
              id="paint0_linear_10_5070"
              x1="14.3762"
              y1="64.4383"
              x2="55.4859"
              y2="23.4845"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#6BAEFA" />
              <Stop offset="1" stopColor="#144ACE" />
            </Grad>
            <ClipPath id="clip0_10_5070">
              <Rect width="26" height="26" fill="white" transform="translate(7 7)" />
            </ClipPath>
          </Defs>
        </Svg>
      </LinearGradient>
    </View>
  );
};

export default MailIcon