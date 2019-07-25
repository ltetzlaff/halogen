import { h } from "preact"
import { ILoaderProps } from "./types"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
const keyframes = {
  "0%, 100%": {
    transform: "scale(0)"
  },
  "50%": {
    transform: "scale(1.0)"
  }
}

BounceLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "60px"
}

const animationName = insertKeyframesRule(keyframes)
export default function BounceLoader(props: ILoaderProps) {
  return (
    props.loading && (
      <div id={props.id} className={props.className}>
        <div style={getStyle(0, props)}>
          <div style={getStyle(1, props)}></div>
          <div style={getStyle(2, props)}></div>
        </div>
      </div>
    )
  )
}

function getBallStyle({ verticalAlign, size, color }: ILoaderProps) {
  return {
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: "100%",
    opacity: 0.6,
    position: "absolute",
    top: 0,
    left: 0,
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [
    animationName,
    "2s",
    i === 1 ? "1s" : "0s",
    "infinite",
    "ease-in-out"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(i: number, props: ILoaderProps) {
  if (i) {
    return assign(getBallStyle(props), getAnimationStyle(i))
  }
  return assign({
    width: props.size,
    height: props.size,
    position: "relative"
  })
}
