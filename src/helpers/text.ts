import type { TCircle, TFigureItem, TRect } from '@/types'

export const getTextPosition = (
  figure: TFigureItem,
): { x: number; y: number } => {
  const functionByType = {
    rect: () => {
      figure = figure as TRect
      return {
        x: figure.x,
        y: figure.y,
      }
    },
    circle: () => {
      figure = figure as TCircle
      return { x: figure.x - figure.radius, y: figure.y - figure.radius / 2 }
    },
  }
  return functionByType[figure.type]()
}

export const getTextSize = (
  figure: TFigureItem,
): { width: number; height: number } => {
  const functionByType = {
    rect: () => {
      figure = figure as TRect
      return { width: figure.width, height: figure.height }
    },
    circle: () => {
      figure = figure as TCircle
      return { width: figure.radius * 2, height: figure.radius }
    },
  }
  return functionByType[figure.type]()
}
