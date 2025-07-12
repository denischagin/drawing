import type { TFigureItem } from '@/types'

export const DEFAULT_FIGURE: Omit<TFigureItem, 'id'> = {
  cornerRadius: 10,
  fill: 'transparent',
  rotatationDeg: 0,
  text: 'Text',
  height: 100,
  width: 100,
  x: 200,
  y: 200,
}
