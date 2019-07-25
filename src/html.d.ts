import { JSXInternal } from "preact/src/jsx"
export declare type HTMLTag = keyof JSXInternal.IntrinsicElements
export declare type HTMLProps<
  Tag extends HTMLTag
> = JSXInternal.IntrinsicElements[Tag] &
  Pick<JSXInternal.HTMLAttributes, "className">
