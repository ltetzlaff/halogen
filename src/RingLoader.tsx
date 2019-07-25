import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const rightRotateKeyframes = {
  "0%": {
    transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
  },
  "100%": {
    transform: "rotateX(180deg) rotateY(360deg) rotateZ(360deg)"
  }
}
const leftRotateKeyframes = {
  "0%": {
    transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
  },
  "100%": {
    transform: "rotateX(360deg) rotateY(180deg) rotateZ(360deg)"
  }
}

const rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes)

const leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes)
RingLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "60px"
}
export default function RingLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(0, props)}>
        <div style={getStyle(1, props)}></div>
        <div style={getStyle(2, props)}></div>
      </div>
    </div>
  ) : null

  function getCircleStyle(
    size: number,
    { color, verticalAlign }: ILoaderProps
  ) {
    return {
      width: size,
      height: size,
      border: `${size / 10}px solid ${color}`,
      opacity: 0.4,
      borderRadius: "100%",
      verticalAlign
    }
  }
  function getAnimationStyle(i: number) {
    const animation = [
      i === 1 ? rightRotateAnimationName : leftRotateAnimationName,
      "2s",
      "0s",
      "infinite",
      "linear"
    ].join(" ")
    const animationFillMode = "forwards"
    const perspective = "800px"
    return {
      perspective: perspective,
      animation: animation,
      animationFillMode: animationFillMode
    }
  }
  function getStyle(i: number, props: ILoaderProps) {
    const size = parseInt(props.size, 10)
    if (i) {
      return assign(getCircleStyle(size, props), getAnimationStyle(i), {
        position: "absolute",
        top: 0,
        left: 0
      })
    }
    return {
      width: size,
      height: size,
      position: "relative"
    }
  }
}
