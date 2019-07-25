import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"

const riseAmount = 30
const keyframesEven = {
  "0%": {
    transform: "scale(1.1)"
  },
  25: {
    transform: `translateY(-${riseAmount}px)`
  },
  "50%": {
    transform: "scale(0.4)"
  },
  "75%": {
    transform: `translateY(${riseAmount}px)`
  },
  "100%": {
    transform: "translateY(0) scale(1.0)"
  }
}
const keyframesOdd = {
  "0%": {
    transform: "scale(0.4)"
  },
  25: {
    transform: `translateY(${riseAmount}px)`
  },
  "50%": {
    transform: "scale(1.1)"
  },
  "75%": {
    transform: `translateY(-${riseAmount}px)`
  },
  "100%": {
    transform: "translateY(0) scale(0.75)"
  }
}

const animationNameEven = insertKeyframesRule(keyframesEven)

const animationNameOdd = insertKeyframesRule(keyframesOdd)

RiseLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}
export default function RiseLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(1, props)}></div>
      <div style={getStyle(2, props)}></div>
      <div style={getStyle(3, props)}></div>
      <div style={getStyle(4, props)}></div>
      <div style={getStyle(5, props)}></div>
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
    i % 2 === 0 ? animationNameEven : animationNameOdd,
    "1s",
    "0s",
    "infinite",
    "cubic-bezier(.15,.46,.9,.6)"
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
