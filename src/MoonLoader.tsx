import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "100%": {
    transform: "rotate(360deg)"
  }
}

const animationName = insertKeyframesRule(keyframes)

MoonLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "60px"
}
export default function MoonLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(0, props)}>
        <div style={getStyle(1, props)}></div>
        <div style={getStyle(2, props)}></div>
      </div>
    </div>
  ) : null
}
function getBallStyle(size: number, { verticalAlign }: ILoaderProps) {
  return {
    width: size,
    height: size,
    borderRadius: "100%",
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [animationName, "0.6s", "0s", "infinite", "linear"].join(
    " "
  )
  const animationFillMode = "forwards"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(i: number, props: ILoaderProps) {
  const size = parseInt(props.size, 10)
  const moonSize = size / 7
  if (i === 1) {
    return assign(getBallStyle(moonSize, props), getAnimationStyle(i), {
      backgroundColor: props.color,
      opacity: "0.8",
      position: "absolute",
      top: size / 2 - moonSize / 2
    })
  } else if (i === 2) {
    return assign(getBallStyle(size, props), {
      border: `${moonSize}px solid ${props.color}`,
      opacity: 0.1
    })
  } else {
    return assign(getAnimationStyle(i), {
      position: "relative"
    })
  }
}
