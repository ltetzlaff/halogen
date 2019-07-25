import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "25%": {
    transform: "rotateX(180deg) rotateY(0)"
  },
  "50%": {
    transform: "rotateX(180deg) rotateY(180deg)"
  },
  "75%": {
    transform: "rotateX(0) rotateY(180deg)"
  },
  "100%": {
    transform: "rotateX(0) rotateY(0)"
  }
}

const animationName = insertKeyframesRule(keyframes)

SquareLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "50px"
}
export default function SquareLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(props)}></div>
    </div>
  ) : null
}

function getSquareStyle({ color, size, verticalAlign }: ILoaderProps) {
  return {
    backgroundColor: color,
    width: size,
    height: size,
    verticalAlign
  }
}
function getAnimationStyle() {
  const animation = [
    animationName,
    "3s",
    "0s",
    "infinite",
    "cubic-bezier(.09,.57,.49,.9)"
  ].join(" ")
  const animationFillMode = "both"
  const perspective = "100px"
  return {
    perspective: perspective,
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(props: ILoaderProps) {
  return assign(getSquareStyle(props), getAnimationStyle(), {
    display: "inline-block"
  })
}
