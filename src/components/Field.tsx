import React, { useState } from 'react'
import { Layer, Stage, Transformer } from 'react-konva'
import type { TFiguresListState } from '@/types'
import { Element } from '@/components/Element'

export const Field: React.FC = () => {
  const [figures, setFigures] = useState<TFiguresListState>([
    {
      id: 1,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fill: 'white',
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
      fill: 'pink',
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
      fill: 'brown',
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
      fill: 'red',
      rotatationDeg: 0,
      cornerRadius: 3,
      text: 'russia',
    },
  ])

  const [selectedFigureId, setSelectedFigureId] = useState<null | number>(null)

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {figures.map((figure, figureIndex) => {
          return (
            <Element
              key={figure.id}
              {...figure}
              figures={figures}
              onChange={(newFigure) =>
                setFigures((prevFigures) => {
                  prevFigures = [...prevFigures]
                  prevFigures[figureIndex] = newFigure
                  return prevFigures
                })
              }
              onSelect={() => setSelectedFigureId(figure.id)}
              isSelected={figure.id === selectedFigureId}
            />
          )
        })}
        <Transformer />
      </Layer>
    </Stage>
  )
}
