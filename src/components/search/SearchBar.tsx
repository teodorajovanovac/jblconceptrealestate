import { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { PRICE_RANGES, AREA_RANGE, TransactionType } from '../../utils/constants'

// Custom styled slider
const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#0A142F',
  height: 3,
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(10, 20, 47, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: 3,
    backgroundColor: '#0A142F',
  },
  '& .MuiSlider-rail': {
    height: 3,
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
  bathrooms: string[];
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

  const handleChange = (option: string) => {
    console.log(`Dropdown selected: ${option} in ${title}`);
    console.log(`Current selected items in ${title}:`, selected);
    onChange(option);
  };

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
            {options.map((option, index) => (
              <div 
                key={`${title}-${option}-${index}`}
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleChange(option)}
                role="checkbox"
                aria-checked={selected.includes(option)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChange(option);
                  }
                }}
              >
                <input
                  type="checkbox"
                  id={`${title}-${option}-${index}`}
                  checked={selected.includes(option)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleChange(option);
                  }}
                  className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue mr-2"
                  aria-label={option}
                />
                <label 
                  htmlFor={`${title}-${option}-${index}`}
                  className="text-sm text-gray-700 cursor-pointer flex-grow"
                >
                  {option}
                </label>
              </div>
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
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>([])
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
      return `${value / 1000} €`
    }
    return `${value} €`
  }
  
  const formatArea = (value: number) => `${value} m²`

  // Define more accurate options based on the API data
  const propertyTypeOptions = [
    { label: 'Stan', value: 'stan' },
    { label: 'Kuća', value: 'kuca' },
    { label: 'Poslovni prostor', value: 'poslovni' },
    { label: 'Zemljište', value: 'zemljiste' },
    { label: 'Garaža', value: 'garaza' }
  ];
  
  const roomOptions = [
    { label: 'Garsonjera', value: '0' },
    { label: '1 soba', value: '1' },
    { label: '1.5 soba', value: '1.5' },
    { label: '2 sobe', value: '2' },
    { label: '2.5 sobe', value: '2.5' },
    { label: '3 sobe', value: '3' },
    { label: '3.5 sobe', value: '3.5' },
    { label: '4 sobe', value: '4' },
    { label: '4+ sobe', value: '5' }
  ];
  
  const locationOptions = [
    'Stari Grad', 'Vračar', 'Savski Venac', 'Novi Beograd', 
    'Zemun', 'Dedinje', 'Voždovac', 'Zvezdara', 'Čukarica', 
    'Rakovica', 'Palilula', 'Banovo brdo'
  ];
  
  const featureOptions = [
    'Terasa', 'Lift', 'Ostava', 'Namešten', 'Obezbeđenje', 
    'Parking', 'Garaža', 'Klima', 'Internet', 'Interfon', 'Uknjiženo'
  ];

  // Add bathroom options
  const bathroomOptions = [
    '1 kupatilo', '2 kupatila', '3 kupatila', '4+ kupatila'
  ];

  // Update handleCheckboxChange function
  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: (value: string[]) => void
  ) => {
    // Create new array based on current selection
    let newSelected: string[];
    
    if (selected.includes(value)) {
      newSelected = selected.filter(item => item !== value);
    } else {
      newSelected = [...selected, value];
    }
    
    console.log(`Toggling value: ${value} in category ${selected === selectedRooms ? 'rooms' : 
                                                        selected === selectedLocations ? 'locations' : 
                                                        selected === selectedPropertyTypes ? 'propertyTypes' : 'other'}`);
    console.log('Previous selection:', selected);
    console.log('New selection:', newSelected);
    
    // Update state with new selection
    setSelected(newSelected);
    
    // Immediately trigger a search with the updated filters
    setTimeout(() => {
      // First, create a copy of what the state will be
      const updatedPropertyTypes = selected === selectedPropertyTypes ? newSelected : selectedPropertyTypes;
      const updatedRooms = selected === selectedRooms ? newSelected : selectedRooms;
      const updatedLocations = selected === selectedLocations ? newSelected : selectedLocations;
      const updatedFeatures = selected === selectedFeatures ? newSelected : selectedFeatures;
      
      console.log('Creating filters with updated values:', {
        propertyTypes: updatedPropertyTypes,
        rooms: updatedRooms,
        locations: updatedLocations,
        features: updatedFeatures
      });
      
      const filters: SearchFilters = {
        transactionType,
        searchTerm,
        propertyTypes: updatedPropertyTypes,
        rooms: updatedRooms,
        locations: updatedLocations,
        priceRange,
        areaRange,
        features: updatedFeatures,
        bathrooms: selectedBathrooms,
        floor: selectedFloor,
        heating: selectedHeating,
        parking: selectedParking
      };
      
      console.log('Sending search filters:', filters);
      
      // Call onSearch with the updated filters
      onSearch(filters);
    }, 100); // Small delay to ensure state is updated
  }

  // Handle transaction type change
  const handleTransactionTypeChange = (type: 'buy' | 'rent') => {
    setTransactionType(type);
    
    // Update price range based on transaction type
    const newPriceRange = [
      PRICE_RANGES[type].min,
      PRICE_RANGES[type].max
    ];
    setPriceRange(newPriceRange);
    
    // Create filters object with the new transaction type
    const filters: SearchFilters = {
      transactionType: type,
      searchTerm,
      propertyTypes: selectedPropertyTypes,
      rooms: selectedRooms,
      locations: selectedLocations,
      priceRange: newPriceRange,
      areaRange: areaRange,
      features: selectedFeatures,
      bathrooms: selectedBathrooms,
      floor: selectedFloor,
      heating: selectedHeating,
      parking: selectedParking
    };
    
    // Immediately trigger search with the new filters
    onSearch(filters);
  };

  // Update the clear filters function
  const clearFilters = () => {
    // Reset all filter states
    setSearchTerm('');
    setPriceRange([PRICE_RANGES[transactionType].min, PRICE_RANGES[transactionType].max]);
    setAreaRange([AREA_RANGE.min, AREA_RANGE.max]);
    setSelectedPropertyTypes([]);
    setSelectedRooms([]);
    setSelectedLocations([]);
    setSelectedFeatures([]);
    setSelectedBathrooms([]);
    setSelectedFloor([]);
    setSelectedHeating([]);
    setSelectedParking([]);
    
    // Trigger a search with cleared filters
    onSearch({
      transactionType,
      searchTerm: '',
      propertyTypes: [],
      rooms: [],
      locations: [],
      priceRange: [PRICE_RANGES[transactionType].min, PRICE_RANGES[transactionType].max],
      areaRange: [AREA_RANGE.min, AREA_RANGE.max],
      features: [],
      bathrooms: [],
      floor: [],
      heating: [],
      parking: []
    });
  }

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Transaction Type Toggle - Larger buttons */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => handleTransactionTypeChange('buy')}
          className={`px-10 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow ${
            transactionType === 'buy'
              ? 'bg-primary-blue text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Kupi
        </button>
        <button
          onClick={() => handleTransactionTypeChange('rent')}
          className={`px-10 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow ${
            transactionType === 'rent'
              ? 'bg-primary-blue text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Iznajmi
        </button>
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
        <Search className="absolute right-6 top-1/2 transform -translate-y-5 text-gray-400 w-6 h-6" />
      </div>

      {/* Primary Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Dropdown
          title="Tip nekretnine"
          options={propertyTypeOptions.map(option => option.label)}
          selected={selectedPropertyTypes.map(value => 
            propertyTypeOptions.find(opt => opt.value === value)?.label || value
          )}
          onChange={(label) => {
            const option = propertyTypeOptions.find(opt => opt.label === label);
            if (option) {
              handleCheckboxChange(option.value, selectedPropertyTypes, setSelectedPropertyTypes);
            }
          }}
          isOpen={openDropdown === 'propertyType'}
          onToggle={() => toggleDropdown('propertyType')}
        />

        <Dropdown
          title="Broj soba"
          options={roomOptions.map(option => option.label)}
          selected={selectedRooms.map(value => {
            const roomOption = roomOptions.find(opt => opt.value === value);
            return roomOption ? roomOption.label : value;
          })}
          onChange={(label) => {
            console.log('Room dropdown selection:', label);
            const option = roomOptions.find(opt => opt.label === label);
            if (option) {
              console.log('Found option for room:', option);
              handleCheckboxChange(option.value, selectedRooms, setSelectedRooms);
            } else {
              console.log('No matching room option found for label:', label);
              handleCheckboxChange(label, selectedRooms, setSelectedRooms);
            }
          }}
          isOpen={openDropdown === 'rooms'}
          onToggle={() => toggleDropdown('rooms')}
        />

        <Dropdown
          title="Lokacija"
          options={locationOptions}
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
            title="Broj kupatila"
            options={bathroomOptions}
            selected={selectedBathrooms}
            onChange={(value) => handleCheckboxChange(value, selectedBathrooms, setSelectedBathrooms)}
            isOpen={openDropdown === 'bathrooms'}
            onToggle={() => toggleDropdown('bathrooms')}
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
            options={featureOptions}
            selected={selectedFeatures}
            onChange={(value) => handleCheckboxChange(value, selectedFeatures, setSelectedFeatures)}
            isOpen={openDropdown === 'features'}
            onToggle={() => toggleDropdown('features')}
          />
        </div>
      )}

      {/* Active Filter Pills */}
      {(selectedPropertyTypes.length > 0 || selectedRooms.length > 0 || 
        selectedLocations.length > 0 || selectedFeatures.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-3 mb-6">
          {selectedPropertyTypes.map(value => {
            const option = propertyTypeOptions.find(opt => opt.value === value);
            return (
              <div key={`type-${value}`} className="bg-blue-100 text-primary-blue px-3 py-1 rounded-full text-sm flex items-center">
                {option?.label || value}
                <button 
                  onClick={() => handleCheckboxChange(value, selectedPropertyTypes, setSelectedPropertyTypes)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          
          {selectedRooms.map(value => {
            const option = roomOptions.find(opt => opt.value === value);
            return (
              <div key={`room-${value}`} className="bg-blue-100 text-primary-blue px-3 py-1 rounded-full text-sm flex items-center">
                {option?.label || value}
                <button 
                  onClick={() => handleCheckboxChange(value, selectedRooms, setSelectedRooms)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
          
          {selectedLocations.map(location => (
            <div key={`location-${location}`} className="bg-blue-100 text-primary-blue px-3 py-1 rounded-full text-sm flex items-center">
              {location}
              <button 
                onClick={() => handleCheckboxChange(location, selectedLocations, setSelectedLocations)}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          
          {selectedFeatures.map(feature => (
            <div key={`feature-${feature}`} className="bg-blue-100 text-primary-blue px-3 py-1 rounded-full text-sm flex items-center">
              {feature}
              <button 
                onClick={() => handleCheckboxChange(feature, selectedFeatures, setSelectedFeatures)}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons - Updated with Clear Filters option */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="text-primary-blue hover:text-secondary-blue text-lg flex items-center"
          >
            {showMoreFilters ? 'Manje' : 'Više'} filtera
            <ChevronDown className={`ml-1 w-5 h-5 transform transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
          </button>
          {(selectedPropertyTypes.length > 0 || selectedRooms.length > 0 || selectedLocations.length > 0 || 
            selectedFeatures.length > 0 || selectedBathrooms.length > 0 || selectedFloor.length > 0 || 
            selectedHeating.length > 0 || searchTerm !== '') && (
            <button 
              onClick={clearFilters}
              className="text-gray-500 hover:text-red-500 text-sm flex items-center ml-4"
            >
              <X className="w-4 h-4 mr-1" />
              Očisti filtere
            </button>
          )}
        </div>
        <button 
          id="search-button"
          onClick={() => {
            // Show loading state
            document.getElementById('search-button')?.classList.add('opacity-75');
            
            // Prepare filters object
            const filters: SearchFilters = {
              transactionType,
              searchTerm,
              propertyTypes: selectedPropertyTypes,
              rooms: selectedRooms,
              locations: selectedLocations,
              priceRange: [priceRange[0], priceRange[1]],
              areaRange: [areaRange[0], areaRange[1]],
              features: selectedFeatures,
              bathrooms: selectedBathrooms,
              floor: selectedFloor,
              heating: selectedHeating,
              parking: selectedParking
            };
            
            console.log("Applying search filters:", filters);
            
            // Call onSearch with all filters
            onSearch(filters);
            
            // Reset button after a short delay
            setTimeout(() => {
              document.getElementById('search-button')?.classList.remove('opacity-75');
            }, 300);
          }}
          className="cta-button rounded-full"
        >
          <span>Pretraži</span>
        </button>
      </div>
    </div>
  )
} 