import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function MinPlus(props: any) {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none" >
      <Circle cx="19" cy="19" r="19" fill="#B19DCA" />
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M26.3648 18.2376H20.2631V12.1357C20.2631 11.7148 19.9213 11.373 19.5003 11.373C19.0793 11.373 18.7376 11.7148 18.7376 12.1357V18.2376H12.6357C12.2148 18.2376 11.873 18.5793 11.873 19.0003C11.873 19.4213 12.2148 19.7631 12.6357 19.7631H18.7376V25.8648C18.7376 26.2859 19.0793 26.6276 19.5003 26.6276C19.9213 26.6276 20.2631 26.2859 20.2631 25.8648V19.7631H26.3648C26.7859 19.7631 27.1276 19.4213 27.1276 19.0003C27.1276 18.5793 26.7859 18.2376 26.3648 18.2376Z" fill="white" />
    </Svg>

  );
}

export default MinPlus;
