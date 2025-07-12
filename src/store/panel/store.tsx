import type { TPanelState } from '@/types'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'

const initialState: TPanelState = {
  selectedFigureId: null,
}

const $panel = createStore<TPanelState>(initialState)

const selectFigure = createEvent<string>()
const setSelectedFigure = createEvent<string | null>()

$panel
  .on(selectFigure, (state, figureId) => ({
    ...state,
    selectedFigureId: state.selectedFigureId === figureId ? null : figureId,
  }))
  .on(setSelectedFigure, (state, figureId) => ({
    ...state,
    selectedFigureId: figureId,
  }))

export const usePanelState = () => useUnit($panel)
export const usePanelEvents = () => useUnit({ selectFigure, setSelectedFigure })
