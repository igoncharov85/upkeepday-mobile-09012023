import * as React from "react"
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import Svg, { Defs, G, Path, Rect, Stop, LinearGradient as Grad } from "react-native-svg"

const DocumentIcon = (props: any) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LinearGradient
        colors={['#A5AFC4', '#6D7B98']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 4,
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 40 40">
          <Rect width="40" height="40" rx="4" fill="url(#paint0_linear_10_5089)" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1667 8.33331C11.5893 8.33331 9.5 10.4226 9.5 13V27C9.5 29.5773 11.5893 31.6666 14.1667 31.6666H25.8333C28.4106 31.6666 30.5 29.5773 30.5 27V13C30.5 10.4226 28.4106 8.33331 25.8333 8.33331H14.1667ZM15.3333 24.9583C14.8501 24.9583 14.4583 25.3501 14.4583 25.8333C14.4583 26.3165 14.8501 26.7083 15.3333 26.7083H20C20.4832 26.7083 20.875 26.3165 20.875 25.8333C20.875 25.3501 20.4832 24.9583 20 24.9583H15.3333ZM14.4583 20C14.4583 19.5167 14.8501 19.125 15.3333 19.125H24.6667C25.1499 19.125 25.5417 19.5167 25.5417 20C25.5417 20.4832 25.1499 20.875 24.6667 20.875H15.3333C14.8501 20.875 14.4583 20.4832 14.4583 20ZM15.3333 13.2916C14.8501 13.2916 14.4583 13.6834 14.4583 14.1666C14.4583 14.6499 14.8501 15.0416 15.3333 15.0416H24.6667C25.1499 15.0416 25.5417 14.6499 25.5417 14.1666C25.5417 13.6834 25.1499 13.2916 24.6667 13.2916H15.3333Z"
            fill="white"
          />
          <Defs>
            <Grad
              id="paint0_linear_10_5089"
              x1={15.3819}
              y1={-17.0476}
              x2={-25.6967}
              y2={27.734}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#A5AFC4" />
              <Stop offset="1" stopColor="#6D7B98" />
            </Grad>
          </Defs>
        </Svg>
      </LinearGradient>
    </View>
  );
};

export default DocumentIcon