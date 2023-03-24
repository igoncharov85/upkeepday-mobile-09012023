import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Plus(props: any) {
  return (
    <Svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <Path
        d="M56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56C43.464 56 56 43.464 56 28Z"
        fill="#9A80BA"
      />
      <Path
        d="M28.3936 20.3013V35.5812"
        stroke="white"
        stroke-width="3.23864"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.7539 27.941H36.0338"
        stroke="white"
        stroke-width="3.23864"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default Plus;
