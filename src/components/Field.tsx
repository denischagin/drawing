import React, { useEffect, useState } from 'react'
import { Layer, Stage, Transformer } from 'react-konva'
import { Element } from '@/components/Element'
import { useFieldEvents, useFieldState } from '@/store/field'
import { useFiguresEvents, useFiguresState } from '@/store/figures'
import { isFigure, parseAndValidateFigure } from '@/helpers/figure'

export const Field: React.FC = () => {
  const { figuresList } = useFiguresState()
  const { setFigures, removeFigure, addFigure } = useFiguresEvents()
  const { selectedFigureId } = useFieldState()
  const { selectFigure } = useFieldEvents()

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    if (!selectedFigureId) return

    const handleDeleteFigure = (e: KeyboardEvent) => {
      if (e.key !== 'Delete') return
      removeFigure(selectedFigureId)
    }

    const handleCopyFigure = async (e: ClipboardEvent) => {
      const figure = figuresList.find(
        (figure) => figure.id === selectedFigureId,
      )

      await navigator.clipboard.writeText(JSON.stringify(figure))
    }

    const handlePasteFigure = async (e: ClipboardEvent) => {
      if (!e.clipboardData) return

      const text = e.clipboardData.getData('text')

      const parsedFigure = parseAndValidateFigure(text)
      if (!parsedFigure) return

      const pastedFigureId = Date.now()

      addFigure({ ...parsedFigure, id: pastedFigureId })
      selectFigure(pastedFigureId)
    }

    document.addEventListener('keydown', handleDeleteFigure)
    document.addEventListener('copy', handleCopyFigure)
    document.addEventListener('paste', handlePasteFigure)

    return () => {
      document.removeEventListener('keydown', handleDeleteFigure)
      document.removeEventListener('copy', handleCopyFigure)
      document.removeEventListener('paste', handlePasteFigure)
    }
  }, [selectedFigureId])

  useEffect(() => {
    const handleResizeWindow = (_e: UIEvent) => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResizeWindow)

    return () => window.removeEventListener('resize', handleResizeWindow)
  }, [])

  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
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
