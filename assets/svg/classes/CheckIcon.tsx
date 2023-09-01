import * as React from "react"
import { View } from "react-native";
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from "react-native-svg"

const CheckIcon = ({ active, size }: { active?: any, size?: number }) => {
  const IconComponent = active ? CheckIconTrue : CheckIconFalse;

  return (
    <View >
      <IconComponent size={size} />
    </View>
  );
};
const CheckIconTrue = () => {
  return (
    <View>
      <Svg width={29} height={29} viewBox="0 0 29 29" fill="none">
        <Rect width={29} height={29} rx={4} fill="url(#paint0_linear_10_13557)" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.1903 6.35507C25.6627 6.76842 25.7055 7.48852 25.2853 7.95487L13.4572 21.0834C13.0348 21.5522 12.3096 21.582 11.8502 21.1495L5.00569 14.706C4.57884 14.3041 4.53798 13.6345 4.9042 13.1768C5.3083 12.6716 6.06083 12.6021 6.54175 13.0347L11.8522 17.8113C12.3137 18.2264 13.0242 18.1893 13.44 17.7284L23.6139 6.44813C24.0256 5.99165 24.7277 5.95028 25.1903 6.35507Z"
          fill="white"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_10_13557"
            x1={10.4227}
            y1={46.7178}
            x2={40.2273}
            y2={17.0263}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#2ECB9C" />
            <Stop offset={1} stopColor="#169861" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

const CheckIconFalse = ({ size = 29 }: { size?: number }) => {
  return (
    <View>
      <Svg width={size} height={size} viewBox={`0 0 29 29`} fill="none">
        <Rect width={29} height={29} rx={4} fill="url(#paint0_linear_10_13585)" />
        <G clipPath="url(#clip0_10_13585)">
          <Path
            d="M6.83023 23.0001C6.66604 23.0001 6.50552 22.9515 6.36899 22.8603C6.23245 22.7691 6.12603 22.6394 6.06319 22.4877C6.00036 22.336 5.98392 22.1691 6.01596 22.008C6.048 21.847 6.12708 21.6991 6.2432 21.583L21.583 6.24316C21.7387 6.08747 21.9499 6 22.1701 6C22.3903 6 22.6014 6.08747 22.7571 6.24316C22.9128 6.39885 23.0003 6.61001 23.0003 6.83019C23.0003 7.05037 22.9128 7.26153 22.7571 7.41722L7.41726 22.7571C7.34025 22.8342 7.24874 22.8954 7.148 22.9372C7.04726 22.9789 6.93927 23.0003 6.83023 23.0001Z"
            fill="white"
          />
          <Path
            d="M22.17 23.0001C22.061 23.0003 21.953 22.9789 21.8523 22.9372C21.7515 22.8954 21.66 22.8342 21.583 22.7571L6.24316 7.41722C6.08747 7.26153 6 7.05037 6 6.83019C6 6.61001 6.08747 6.39885 6.24316 6.24316C6.39885 6.08747 6.61001 6 6.83019 6C7.05037 6 7.26153 6.08747 7.41722 6.24316L22.7571 21.583C22.8732 21.6991 22.9523 21.847 22.9843 22.008C23.0163 22.1691 22.9999 22.336 22.9371 22.4877C22.8742 22.6394 22.7678 22.7691 22.6313 22.8603C22.4947 22.9515 22.3342 23.0001 22.17 23.0001Z"
            fill="white"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10_13585"
            x1={10.4227}
            y1={46.7178}
            x2={40.2273}
            y2={17.0263}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#FA6B6B" />
            <Stop offset={1} stopColor="#AA290D" />
          </LinearGradient>
          <ClipPath id="clip0_10_13585">
            <Rect width={17} height={17} fill="white" transform="translate(6 6)" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default CheckIcon