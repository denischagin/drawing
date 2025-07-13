import { HexAlphaColorPicker } from 'react-colorful'
import { useFieldEvents, useFieldState } from '@/store/field'
import { useFiguresEvents, useFiguresState } from '@/store/figures'
import type { TFigureItem } from '@/types'
import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'

type NumberFields<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export const Settings = () => {
  const { selectedFigureId } = useFieldState()
  const { selectFigure } = useFieldEvents()
  const { figuresList } = useFiguresState()
  const { setFigures } = useFiguresEvents()

  const selectedFigureIndex = useMemo(() => {
    return figuresList.findIndex((figure) => figure.id === selectedFigureId)
  }, [figuresList, selectedFigureId])

  const selectedFigure = figuresList[selectedFigureIndex]

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
        boxShadow="lg"
      >
        <Flex direction="column">
          {figuresList.map((figure) => (
            <Flex
              _hover={{ bg: 'blackAlpha.200' }}
              width="100%"
              gap="5px"
              p="5px"
              align={'center'}
              onClick={() => selectFigure(figure.id)}
              borderRadius="md"
              {...(figure.id === selectedFigureId
                ? {
                    bg: 'blackAlpha.200',
                  }
                : {})}
            >
              <Flex
                justify={'center'}
                align={'center'}
                bg={figure.fill}
                width="20px"
                height="20px"
                border="1px solid black"
                borderRadius={(figure.cornerRadius / figure.width) * 20}
              ></Flex>
              <Text
                px="0.5"
                bg={'gray.100'}
                borderRadius="md"
              >
                Figure:
              </Text>
              <Text align="left">{figure.text}</Text>
            </Flex>
          ))}
        </Flex>
        <Divider />
        {!!selectedFigure && (
          <Flex
            direction="column"
            gap={'5px'}
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
                  handleChangeNumberValue(
                    'rotatationDeg',
                    e.target.valueAsNumber,
                  )
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
                  handleChangeNumberValue(
                    'cornerRadius',
                    e.target.valueAsNumber,
                  )
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
        )}
      </Flex>
    </Box>
  )
}
