import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SelectArrowIcon(props: any) {
  return (
    <Svg
      width={12}
      height={7}
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.371 7.735l.021-.024 5.887-6.042c.159-.184.247-.432.245-.69.001-.26-.089-.509-.25-.691A.806.806 0 0012.668 0a.806.806 0 00-.606.287l-5.28 5.339-.086-.086L1.46.292A.807.807 0 00.853 0a.805.805 0 00-.61.286 1.1 1.1 0 000 1.38l5.927 6.04a.785.785 0 001.201.029z"
        fill="#424353"
      />
    </Svg>
  )
}

export default SelectArrowIcon
