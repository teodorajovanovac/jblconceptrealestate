import { useState, useEffect, useRef } from 'react'
import { ChevronDown, X } from 'lucide-react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import realEstate from "../../data/RealEstateData"
import { useCmsData } from '../../services/CmsProvider';
import { ComboBoxDto } from '../../data/models/ComboBoxDto'
import Dropdown from '../common/Dropdown'
import { ValueRangesDto } from '../../data/models/ValueRangesDto'
import { SearchFilters } from '../../data/models/SearchFilters';
import Switch from '../common/switch/Switch'
import Dropdowntree from '../common/dropdowntree/Dropdowntree'

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

interface RangeStep {
  category: string
  name: string
  steps: number
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  defaultFilters?: SearchFilters;
  onReady?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultFilters, onReady }) => {
  const { t, currentLanguage } = useCmsData();
  const [selectedAction, setAction] = useState<string>(defaultFilters?.actionName || "P")
  const [error, setError] = useState<string | null>(null);

  const [actionNames, setActionNames] = useState<ComboBoxDto[]>([])
  const [propertyType, setPropertyType] = useState<ComboBoxDto[]>([])
  const [location, setLocation] = useState<ComboBoxDto[]>([])
  const [locationAreaCity, setLocationAreaCity] = useState<ComboBoxDto[]>([])
  const [roomsNo, setRoomsNo] = useState<ComboBoxDto[]>([])
  const [valueRanges, setValueRanges] = useState<ValueRangesDto[]>([])
  const [searchTerm, setSearchTerm] = useState(defaultFilters?.searchTerm || '')
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(defaultFilters?.propertyTypes || [])
  const [selectedRooms, setSelectedRooms] = useState<string[]>(defaultFilters?.rooms || [])
  const [selectedLocations, setSelectedLocations] = useState<string[]>(defaultFilters?.locations || [])
  const [selectedLocationsAreaCity, setSelectedLocationsAreaCity] = useState<string[]>(
    defaultFilters?.locationsAreaCity || []
  )
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(defaultFilters?.features || [])
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>(defaultFilters?.bathrooms || [])
  const [selectedFloor, setSelectedFloor] = useState<string[]>(defaultFilters?.floor || [])
  const [selectedHeating, setSelectedHeating] = useState<string[]>(defaultFilters?.heating || [])
  const [selectedParking, setSelectedParking] = useState<string[]>(defaultFilters?.parking || [])

  const [selectedPriceRange, setPriceRange] = useState<number[]>(defaultFilters?.priceRange || [0, 0])
  const [selectedAreaRange, setAreaRange] = useState<number[]>(defaultFilters?.areaRange || [0, 0])

  const [selectedNewBuilding, setSelectedNewBuilding] = useState<number>(
    defaultFilters?.newBuilding ?? 0
  )
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add useEffect to initialize ranges when valueRanges are loaded
  useEffect(() => {
    if (valueRanges.length > 0 && selectedAction && t("range-steps", "object")) {
      if (!defaultFilters?.priceRange || defaultFilters?.priceRange.length === 0) {
        //console.log("defaultFilters?.priceRange",defaultFilters?.priceRange)
        setPriceRange([
          getMinMaxValue(selectedAction, 'price', true),
          getMinMaxValue(selectedAction, 'price', false),
        ]);
      }
      
      if (!defaultFilters?.areaRange || defaultFilters?.areaRange.length === 0) {
        setAreaRange([
          getMinMaxValue(selectedAction, 'area', true),
          getMinMaxValue(selectedAction, 'area', false)
        ]);
      }
    }
  }, [valueRanges, selectedAction]);

  // Separate useEffect for initial data loading
  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        await fetchActionName();
        
        await Promise.all([
          fetchTypesName(),
          fetchLocation(),
          fetchLocationAreaCity(),
          fetchRoomsNo(),
          fetchValueRanges()
        ]);

        // Set initial action (either from defaultFilters or default "P")
        // console.log("defaultFilters",defaultFilters)
        // const initialAction = defaultFilters?.actionName || "P";
        // //setMaunualValueRanges(initialAction);
        // setAction(initialAction);
        
        // Fetch value ranges after action is set
        
        
        setIsLoading(false);
        onReady?.();
      } catch (err) {
        console.error('Error initializing SearchBar:', err);
        setError("Failed to initialize search");
        setIsLoading(false);
      }
    };

    initializeData();
  }, [currentLanguage]);

  useEffect(() => {
    if (!isLoading && selectedAction) {
      const filters: SearchFilters = {
        actionName: selectedAction,
        searchTerm,
        propertyTypes: selectedPropertyTypes,
        rooms: selectedRooms,
        locations: selectedLocations,
        locationsAreaCity: selectedLocationsAreaCity,
        priceRange: selectedPriceRange,
        areaRange: selectedAreaRange,
        features: selectedFeatures,
        bathrooms: selectedBathrooms,
        floor: selectedFloor,
        heating: selectedHeating,
        parking: selectedParking,
        newBuilding: selectedNewBuilding
      };
      
      onSearch(filters);
    }
  }, [selectedAction]);

  const setMaunualValueRanges = (newAction?: string, newPriceRange?: number[], newAreaRange?: number[]) => {
    const action = newAction || selectedAction;

    setPriceRange(newPriceRange || [
      getMinMaxValue(action, 'price', true),
      getMinMaxValue(action, 'price', false),
    ]);
    setAreaRange(newAreaRange || [
      getMinMaxValue(action, 'area', true),
      getMinMaxValue(action, 'area', false)
    ]);
  }

  const formatPrice = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '0 €';
    return new Intl.NumberFormat('sr-RS', {
      maximumFractionDigits: 0
    }).format(value) + ' €';
  };

  const formatArea = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '0 m²';
    return new Intl.NumberFormat('sr-RS', {
      maximumFractionDigits: 0
    }).format(value) + ' m²';
  };
  
  const getMinMaxValue = (actionShortName: string, fieldName: string, isMinValue: boolean) => {
    const filtered = valueRanges.find(
      (item) => item.actionShortName.toLowerCase() == actionShortName.toLowerCase() && item.fieldName.toLowerCase() === fieldName.toLowerCase()
    );
    return filtered ? (isMinValue ? filtered.minValue : filtered.maxValue) : 0;
  };

