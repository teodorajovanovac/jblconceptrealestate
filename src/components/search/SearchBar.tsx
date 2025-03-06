import { useState } from 'react'
import { Search } from 'lucide-react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

// Custom styled slider
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.main}16`,
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#e5e7eb',
  },
}))

interface SearchBarProps {
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

export default function SearchBar({ minPrice, maxPrice, minArea, maxArea }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])
  const [areaRange, setAreaRange] = useState<number[]>([minArea, maxArea])

  const formatPrice = (value: number) => `${value}M €`
  const formatArea = (value: number) => `${value} m²`

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Search Input */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Pretraži po adresi, gradu ili kraju"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 text-lg border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue"
        />
        <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
      </div>

      {/* Primary Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <select 
          className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue appearance-none bg-white"
          defaultValue=""
        >
          <option value="" disabled>Tip nekretnine</option>
          <option value="house">Kuća</option>
          <option value="apartment">Stan</option>
          <option value="land">Zemljište</option>
        </select>

        {/* Number of Rooms */}
        <select 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-blue appearance-none bg-white"
          defaultValue=""
        >
          <option value="" disabled>Broj soba</option>
          <option value="1">1+ soba</option>
          <option value="2">2+ sobe</option>
          <option value="3">3+ sobe</option>
          <option value="4">4+ sobe</option>
        </select>
      </div>

      {/* Range Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Price Range Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">CENA</span>
            <span className="text-gray-600">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </span>
          </div>
          <CustomSlider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            valueLabelFormat={formatPrice}
            min={minPrice}
            max={maxPrice}
          />
        </div>

        {/* Area Range Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">POVRŠINA</span>
            <span className="text-gray-600">
              {formatArea(areaRange[0])} - {formatArea(areaRange[1])}
            </span>
          </div>
          <CustomSlider
            value={areaRange}
            onChange={(_, newValue) => setAreaRange(newValue as number[])}
            valueLabelDisplay="auto"
            valueLabelFormat={formatArea}
            min={minArea}
            max={maxArea}
            step={50}
          />
        </div>
      </div>

      {/* Dodatni filteri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* State */}
        <select 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-blue appearance-none bg-white"
          defaultValue=""
        >
          <option value="" disabled>Stanje</option>
          <option value="new">Novo</option>
          <option value="good">Dobro</option>
          <option value="renovation">Za renoviranje</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button className="text-primary-blue hover:text-secondary-blue text-lg">
          Manje filtera
        </button>
        <button className="bg-primary-blue text-white px-10 py-3 rounded-lg hover:bg-secondary-blue transition-colors text-lg">
          Pretraži
        </button>
      </div>
    </div>
  )
} 