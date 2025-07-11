import { getTextPosition } from '@/helpers'
import { getTextSize } from '@/helpers/text'
import type { TFigureItem } from '@/types'
import type Konva from 'konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import { Fragment, useEffect, useRef, type FC } from 'react'
import { Rect, Text, Transformer } from 'react-konva'

export type ElementProps = TFigureItem & {
  onChange?: (newFigures: TFigureItem) => void
  figures: TFigureItem[]
  isSelected: boolean
  onSelect: () => void
}

export const Element: FC<ElementProps> = (props) => {
  const { id, onChange, figures, isSelected, onSelect, ...figure } = props

  const shapeRef = useRef<Konva.Node>(null)
  const trRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (isSelected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current])
    }
  }, [isSelected])

  const handleChangeFigurePos = (
    id: number,
    e: KonvaEventObject<DragEvent>,
  ) => {
    onChange && onChange({ id, ...figure, x: e.target.x(), y: e.target.y() })
  }

  const textPosition = getTextPosition({ id, ...figure })
  const textSize = getTextSize({ id, ...figure })

  return (
    <Fragment key={id}>
      <Rect
        {...figure}
        ref={shapeRef as any}
        onDragEnd={(e) => handleChangeFigurePos(id, e)}
        onDragMove={(e) => handleChangeFigurePos(id, e)}
        draggable
        stroke="black"
        onClick={onSelect}
        strokeWidth={2}
        cornerRadius={figure.cornerRadius}
        onTransform={() => {
          const node = shapeRef.current
          if (node === null) return
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          const x = node.x()
          const y = node.y()
          const rotation = node.rotation()

          onChange &&
            onChange({
              id,
              ...figure,
              x: x,
              y: y,
              rotatationDeg: rotation,
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            })
        }}
      />
      <Text
        text={figure.text}
        x={textPosition.x}
        y={textPosition.y}
        width={textSize.width}
        height={textSize.height}
        align="center"
        verticalAlign="middle"
        listening={false}
        rotationDeg={figure.rotatationDeg}
        padding={3}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </Fragment>
  )
}
