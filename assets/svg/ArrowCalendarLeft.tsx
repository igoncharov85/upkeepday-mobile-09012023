import * as React from 'react';
import Svg, {Path, Rect, G, Defs} from 'react-native-svg';

function ArrowCalendarLeft(props: any) {
  return (
    <Svg width="35" height="35" viewBox="0 0 35 35" fill="none">
      <G clip-path="url(#clip0_5_4129)">
        <Rect
          opacity="0.297834"
          x="0.5"
          y="0.5"
          width="34"
          height="34"
          rx="17"
          stroke="#171930"
        />
        <Path
          d="M13.2252 18.1462L13.2452 18.1662L18.3762 23.8752C18.5322 24.0292 18.743 24.1149 18.9622 24.1132C19.1826 24.1141 19.394 24.0266 19.5492 23.8702C19.7052 23.7145 19.7929 23.5031 19.7929 23.2827C19.7929 23.0623 19.7052 22.8509 19.5492 22.6952L15.0152 17.5742L15.0882 17.4912L19.5452 12.4132C19.7031 12.258 19.7925 12.0461 19.7934 11.8247C19.7944 11.6033 19.7068 11.3907 19.5502 11.2342C19.223 10.9193 18.7054 10.9193 18.3782 11.2342L13.2502 16.9812C12.9265 17.2981 12.9154 17.8157 13.2252 18.1462Z"
          fill="#171930"
        />
      </G>
      <Defs>
        <clipPath id="clip0_5_4129">
          <Rect width="35" height="35" fill="white" />
        </clipPath>
      </Defs>
    </Svg>
  );
}

export default ArrowCalendarLeft;
