import { componentByType } from '@/constants'
import { changeFigurePos, getTextPosition } from '@/helpers'
import { getTextSize } from '@/helpers/text'
import type { TFigureItem } from '@/types'
import type Konva from 'konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import { Fragment, useEffect, useRef, type FC, type RefObject } from 'react'
import { Text, Transformer } from 'react-konva'

export type ElementProps = TFigureItem & {
  onChange?: (newFigures: TFigureItem) => void
  figures: TFigureItem[]
  isSelected: boolean
  onSelect: () => void
}

export const Element: FC<ElementProps> = (props) => {
  const { id, onChange, figures, isSelected, onSelect, ...figure } = props
  const Component = componentByType[figure.type]

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
      <Component
        {...figure}
        ref={shapeRef as any}
        onDragEnd={(e) => handleChangeFigurePos(id, e)}
        onDragMove={(e) => handleChangeFigurePos(id, e)}
        draggable
        stroke="black"
        onClick={onSelect}
        strokeWidth={2}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current
          if (node === null) return
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          // we will reset it back
          node.scaleX(1)
          node.scaleY(1)

          onChange &&
            onChange({
              id,
              ...figure,
              x: node.x(),
              y: node.y(),
              ...(figure.type === 'rect'
                ? {
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(node.height() * scaleY),
                  }
                : { radius: Math.max(5, (node.width() / 2) * scaleX) }),
            })
        }}
      />
      <Text
        text="hello world"
        x={textPosition.x}
        y={textPosition.y}
        width={textSize.width}
        height={textSize.height}
        align="center"
        verticalAlign="middle"
        listening={false}
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
