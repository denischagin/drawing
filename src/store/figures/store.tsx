import { STORAGE_KEYS } from '@/constants'
import { parseAndValidateFiguresList } from '@/helpers/figure'
import type { TFigureItem, TFiguresListState } from '@/types'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'

const figuresFromSS = sessionStorage.getItem(STORAGE_KEYS.figures)

const initialState: TFiguresListState = {
  figuresList: figuresFromSS
    ? parseAndValidateFiguresList(figuresFromSS) ?? []
    : [],
}

const $figuresState = createStore<TFiguresListState>(initialState)

const setFigures = createEvent<TFigureItem[]>()
const addFigure = createEvent<TFigureItem>()
const removeFigure = createEvent<number>()

$figuresState
  .on(setFigures, (_, newFigures) => ({
    figuresList: newFigures,
  }))
  .on(addFigure, (state, newFigure) => ({
    figuresList: [...state.figuresList, newFigure],
  }))
  .on(removeFigure, (state, figureId) => {
    const newFigures = state.figuresList.filter(
      (figure) => figure.id !== figureId,
    )

    return {
      figuresList: newFigures,
    }
  })

export const useFiguresState = () => useUnit($figuresState)
export const useFiguresEvents = () =>
  useUnit({ setFigures, addFigure, removeFigure })
