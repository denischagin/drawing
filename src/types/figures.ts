import type { Circle, Rect } from 'react-konva'

export type FigureVariants = 'rect' | 'circle'

export type TFigureBase = {
  id: number
  x: number
  y: number
  fill: string
  rotatationDeg: number
  cornerRadius: number
  width: number
  height: number
  text: string
}

export type TFigureItem = TFigureBase

export type TFiguresListState = TFigureItem[]

export type TComponentByType = {
  rect: typeof Rect
  circle: typeof Circle
}
