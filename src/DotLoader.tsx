import { h } from "preact"
import { ILoaderProps } from "./types"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
const rotateKeyframes = {
  "100%": {
    transform: "rotate(360deg)"
  }
}
const bounceKeyframes = {
  "0%, 100%": {
    transform: "scale(0)"
  },
  "50%": {
    transform: "scale(1.0)"
  }
}
const rotateAnimationName = insertKeyframesRule(rotateKeyframes)
const bounceAnimationName = insertKeyframesRule(bounceKeyframes)

DotLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "60px"
}

export default function DotLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(0, props)}>
        <div style={getStyle(1, props)}></div>
        <div style={getStyle(2, props)}></div>
      </div>
    </div>
  ) : null
}

function getBallStyle(size: number, { color, verticalAlign }: ILoaderProps) {
  return {
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: "100%",
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [
    i === 0 ? rotateAnimationName : bounceAnimationName,
    "2s",
    i === 2 ? "-1s" : "0s",
    "infinite",
    "linear"
  ].join(" ")
  const animationFillMode = "forwards"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(i: number, props: ILoaderProps) {
  const size = parseInt(props.size, 10)
  const ballSize = size / 2
  if (i) {
    return assign(getBallStyle(ballSize, props), getAnimationStyle(i), {
      position: "absolute",
      top: i % 2 ? 0 : "auto",
      bottom: i % 2 ? "auto" : 0
    })
  }
  return assign(getAnimationStyle(i), {
    width: size,
    height: size,
    position: "relative"
  })
}
