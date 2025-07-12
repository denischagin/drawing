import type { TFieldState } from '@/types'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'

const initialState: TFieldState = {
  selectedFigureId: null,
}

const $field = createStore<TFieldState>(initialState)

const selectFigure = createEvent<number>()
const setSelectedFigure = createEvent<number | null>()

$field
  .on(selectFigure, (state, figureId) => ({
    ...state,
    selectedFigureId: state.selectedFigureId === figureId ? null : figureId,
  }))
  .on(setSelectedFigure, (state, figureId) => ({
    ...state,
    selectedFigureId: figureId,
  }))

export const useFieldState = () => useUnit($field)
export const useFieldEvents = () => useUnit({ selectFigure, setSelectedFigure })
