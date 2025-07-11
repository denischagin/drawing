import type { TFigureItem } from '@/types'

export const getTextPosition = (
  figure: TFigureItem,
): { x: number; y: number } => {
  return {
    x: figure.x,
    y: figure.y,
  }
}

export const getTextSize = (
  figure: TFigureItem,
): { width: number; height: number } => {
  return { width: figure.width, height: figure.height }
}
