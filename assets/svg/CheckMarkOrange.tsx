import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function CheckMarkOrange(props: any) {
  return (
    <Svg
      width={13}
      height={9}
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10.914.306L5.01 6.21 2.304 3.504A1.044 1.044 0 00.828 4.98l3.444 3.444a1.044 1.044 0 001.476 0l6.643-6.642A1.044 1.044 0 1010.913.306z"
        fill="url(#paint0_linear_138_103)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_138_103"
          x1={0.521973}
          y1={0}
          x2={0.521973}
          y2={8.73}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FFC92C" />
          <Stop offset={1} stopColor="#FD9371" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default CheckMarkOrange;
