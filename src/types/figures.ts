import type { Circle, Rect } from 'react-konva'

export type FigureVariants = 'rect' | 'circle'

export type TFigure = {
  id: number
  x: number
  y: number
  fill: string
}

export type TRect = TFigure & {
  type: 'rect'
  width: number
  height: number
}

export type TCircle = TFigure & {
  type: 'circle'
  radius: number
}

export type TFiguresListState = (TRect | TCircle)[]

export type TComponentByType = {
  rect: typeof Rect
  circle: typeof Circle
}
