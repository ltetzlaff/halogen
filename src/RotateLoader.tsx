import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "0%": {
    transform: "rotate(0deg)"
  },
  "50%": {
    transform: "rotate(180deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
}

const animationName = insertKeyframesRule(keyframes)

RotateLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}

export default function RotateLoader(props: ILoaderProps) {
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
    "1s",
    "0s",
    "infinite",
    "cubic-bezier(.7,-.13,.22,.86)"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(i: number, props: ILoaderProps) {
  if (i) {
    return assign(getBallStyle(props), {
      opacity: "0.8",
      position: "absolute",
      top: 0,
      left: i % 2 ? -28 : 25
    })
  }
  return assign(getBallStyle(props), getAnimationStyle(i), {
    display: "inline-block",
    position: "relative"
  })
}
