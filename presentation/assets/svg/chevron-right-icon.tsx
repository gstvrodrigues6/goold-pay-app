import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronRightIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <Path
      d="M7.5 15.5L12.5 10.5L7.5 5.5"
      stroke="black"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
