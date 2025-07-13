import type { TFigureItem } from '@/types'

export const changeFigurePos = (
  figures: TFigureItem[],
  id: number,
  x: number,
  y: number,
): TFigureItem[] => {
  const findedFigureIndex = figures.findIndex((figure) => figure.id === id)
  figures[findedFigureIndex] = {
    ...figures[findedFigureIndex],
    x: x,
    y: y,
  }
  return [...figures]
}

export const isFigure = (obj: any): obj is TFigureItem => {
  const requiredFields = {
    id: 'number',
    x: 'number',
    y: 'number',
    fill: 'string',
    rotatationDeg: 'number',
    cornerRadius: 'number',
    width: 'number',
    height: 'number',
    text: 'string',
  }

  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  for (const [field, type] of Object.entries(requiredFields)) {
    if (!(field in obj) || typeof obj[field] !== type) {
      return false
    }
  }

  return true
}

export const parseAndValidateFigure = (
  figureString: string,
): TFigureItem | null => {
  try {
    const parsed = JSON.parse(figureString)
    if (isFigure(parsed)) {
      return parsed
    }
    return null
  } catch (e) {
    return null
  }
}
