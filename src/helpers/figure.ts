import type { TFiguresListState } from '@/types'

export const changeFigurePos = (
  figures: TFiguresListState,
  id: number,
  x: number,
  y: number,
): TFiguresListState => {
  const findedFigureIndex = figures.findIndex((figure) => figure.id === id)
  figures[findedFigureIndex] = {
    ...figures[findedFigureIndex],
    x: x,
    y: y,
  }
  return [...figures]
}
