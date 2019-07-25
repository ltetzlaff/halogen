import { HTMLProps } from "./html"

export interface ILoaderProps extends Omit<HTMLProps<"div">, "size"> {
  loading: boolean
  color: string
  size: string
  margin: string
  verticalAlign: string
}

export interface IExtendedLoaderProps extends ILoaderProps {
  height: string
  width: string
  radius: string
}
