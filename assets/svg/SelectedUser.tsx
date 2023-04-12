import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Rect, Stop } from "react-native-svg"
import LinearGradient from 'react-native-linear-gradient';

function SelectedUser(props: any) {
  return (
    <LinearGradient colors={['#EAAFC8', '#654EA3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 29,
        width: 29,
        borderRadius: 4,
      }}>
      <Svg width="22" height="16" viewBox="0 0 22 16" fill="none" >
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M21.1903 0.35483C21.6627 0.768178 21.7055 1.48828 21.2853 1.95463L9.45721 15.0831C9.03484 15.5519 8.30964 15.5817 7.85022 15.1493L1.00569 8.70574C0.578841 8.30389 0.537981 7.63429 0.904202 7.17653C1.3083 6.6714 2.06083 6.60188 2.54175 7.03444L7.85219 11.8111C8.31369 12.2262 9.0242 12.1891 9.43999 11.7282L19.6139 0.447891C20.0256 -0.00858929 20.7277 -0.0499671 21.1903 0.35483V0.35483Z" fill="white" />
      </Svg>
    </LinearGradient>


  )
}

export default SelectedUser