import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { ILoaderProps } from "./types"
const keyframes = {
  "25%": {
    transform: "perspective(100px) rotateX(180deg) rotateY(0)"
  },
  "50%": {
    transform: "perspective(100px) rotateX(180deg) rotateY(180deg)"
  },
  "75%": {
    transform: "perspective(100px) rotateX(0) rotateY(180deg)"
  },
  "100%": {
    transform: "perspective(100px) rotateX(0) rotateY(0)"
  }
}

const animationName = insertKeyframesRule(keyframes)

SkewLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: "20px"
}

export default function SkewLoader(props: ILoaderProps) {
  return props.loading ? (
    <div id={props.id} className={props.className}>
      <div style={getStyle(props)}></div>
    </div>
  ) : null
}

function getSharpStyle({ size, verticalAlign, color }: ILoaderProps) {
  return {
    width: 0,
    height: 0,
    borderLeft: size + " solid transparent",
    borderRight: size + " solid transparent",
    borderBottom: `${size} solid ${color}`,
    verticalAlign
  }
}
function getAnimationStyle() {
  const animation = [
    animationName,
    "3s",
    "0s",
    "infinite",
    "cubic-bezier(.09,.57,.49,.9)"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(props: ILoaderProps) {
  return assign(getSharpStyle(props), getAnimationStyle(), {
    display: "inline-block"
  })
}