const getSteps = (actionName: string, fieldName: string): number => {
  const rangeSteps = t("range-steps", "object") as RangeStep[];
  if (!rangeSteps) {
    console.debug('CMS data not yet loaded');
    return 1;
  }
  
  if (!Array.isArray(rangeSteps)) {
    console.debug('range-steps is not in expected format:', rangeSteps);
    return 1;
  }
  
  const step = rangeSteps.find(
    item => item.category.toLowerCase() === actionName.toLowerCase() && 
           item.name.toLowerCase() === fieldName.toLowerCase()
  );

  return step?.steps || 1;
};

const fetchActionName = async () => {
  try{
    const result = await realEstate.getActionName(currentLanguage);
    if (result) 
      {
        setActionNames(result);
        
      } else {
        setError("Failed to fetch property action name data");
      }
    } catch (err) {
    setError("Failed to fetch property action name data");
  }
}
const fetchTypesName = async () => {
  try {
    
    const result = await realEstate.getPropertyType(currentLanguage);
    console.log("lang",currentLanguage)
    if (result) 
      {
        setPropertyType(result);
      } else {
        setError("Failed to fetch property type data");
      }
  } catch (err) {
    setError("Failed to fetch property type data");
  }
}
const fetchLocation = async () => {
  try {
    const result = await realEstate.getLocationAreaCountyCity(currentLanguage);
    if (result) 
      {
        setLocation(result);
      } else {
        setError("Failed to fetch location data");
      }
  } catch (err) {
    setError("Failed to fetch location data");
  }
}

const fetchLocationAreaCity = async () => {
  try {
    const result = await realEstate.getLocationAreaCity(currentLanguage);
    if (result) 
      {


        setLocationAreaCity(result);
      } else {
        setError("Failed to fetch location data");
      }
  } catch (err) {
    setError("Failed to fetch location data");
  }
}

const fetchRoomsNo = async () => {
  try {
    const result = await realEstate.getRoomsNo(currentLanguage);
    if (result) 
      {
        setRoomsNo(result);
      } else {
        setError("Failed to fetch RoomsNo data");
      }
  } catch (err) {
    setError("Failed to fetch RoomsNo data");
  }
}
const fetchValueRanges = async () => {
  try {
    const result = await realEstate.getValueRanges();
    console.log("valueRanges",result)
    if (result) 
      {
        setValueRanges(result);
      } else {
        setError("Failed to fetch ValueRanges data");
      }
  } catch (err) {
    setError("Failed to fetch ValueRanges data");
  }
}

const handleCheckboxChange = (
  value: string,
  selected: string[],
  setSelected: (value: string[]) => void
) => {
  let newSelected = [...selected];
  
  if (selected.includes(value)) {
    newSelected = newSelected.filter(item => item !== value);
    
    const parentOption = locationAreaCity.find(opt => opt.value === value);
    if (parentOption?.children) {
      newSelected = newSelected.filter(item => 
        !parentOption.children!.some(child => child.value === item)
      );
    }
  } else {
    newSelected.push(value);
    
    const parentOption = locationAreaCity.find(opt => opt.value === value);
    if (parentOption?.children) {
      parentOption.children.forEach(child => {
        if (!newSelected.includes(child.value)) {
          newSelected.push(child.value);
        }
      });
    }
  }
  
  setSelected(newSelected);
}

