import { h } from "preact"
import { ILoaderProps } from "./types"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
const keyframes = {
  "0%": {
    transform: "rotate(0deg) scale(1)"
  },
  "50%": {
    transform: "rotate(180deg) scale(0.8)"
  },
  "100%": {
    transform: "rotate(360deg) scale(1)"
  }
}

const animationName = insertKeyframesRule(keyframes)

ClipLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "35px"
}

export default function ClipLoader(props: ILoaderProps) {
  return (
    props.loading && (
      <div id={props.id} className={props.className}>
        <div style={getStyle(props)}></div>
      </div>
    )
  )
}

function getBallStyle({ size, color, verticalAlign }: ILoaderProps) {
  return {
    width: size,
    height: size,
    border: "2px solid",
    borderColor: color,
    borderBottomColor: "transparent",
    borderRadius: "100%",
    background: "transparent !important",
    verticalAlign
  }
}
function getAnimationStyle() {
  const animation = [animationName, "0.75s", "0s", "infinite", "linear"].join(
    " "
  )
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(props: ILoaderProps) {
  return assign(getBallStyle(props), getAnimationStyle(), {
    display: "inline-block"
  })
}
