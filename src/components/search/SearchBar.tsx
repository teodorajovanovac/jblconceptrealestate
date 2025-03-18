import { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

// Custom styled slider
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#2563eb', // primary-blue
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: '2px solid #2563eb',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.16)',
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#e5e7eb',
  },
}))

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  transactionType: 'buy' | 'rent';
  searchTerm: string;
  propertyTypes: string[];
  rooms: string[];
  locations: string[];
  priceRange: number[];
  areaRange: number[];
  features: string[];
  state: string[];
  floor: string[];
  heating: string[];
  parking: string[];
}

interface DropdownProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const PRICE_RANGES = {
  buy: { min: 0, max: 1000000 },
  rent: { min: 0, max: 3000 }
}

const AREA_RANGE = { min: 0, max: 500 }

// Dropdown komponenta sa checkboxovima
const Dropdown = ({ title, options, selected, onChange, isOpen, onToggle }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zatvori dropdown kada se klikne van njega
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent hover:border-primary-blue transition-colors"
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            {selected.length > 0 ? `${title} (${selected.length})` : title}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 space-y-1">
            {options.map((option) => (
              <label key={option} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onChange(option)}
                  className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue mr-2"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState<number[]>([PRICE_RANGES.buy.min, PRICE_RANGES.buy.max])
  const [areaRange, setAreaRange] = useState<number[]>([AREA_RANGE.min, AREA_RANGE.max])
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [transactionType, setTransactionType] = useState<'buy' | 'rent'>('buy')
  
  // Dropdown states
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string[]>([])
  const [selectedFloor, setSelectedFloor] = useState<string[]>([])
  const [selectedHeating, setSelectedHeating] = useState<string[]>([])
  const [selectedParking, setSelectedParking] = useState<string[]>([])

  // Dropdown visibility states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Reset price range when transaction type changes
  useEffect(() => {
    setPriceRange([
      PRICE_RANGES[transactionType].min,
      PRICE_RANGES[transactionType].max
    ])
  }, [transactionType])

  const formatPrice = (value: number) => {
    if (transactionType === 'buy') {
      return `${value / 1000}k €`
    }
    return `${value} €`
  }
  
  const formatArea = (value: number) => `${value} m²`

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const handleSubmit = () => {
    // Pretvaramo vrednosti iz klizača u objekt za filtriranje
    const filters: SearchFilters = {
      transactionType: transactionType,
      searchTerm: searchTerm,
      propertyTypes: selectedPropertyTypes,
      rooms: selectedRooms,
      locations: selectedLocations,
      priceRange: [priceRange[0], priceRange[1]], // Min i max cena
      areaRange: [areaRange[0], areaRange[1]],   // Min i max površina
      features: selectedFeatures,
      state: selectedState,
      floor: selectedFloor,
      heating: selectedHeating,
      parking: selectedParking
    };
    
    // Pozivamo funkciju za pretragu
    onSearch(filters);
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Transaction Type Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            className={`px-6 py-2 rounded-md transition-all ${
              transactionType === 'buy'
                ? 'bg-primary-blue text-white'
                : 'text-gray-600 hover:text-primary-blue'
            }`}
            onClick={() => setTransactionType('buy')}
          >
            Kupi
          </button>
          <button
            className={`px-6 py-2 rounded-md transition-all ${
              transactionType === 'rent'
                ? 'bg-primary-blue text-white'
                : 'text-gray-600 hover:text-primary-blue'
            }`}
            onClick={() => setTransactionType('rent')}
          >
            Iznajmi
          </button>
        </div>
      </div>

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

      {/* Primary Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Dropdown
          title="Tip nekretnine"
          options={['Kuća', 'Stan', 'Zemljište', 'Poslovni prostor', 'Garaža']}
          selected={selectedPropertyTypes}
          onChange={(value) => handleCheckboxChange(value, selectedPropertyTypes, setSelectedPropertyTypes)}
          isOpen={openDropdown === 'propertyType'}
          onToggle={() => toggleDropdown('propertyType')}
        />

        <Dropdown
          title="Broj soba"
          options={['Garsonjera', '1 soba', '1.5 soba', '2 sobe', '2.5 sobe', '3 sobe', '3.5 sobe', '4 sobe', '4+ sobe']}
          selected={selectedRooms}
          onChange={(value) => handleCheckboxChange(value, selectedRooms, setSelectedRooms)}
          isOpen={openDropdown === 'rooms'}
          onToggle={() => toggleDropdown('rooms')}
        />

        <Dropdown
          title="Lokacija"
          options={['Stari Grad', 'Vračar', 'Savski Venac', 'Novi Beograd', 'Zemun', 'Dedinje']}
          selected={selectedLocations}
          onChange={(value) => handleCheckboxChange(value, selectedLocations, setSelectedLocations)}
          isOpen={openDropdown === 'location'}
          onToggle={() => toggleDropdown('location')}
        />
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
            min={PRICE_RANGES[transactionType].min}
            max={PRICE_RANGES[transactionType].max}
            step={transactionType === 'buy' ? 1000 : 50}
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
            min={AREA_RANGE.min}
            max={AREA_RANGE.max}
            step={5}
          />
        </div>
      </div>

      {/* Additional Filters */}
      {showMoreFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Dropdown
            title="Stanje"
            options={['Novo', 'Dobro', 'Za renoviranje']}
            selected={selectedState}
            onChange={(value) => handleCheckboxChange(value, selectedState, setSelectedState)}
            isOpen={openDropdown === 'state'}
            onToggle={() => toggleDropdown('state')}
          />

          <Dropdown
            title="Sprat"
            options={['Suteren', 'Prizemlje', '1. sprat', '2. sprat', '3. sprat', '4. sprat', '5+ sprat', 'Penthaus']}
            selected={selectedFloor}
            onChange={(value) => handleCheckboxChange(value, selectedFloor, setSelectedFloor)}
            isOpen={openDropdown === 'floor'}
            onToggle={() => toggleDropdown('floor')}
          />

          <Dropdown
            title="Grejanje"
            options={['Centralno', 'Električno', 'Gas', 'Podno', 'TA peć']}
            selected={selectedHeating}
            onChange={(value) => handleCheckboxChange(value, selectedHeating, setSelectedHeating)}
            isOpen={openDropdown === 'heating'}
            onToggle={() => toggleDropdown('heating')}
          />

          <Dropdown
            title="Dodatne karakteristike"
            options={['Terasa', 'Lift', 'Ostava', 'Namešten', 'Obezbeđenje', 'Parking', 'Garaža']}
            selected={selectedFeatures}
            onChange={(value) => handleCheckboxChange(value, selectedFeatures, setSelectedFeatures)}
            isOpen={openDropdown === 'features'}
            onToggle={() => toggleDropdown('features')}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="text-primary-blue hover:text-secondary-blue text-lg flex items-center"
        >
          {showMoreFilters ? 'Manje' : 'Više'} filtera
          <ChevronDown className={`ml-1 w-5 h-5 transform transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
        </button>
        <button 
          onClick={handleSubmit}
          className="bg-primary-blue text-white px-10 py-3 rounded-lg hover:bg-secondary-blue transition-colors text-lg"
        >
          Pretraži
        </button>
      </div>
    </div>
  )
} 