const handleActionChange = (newAction: string) => {
  setAction(newAction);
  
  if (valueRanges.length > 0) {
    setPriceRange([
      getMinMaxValue(newAction, 'price', true),
      getMinMaxValue(newAction, 'price', false),
    ]);
    
    setAreaRange([
      getMinMaxValue(newAction, 'area', true),
      getMinMaxValue(newAction, 'area', false)
    ]);
  }
};

const clearFilters = () => {
  console.log("302 - SearcBar - clearFilters")
  setSearchTerm('');
  setPriceRange([
    getMinMaxValue(selectedAction, 'price', true),
    getMinMaxValue(selectedAction, 'price', false),
  ])
  setAreaRange([
    getMinMaxValue(selectedAction, 'area', true),
    getMinMaxValue(selectedAction, 'area', false)
  ])
  setSelectedPropertyTypes([]);
  setSelectedRooms([]);
  setSelectedLocations([]);
  setSelectedLocationsAreaCity([]);
  setSelectedFeatures([]);
  setSelectedBathrooms([]);
  setSelectedFloor([]);
  setSelectedHeating([]);
  setSelectedParking([]);
  setSelectedNewBuilding(-1);
}

const toggleDropdown = (name: string) => {
  setOpenDropdown(openDropdown === name ? null : name);
};

if (isLoading || !actionNames.length || !valueRanges.length) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
      </div>
    </div>
  );
}

