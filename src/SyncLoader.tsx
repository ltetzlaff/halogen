import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "33%": {
    transform: "translateY(10px)"
  },
  "66%": {
    transform: "translateY(-10px)"
  },
  "100%": {
    transform: "translateY(0)"
  }
}

SyncLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}

const animationName = insertKeyframesRule(keyframes)
export default function SyncLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(1, props)}></div>
      <div style={getStyle(2, props)}></div>
      <div style={getStyle(3, props)}></div>
    </div>
  ) : null
}
function getBallStyle({ color, size, verticalAlign, margin }: ILoaderProps) {
  return {
    backgroundColor: color,
    width: size,
    height: size,
    margin: margin,
    borderRadius: "100%",
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [
    animationName,
    "0.6s",
    i * 0.07 + "s",
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
  return assign(getBallStyle(props), getAnimationStyle(i), {
    display: "inline-block"
  })
}
