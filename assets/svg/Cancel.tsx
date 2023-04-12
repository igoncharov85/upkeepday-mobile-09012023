import * as React from "react"
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Rect, Stop } from "react-native-svg"

function Cancel(props: any) {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <G clip-path="url(#clip0_5_4578)">
        <Path d="M7.50002 14.6329C11.6422 14.6329 15 11.5575 15 7.76381C15 3.97015 11.6422 0.894775 7.50002 0.894775C3.35787 0.894775 0 3.97015 0 7.76381C0 11.5575 3.35787 14.6329 7.50002 14.6329Z" fill="#DAA3C4" />
        <Path d="M15 7.76386C15 11.5418 11.625 14.6329 7.50001 14.6329C5.10939 14.6329 3.00002 13.6455 1.64062 12.057C2.90625 13.0015 4.54688 13.5596 6.32812 13.5596C10.4531 13.5596 13.8281 10.4686 13.8281 6.6906C13.8281 5.05922 13.2188 3.55661 12.1875 2.39746C13.9219 3.64243 15 5.57434 15 7.76386Z" fill="url(#paint0_linear_5_4578)" />
        <Path d="M10.9219 10.8977C10.6406 11.1553 10.1718 11.1553 9.8906 10.8977L7.49999 8.70819L5.10937 10.8977C4.82813 11.1553 4.35936 11.1553 4.07812 10.8977C3.79688 10.6401 3.79688 10.2108 4.07812 9.95319L6.46873 7.76369L4.07812 5.5742C3.79688 5.31662 3.79688 4.88729 4.07812 4.62971C4.35936 4.37213 4.82813 4.37213 5.10937 4.62971L7.49999 6.8192L9.8906 4.62971C10.1718 4.37213 10.6406 4.37213 10.9219 4.62971C11.2031 4.88729 11.2031 5.31662 10.9219 5.5742L8.53124 7.76369L10.9219 9.95319C11.2031 10.2108 11.2031 10.6401 10.9219 10.8977Z" fill="white" />
      </G>
      <Defs>
        <LinearGradient id="paint0_linear_5_4578" x1="1.64062" y1="2.39746" x2="1.64062" y2="14.6329" gradientUnits="userSpaceOnUse">
          <Stop stop-color="#EAAFC8" />
          <Stop offset="1" stop-color="#654EA3" />
        </LinearGradient>
        <ClipPath id="clip0_5_4578">
          <Rect width="15" height="13.738" fill="white" transform="translate(0 0.894775)" />
        </ClipPath>
      </Defs>
    </Svg>

  )
}

export default Cancel