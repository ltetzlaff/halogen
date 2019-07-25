import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { IExtendedLoaderProps } from "./types"
const keyframes = {
  "0%": {
    transform: "scaley(1.0)"
  },
  "50%": {
    transform: "scaley(0.4)"
  },
  "100%": {
    transform: "scaley(1.0)"
  }
}

const animationName = insertKeyframesRule(keyframes)

ScaleLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  height: "35px",
  width: "4px",
  margin: "2px",
  radius: "2px"
}

export default function ScaleLoader(props: IExtendedLoaderProps) {
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

function getLineStyle({
  color,
  height,
  width,
  margin,
  radius,
  verticalAlign
}: IExtendedLoaderProps) {
  return {
    backgroundColor: color,
    height: height,
    width: width,
    margin: margin,
    borderRadius: radius,
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [
    animationName,
    "1s",
    i * 0.1 + "s",
    "infinite",
    "cubic-bezier(.2,.68,.18,1.08)"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation,
    animationFillMode
  }
}
function getStyle(i: number, props: IExtendedLoaderProps) {
  return assign(getLineStyle(props), getAnimationStyle(i), {
    display: "inline-block"
  })
}
