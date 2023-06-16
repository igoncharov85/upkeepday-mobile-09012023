import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function More(props: any) {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M24.0847 10.2903C25.3051 11.5107 25.3051 13.4893 24.0847 14.7097C22.8643 15.9301 20.8857 15.9301 19.6653 14.7097C18.4449 13.4893 18.4449 11.5107 19.6653 10.2903C20.8857 9.0699 22.8643 9.0699 24.0847 10.2903Z"

        fill={props.color}
      />
      <Path
        d="M14.7097 10.2903C15.9301 11.5107 15.9301 13.4893 14.7097 14.7097C13.4893 15.9301 11.5107 15.9301 10.2903 14.7097C9.0699 13.4893 9.0699 11.5107 10.2903 10.2903C11.5107 9.0699 13.4893 9.0699 14.7097 10.2903Z"

        fill={props.color}
      />
      <Path
        d="M5.3347 10.2903C6.55508 11.5107 6.55508 13.4893 5.3347 14.7097C4.11432 15.9301 2.13567 15.9301 0.915288 14.7097C-0.305096 13.4893 -0.305096 11.5107 0.915288 10.2903C2.13567 9.0699 4.11432 9.0699 5.3347 10.2903Z"

        fill={props.color}
      />
    </Svg>
  );
}

export default More;
