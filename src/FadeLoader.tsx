import { h } from "preact"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
import { IExtendedLoaderProps } from "./types"
const keyframes = {
  "50%": {
    opacity: 0.3
  },
  "100%": {
    opacity: 1
  }
}

const animationName = insertKeyframesRule(keyframes)

FadeLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  height: "15px",
  width: "5px",
  margin: "2px",
  radius: "2px"
}

export default function FadeLoader(props: IExtendedLoaderProps) {
  const style = {
    position: "relative",
    fontSize: 0
  }
  return props.loading ? (
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
      </div>
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
    height,
    width,
    margin,
    borderRadius: radius,
    verticalAlign
  }
}
function getAnimationStyle(i: number) {
  const animation = [
    animationName,
    "1.2s",
    i * 0.12 + "s",
    "infinite",
    "ease-in-out"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getPosStyle(i: number) {
  const radius = 20
  const quarter = radius / 2 + radius / 5.5
  const lines: { [key: string]: {} } = {
    l1: {
      top: radius,
      left: 0
    },
    l2: {
      top: quarter,
      left: quarter,
      transform: "rotate(-45deg)"
    },
    l3: {
      top: 0,
      left: radius,
      transform: "rotate(90deg)"
    },
    l4: {
      top: -quarter,
      left: quarter,
      transform: "rotate(45deg)"
    },
    l5: {
      top: -radius,
      left: 0
    },
    l6: {
      top: -quarter,
      left: -quarter,
      transform: "rotate(-45deg)"
    },
    l7: {
      top: 0,
      left: -radius,
      transform: "rotate(90deg)"
    },
    l8: {
      top: quarter,
      left: -quarter,
      transform: "rotate(45deg)"
    }
  }
  return lines["l" + i]
}

function getStyle(i: number, props: IExtendedLoaderProps) {
  return assign(getLineStyle(props), getPosStyle(i), getAnimationStyle(i), {
    position: "absolute"
  })
}
