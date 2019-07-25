import { h } from "preact"
import { ILoaderProps } from "./types"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
const keyframes = {
  "0%": {
    transform: "scale(1)"
  },
  "50%": {
    transform: "scale(0.5)",
    opacity: 0.7
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
}

const animationName = insertKeyframesRule(keyframes)

function random(top: number) {
  return Math.random() * top
}

GridLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "15px",
  margin: "2px"
}

export default function GridLoader(props: ILoaderProps) {
  const style = {
    width: parseFloat(props.size) * 3 + parseFloat(props.margin) * 6,
    fontSize: 0
  }
  return (
    props.loading && (
      <div id={props.id} className={props.className}>
        <div style={style}>
          <div style={getStyle(1, props)}></div>
          <div style={getStyle(2, props)}></div>
          <div style={getStyle(3, props)}></div>
          <div style={getStyle(4, props)}></div>
          <div style={getStyle(5, props)}></div>
          <div style={getStyle(6, props)}></div>
          <div style={getStyle(7, props)}></div>
          <div style={getStyle(8, props)}></div>
          <div style={getStyle(9, props)}></div>
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
  const animationDuration = `${random(100) / 100 + 0.6}s`
  const animationDelay = `${random(100) / 100 - 0.2}s`
  const animation = [
    animationName,
    animationDuration,
    animationDelay,
    "infinite",
    "ease"
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
