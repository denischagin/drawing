import React, { useState } from 'react'
import { Layer, Stage, Transformer } from 'react-konva'
import type { TFiguresListState } from '@/types'
import { Element } from '@/components/Element'

export const Field: React.FC = () => {
  const [figures, setFigures] = useState<TFiguresListState>([
    {
      id: 1,
      type: 'rect',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      fill: 'white',
    },
    { id: 2, type: 'circle', radius: 90, x: 500, y: 30, fill: 'white' },
  ])

  const [selectedFigureId, setSelectedFigureId] = useState<null | number>(null)

  console.log(selectedFigureId)

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
