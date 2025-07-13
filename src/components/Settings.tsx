import { HexAlphaColorPicker } from 'react-colorful'
import { useFieldState } from '@/store/field'
import { useFiguresEvents, useFiguresState } from '@/store/figures'
import type { TFigureItem } from '@/types'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react'
import { useMemo } from 'react'

type NumberFields<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export const Settings = () => {
  const { selectedFigureId } = useFieldState()
  const { figuresList } = useFiguresState()
  const { setFigures } = useFiguresEvents()

  const selectedFigureIndex = useMemo(() => {
    return figuresList.findIndex((figure) => figure.id === selectedFigureId)
  }, [figuresList, selectedFigureId])

  const selectedFigure = figuresList[selectedFigureIndex]

  console.log(selectedFigure)

  const handleChangeFigure = <Key extends keyof TFigureItem>(
    field: Key,
    value: TFigureItem[Key],
  ) => {
    const newFigures = [...figuresList]
    newFigures[selectedFigureIndex][field] = value
    setFigures(newFigures)
  }

  const handleChangeNumberValue = <
    Key extends keyof Pick<TFigureItem, NumberFields<TFigureItem>>,
  >(
    field: Key,
    value: number,
    defaultValue = 0,
  ) => {
    handleChangeFigure(field, isFinite(value) ? value : defaultValue)
  }

  if (!selectedFigure) return null

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      position="absolute"
      height="100%"
      right="0"
      top="0"
      padding="20px"
    >
      <Flex
        direction="column"
        gap="5px"
        background={'white'}
        padding="20px"
        height="500px"
        boxShadow="lg"
      >
        <InputGroup size="sm">
          <InputLeftAddon>Text</InputLeftAddon>
          <Input
            value={selectedFigure.text}
            onChange={(e) => handleChangeFigure('text', e.target.value)}
            width="44"
          />
        </InputGroup>

        <Flex justifyContent="space-around">
          <InputGroup size="sm">
            <InputLeftAddon>X</InputLeftAddon>
            <Input
              width="24"
              value={selectedFigure.x}
              type="number"
              onChange={(e) => {
                handleChangeNumberValue('x', e.target.valueAsNumber)
              }}
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftAddon>Y</InputLeftAddon>
            <Input
              width="24"
              value={selectedFigure.y}
              type="number"
              onChange={(e) => {
                handleChangeNumberValue('y', e.target.valueAsNumber)
              }}
            />
          </InputGroup>
        </Flex>

        <Flex justifyContent="space-around">
          <InputGroup size="sm">
            <InputLeftAddon>Width</InputLeftAddon>
            <Input
              width="16"
              value={selectedFigure.width}
              type="number"
              onChange={(e) => {
                handleChangeNumberValue('width', e.target.valueAsNumber)
              }}
            />
          </InputGroup>

          <InputGroup size="sm">
            <InputLeftAddon>Height</InputLeftAddon>
            <Input
              width="16"
              value={selectedFigure.height}
              type="number"
              onChange={(e) => {
                handleChangeNumberValue('height', e.target.valueAsNumber)
              }}
            />
          </InputGroup>
        </Flex>

        <InputGroup size="sm">
          <InputLeftAddon>Rotation</InputLeftAddon>
          <Input
            type="number"
            value={selectedFigure.rotatationDeg}
            onChange={(e) =>
              handleChangeNumberValue('rotatationDeg', e.target.valueAsNumber)
            }
            width="44"
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftAddon>Border radius</InputLeftAddon>
          <Input
            type="number"
            value={selectedFigure.cornerRadius}
            onChange={(e) =>
              handleChangeNumberValue('cornerRadius', e.target.valueAsNumber)
            }
            width="44"
          />
        </InputGroup>

        <InputGroup size="sm">
          <InputLeftAddon>Bg color</InputLeftAddon>
          <Input
            value={selectedFigure.fill}
            onChange={(e) => handleChangeFigure('fill', e.target.value)}
            width="28"
          />
          <InputRightElement>
            <Box
              width="20px"
              height="20px"
              bgColor={selectedFigure.fill}
              border="2px solid black"
            />
          </InputRightElement>
        </InputGroup>

        <HexAlphaColorPicker
          color={selectedFigure.fill}
          onChange={(newColor) => handleChangeFigure('fill', newColor)}
        />
      </Flex>
    </Box>
  )
}
