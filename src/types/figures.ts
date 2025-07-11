import type { Circle, Rect } from 'react-konva'

export type FigureVariants = 'rect' | 'circle'

export type TFigureBase = {
  id: number
  x: number
  y: number
  fill: string
}

export type TRect = TFigureBase & {
  type: 'rect'
  width: number
  height: number
}

export type TCircle = TFigureBase & {
  type: 'circle'
  radius: number
}

export type TFigureItem = TRect | TCircle

export type TFiguresListState = TFigureItem[]

export type TComponentByType = {
  rect: typeof Rect
  circle: typeof Circle
}