return (
  <div className="w-full max-w-7xl mx-auto px-4">
    <div className="flex justify-center gap-3 mb-6">
      {actionNames.map((action) => (
        <button
          key={action.value}
          onClick={() => handleActionChange(action.value)}
          className={`px-10 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow ${
            selectedAction === action.value
              ? 'bg-primary-blue text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {action.caption}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Dropdown
        title={t("property-type")}
        options={propertyType}
        selected={selectedPropertyTypes}
        onChange={(value) => handleCheckboxChange(value, selectedPropertyTypes, setSelectedPropertyTypes)}
        isOpen={openDropdown === 'propertyType'}
        onToggle={() => toggleDropdown('propertyType')}
        hasSearch={false}
      />
      <Dropdowntree
        title={t("property-location")}
        options={locationAreaCity}
        selected={selectedLocationsAreaCity}
        onChange={(value) => handleCheckboxChange(value, selectedLocationsAreaCity, setSelectedLocationsAreaCity)}
        isOpen={openDropdown === 'locationAreaCity'}
        onToggle={() => toggleDropdown('locationAreaCity')}
        hasSearch
        expandAll={true}
      />
    <div className="flex justify-between">
      <Dropdown
        title={t("property-rooms")}
        options={roomsNo}
        selected={selectedRooms}
        onChange={(value) => handleCheckboxChange(value, selectedRooms, setSelectedRooms)}
        isOpen={openDropdown === 'roomsNo'}
        onToggle={() => toggleDropdown('roomsNo')}
        className="min-w-[200px]"
        hasSearch={false}
      />
      <Switch
        title={t("property-new-building")}
        selected={selectedNewBuilding}
        onChange={(value: number) => setSelectedNewBuilding(value)}
        isChecked={selectedNewBuilding === 1}
        onToggle={() => setSelectedNewBuilding(selectedNewBuilding === 1 ? 0 : 1)}
      />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">{t("property-price")}</span>
          <span className="text-gray-600">
            {formatPrice(selectedPriceRange[0])} - {formatPrice(selectedPriceRange[1])}
          </span>
        </div>
        <CustomSlider
          value={selectedPriceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} €`}
          min={getMinMaxValue(selectedAction, 'price', true)}
          max={getMinMaxValue(selectedAction, 'price', false)}
          step={getSteps(selectedAction, 'price')}
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">{t("property-area")}</span>
          <span className="text-gray-600">
            {formatArea(selectedAreaRange[0])} - {formatArea(selectedAreaRange[1])}
          </span>
        </div>
        <CustomSlider
          value={selectedAreaRange}
          onChange={(_, newValue) => setAreaRange(newValue as number[])}
          valueLabelDisplay="auto"
          valueLabelFormat={formatArea}
          min={getMinMaxValue(selectedAction, 'area', true)}
          max={getMinMaxValue(selectedAction, 'area', false)}
          step={getSteps(selectedAction, 'area')}
        />
      </div>
    </div>

    {(selectedPropertyTypes.length > 0 || selectedRooms.length > 0 || 
      selectedLocations.length > 0 || selectedFeatures.length > 0 || selectedLocationsAreaCity.length > 0) && (
      <div className="flex flex-wrap gap-2 mt-3 mb-6">
        {selectedPropertyTypes.map(value => {
          const option = propertyType.find(opt => opt.value === value);
          return (
            <div key={`type-${value}`} className="bg-slate-100 text-primary-blue pl-3 rounded-full text-sm flex items-center">
              {option?.caption || value}
              <button 
                onClick={() => handleCheckboxChange(value, selectedPropertyTypes, setSelectedPropertyTypes)}
                className="text-gray-500 bg-slate-200 hover:text-gray-700 hover:bg-slate-300 rounded-full p-1 m-1 ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}

    
        {selectedRooms.map(value => {
          const option = roomsNo.find(opt => opt.value === value);
          return (
            <div key={`room-${value}`} className="bg-slate-100 text-primary-blue pl-3 rounded-full text-sm flex items-center">
              {option?.caption || value}
              <button 
                onClick={() => handleCheckboxChange(value, selectedRooms, setSelectedRooms)}
               className="text-gray-500 bg-slate-200 hover:text-gray-700 hover:bg-slate-300 rounded-full p-1 m-1 ml-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
        
        {selectedLocationsAreaCity.map(value => {
          const option = locationAreaCity.find(opt => 
            opt.value === value || opt.children?.some(child => child.value === value)
          );
          const isChild = option?.children?.some(child => child.value === value);
          const parent = isChild ? option : null;
          const childOption = isChild ? option?.children?.find(child => child.value === value) : null;
          
          return (
            <div key={`location-${value}`} className="bg-slate-100 text-primary-blue pl-3 rounded-full text-sm flex items-center">
              {isChild ? `${parent?.caption} > ${childOption?.caption}` : option?.caption}
            <button 
                onClick={() => handleCheckboxChange(value, selectedLocationsAreaCity, setSelectedLocationsAreaCity)}
              className="text-gray-500 bg-slate-200 hover:text-gray-700 hover:bg-slate-300 rounded-full p-1 m-1 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          );
        })}
        
        {selectedFeatures.map(feature => (
          <div key={`feature-${feature}`} className="bg-slate-100 text-primary-blue pl-3 rounded-full text-sm flex items-center">
            {feature}
            <button 
              onClick={() => handleCheckboxChange(feature, selectedFeatures, setSelectedFeatures)}
              className="text-gray-500 bg-slate-200 hover:text-gray-700 hover:bg-slate-300 rounded-full p-1 m-1 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    )}

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="text-primary-blue hover:text-secondary-blue text-lg flex items-center"
        >
          
          <ChevronDown className={`ml-0 mr-1 w-5 h-5 transform transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
          {showMoreFilters ? t("property-search-less") : t("property-search-more") } 
        </button>
        {(selectedPropertyTypes.length > 0 || selectedRooms.length > 0 || selectedLocations.length > 0 || 
          selectedFeatures.length > 0 || selectedBathrooms.length > 0 || selectedFloor.length > 0 || 
          selectedLocationsAreaCity.length > 0 || selectedHeating.length > 0 || selectedNewBuilding !== -1 ||
          selectedHeating.length > 0 || selectedParking.length > 0 || selectedNewBuilding !== -1 || searchTerm !== '') && (
          <button 
            onClick={clearFilters}
            className="text-gray-500 hover:text-red-500 text-lg flex items-center ml-4"
          >
            <X className="w-4 h-4 mr-1 " />
           { t("property-search-clear")}
          </button>
        )}
      </div>
      <button 
        id="search-button"
        onClick={() => {
          document.getElementById('search-button')?.classList.add('opacity-75');
          
          const filters: SearchFilters = {
            actionName: selectedAction,
            searchTerm,
            propertyTypes: selectedPropertyTypes,
            rooms: selectedRooms,
            locations: selectedLocations,
            locationsAreaCity: selectedLocationsAreaCity,
            priceRange: selectedPriceRange,
            areaRange: selectedAreaRange,
            features: selectedFeatures,
            bathrooms: selectedBathrooms,
            floor: selectedFloor,
            heating: selectedHeating,
            parking: selectedParking,
            newBuilding: selectedNewBuilding
          };
        
          onSearch(filters);
          
          setTimeout(() => {
            document.getElementById('search-button')?.classList.remove('opacity-75');
          }, 300);
        }}
        className="cta-button rounded-full"
      >
        <span>{t("property-search")}</span>
      </button>
    </div>
  </div>
)
} 

export default SearchBar;