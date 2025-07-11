import React, { Fragment, useState } from 'react'
import { Layer, Stage, Rect, Circle } from 'react-konva'
import type { TComponentByType, TFiguresListState } from './types'
import type { KonvaEventObject } from 'konva/lib/Node'

const App: React.FC = () => {
  const [figures, setFigures] = useState<TFiguresListState>([
    { id: 1, type: 'rect', x: 0, y: 0, width: 100, height: 100, fill: 'red' },
    { id: 2, type: 'circle', radius: 90, x: 500, y: 30, fill: 'blue' },
  ])

  console.log(figures)

  const componentByType: TComponentByType = {
    rect: Rect,
    circle: Circle,
  }

  const handleChangeFigurePos = (
    id: number,
    e: KonvaEventObject<DragEvent>,
  ) => {
    setFigures((prevFigures) => {
      const findedFigureIndex = prevFigures.findIndex(
        (figure) => figure.id === id,
      )
      prevFigures[findedFigureIndex] = {
        ...prevFigures[findedFigureIndex],
        x: e.target.x(),
        y: e.target.y(),
      }
      return [...prevFigures]
    })
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {figures.map((figure) => {
          const { id, ...figureRest } = figure
          const Component = componentByType[figure.type]
          return (
            <Fragment key={figure.id}>
              <Component
                {...figureRest}
                onDragEnd={(e) => handleChangeFigurePos(id, e)}
                draggable
              />
            </Fragment>
          )
        })}
      </Layer>
    </Stage>
  )
}

export default App
