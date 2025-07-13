import React from 'react'
import { Layer, Stage, Transformer } from 'react-konva'
import { Element } from '@/components/Element'
import { useFieldEvents, useFieldState } from '@/store/field'
import { useFiguresEvents, useFiguresState } from '@/store/figures'

export const Field: React.FC = () => {
  const { figuresList } = useFiguresState()
  const { setFigures } = useFiguresEvents()
  const { selectedFigureId } = useFieldState()
  const { selectFigure } = useFieldEvents()

  // console.log(figuresList)

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {figuresList.map((figure, figureIndex) => {
          return (
            <Element
              key={figure.id}
              {...figure}
              figures={figuresList}
              onChange={(newFigure) => {
                const newFigures = [...figuresList]
                newFigures[figureIndex] = newFigure
                setFigures(newFigures)
              }}
              onSelect={() => selectFigure(figure.id)}
              isSelected={figure.id === selectedFigureId}
            />
          )
        })}
        <Transformer />
      </Layer>
    </Stage>
  )
}
