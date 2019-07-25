import { h } from "preact"

// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"

const keyframes = {
  "50%": {
    transform: "scale(0.75)",
    opacity: 0.2
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
}
const animationName = insertKeyframesRule(keyframes)

BeatLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}

export default function BeatLoader(props: ILoaderProps) {
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
function getBallStyle({ color, size, margin, verticalAlign }: ILoaderProps) {
  return {
    backgroundColor: color,
    width: size,
    height: size,
    margin,
    borderRadius: "100%",
    verticalAlign
  }
}

function getAnimationStyle(i: number) {
  const animation = [
    animationName,
    "0.7s",
    i % 2 ? "0s" : "0.35s",
    "infinite",
    "linear"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation,
    animationFillMode
  }
}

function getStyle(i: number, props: ILoaderProps) {
  return assign(getBallStyle(props), getAnimationStyle(i), {
    display: "inline-block"
  })
}
