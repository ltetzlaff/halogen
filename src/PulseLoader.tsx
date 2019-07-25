import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "0%": {
    transform: "scale(1)",
    opacity: 1
  },
  "45%": {
    transform: "scale(0.1)",
    opacity: 0.7
  },
  "80%": {
    transform: "scale(1)",
    opacity: 1
  }
}

const animationName = insertKeyframesRule(keyframes)

PulseLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}
export default function PulseLoader(props: ILoaderProps) {
  return (
    props.loading && (
      <div id={props.id} className={props.className}>
        <div style={getStyle(1, props)}></div>
        <div style={getStyle(2, props)}></div>
        <div style={getStyle(3, props)}></div>
      </div>
    )
  )
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
    "0.75s",
    i * 0.12 + "s",
    "infinite",
    "cubic-bezier(.2,.68,.18,1.08)"
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
