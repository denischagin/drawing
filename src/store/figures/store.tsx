import type { TFigureItem, TFiguresListState } from '@/types'
import { createEvent, createStore } from 'effector'
import { useUnit } from 'effector-react'

const initialState: TFiguresListState = {
  figuresList: [
    {
      id: 1,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fill: '#ffffff',
      rotatationDeg: 0,
      cornerRadius: Infinity,
      text: 'hello',
    },
    {
      id: 2,
      x: 500,
      y: 30,
      height: 100,
      width: 500,
      fill: '#fdfddf',
      rotatationDeg: 0,
      cornerRadius: 0,
      text: 'world',
    },
    {
      id: 3,
      x: 300,
      y: 100,
      height: 100,
      width: 50,
      fill: '#11ffff',
      rotatationDeg: 0,
      cornerRadius: 60,
      text: 'from',
    },
    {
      id: 4,
      x: 500,
      y: 200,
      height: 200,
      width: 100,
      fill: '#ff11ff',
      rotatationDeg: 0,
      cornerRadius: 3,
      text: 'russia',
    },
  ],
}

const $figuresState = createStore<TFiguresListState>(initialState)

const setFigures = createEvent<TFigureItem[]>()
const addFigure = createEvent<TFigureItem>()

$figuresState
  .on(setFigures, (_, newFigures) => ({
    figuresList: newFigures,
  }))
  .on(addFigure, (state, newFigure) => ({
    figuresList: [...state.figuresList, newFigure],
  }))

export const useFiguresState = () => useUnit($figuresState)
export const useFiguresEvents = () => useUnit({ setFigures, addFigure })
