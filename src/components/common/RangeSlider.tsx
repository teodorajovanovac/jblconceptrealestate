import { useState, useEffect } from 'react'
import * as Slider from '@radix-ui/react-slider'

interface RangeSliderProps {
  min: number
  max: number
  step: number
  defaultValue: [number, number]
  formatValue: (value: number) => string
  onValueChange: (value: [number, number]) => void
  label: string
}

export default function RangeSlider({
  min,
  max,
  step,
  defaultValue,
  formatValue,
  onValueChange,
  label
}: RangeSliderProps) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <div className="flex gap-2">
          <span className="text-gray-600">{formatValue(value[0])}</span>
          <span className="text-gray-400">-</span>
          <span className="text-gray-600">{formatValue(value[1])}</span>
        </div>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue as [number, number])
          onValueChange(newValue as [number, number])
        }}
        min={min}
        max={max}
        step={step}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-primary-blue rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary-blue rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          aria-label="Min value"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-primary-blue rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          aria-label="Max value"
        />
      </Slider.Root>
    </div>
  )
} 