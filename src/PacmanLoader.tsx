import { h } from "preact"
import { ILoaderProps } from "./types"
// @ts-ignore
import assign from "domkit/appendVendorPrefix"
// @ts-ignore
import insertKeyframesRule from "domkit/insertKeyframesRule"
const animations: { [index: string]: {} } = {}

PacmanLoader.defaultProps = {
  loading: true,
  color: "#ffffff",
  size: 25,
  margin: 2
}

export default function PacmanLoader(props: ILoaderProps) {
  const style = {
    position: "relative",
    fontSize: 0
  }
  return (
    props.loading && (
      <div id={props.id} className={props.className}>
        <div style={style}>
          <div style={getStyle(1, props)} />
          <div style={getStyle(2, props)} />
          <div style={getStyle(3, props)} />
          <div style={getStyle(4, props)} />
          <div style={getStyle(5, props)} />
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
function getAnimationStyle(i: number, { size }: ILoaderProps) {
  let animationName = animations[size]
  const sizeNr = Number(size)
  if (!animationName) {
    const keyframes = {
      "75%": {
        opacity: 0.7
      },
      "100%": {
        transform: `translate(${-4 * sizeNr}px,${sizeNr / -4}px)`
      }
    }
    animationName = animations[size] = insertKeyframesRule(keyframes)
  }
  const animation = [
    animationName,
    "1s",
    i * 0.25 + "s",
    "infinite",
    "linear"
  ].join(" ")
  const animationFillMode = "both"
  return {
    animation: animation,
    animationFillMode: animationFillMode
  }
}
function getStyle(i: number, props: ILoaderProps) {
  if (i === 1) {
    const s1 = props.size + "px solid transparent"
    const s2 = `${props.size}px solid ${props.color}`
    return {
      width: 0,
      height: 0,
      borderRight: s1,
      borderTop: s2,
      borderLeft: s2,
      borderBottom: s2,
      borderRadius: props.size
    }
  }
  return assign(getBallStyle(props), getAnimationStyle(i, props), {
    width: 10,
    height: 10,
    transform: `translate(0, ${-props.size / 4}px)`,
    position: "absolute",
    top: 25,
    left: 100
  })
}
