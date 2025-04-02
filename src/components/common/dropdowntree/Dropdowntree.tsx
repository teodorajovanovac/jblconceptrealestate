import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ComboBoxDto } from '../../../data/models/ComboBoxDto'
import './Dropdowntree.css'

interface DropdownTreeProps {
  title: string;
  searchplaceholder?: string | ""
  options: ComboBoxDto[];
  selected: string[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  hasSearch?: boolean;
  className?: string;
  containerClassName?: string;
  expandAll?: boolean;
}

const Dropdowntree: React.FC<DropdownTreeProps> = ({ 
  title, 
  searchplaceholder,
  options, 
  selected = [],
  onChange, 
  isOpen, 
  onToggle,
  hasSearch = false,
  className = '',
  containerClassName = '',
  expandAll = false
}: DropdownTreeProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    if (expandAll) {
      const allParentValues = new Set<string>();
      const addParentValues = (items: ComboBoxDto[]) => {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            allParentValues.add(item.value);
            addParentValues(item.children);
          }
        });
      };
      addParentValues(options);
      return allParentValues;
    }
    return new Set();
  });

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle parent selection
  const handleParentSelect = (option: ComboBoxDto) => {
    const isSelecting = !selected.includes(option.value);
    
    if (option.children && option.children.length > 0) {
      // If selecting parent, select all children
      if (isSelecting) {
        // First select the parent
        onChange(option.value);
        // Then select all children
        // option.children.forEach(child => {
        //   onChange(child.value);
        // });
      } else {
        // If unselecting parent, unselect all children
        // First unselect the parent
        onChange(option.value);
        // Then unselect all children
        // option.children.forEach(child => {
        //   onChange(child.value);
        // });
      }
    } else {
      // Handle leaf node selection
      onChange(option.value);
      
      // Find and update parent state
      const parent = options.find(opt => 
        opt.children?.some(child => child.value === option.value)
      );
      
      if (parent) {
        const allSiblingsSelected = parent.children!.every(child => 
          selected.includes(child.value) || child.value === option.value
        );
        
        console.log("allSiblingsSelected", allSiblingsSelected);
        console.log("parent is selected", selected.includes(parent.value));
        console.log("selected value before", selected);

        if (allSiblingsSelected && selected.includes(parent.value) ) {
          console.log("selecting parent", parent.value);
          onChange(parent.value); // Select parent if all children are selected
        }
        // if (allSiblingsSelected && !selected.includes(parent.value)) {
        //   onChange(parent.value); // Select parent if all children are selected
        // } 
        
      }
    }
  };

  // Toggle item expansion
  const toggleExpand = (value: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  // Render tree item
  const renderTreeItem = (option: ComboBoxDto, level: number = 0) => {
    const hasChildren = option.children && option.children.length > 0;
    const isExpanded = expandedItems.has(option.value);
    const isSelected = selected.includes(option.value);
    const allChildrenSelected = hasChildren && option.children!.every(child => 
      selected.includes(child.value)
    );
    const someChildrenSelected = hasChildren && option.children!.some(child => 
      selected.includes(child.value)
    );

    return (
      <div key={option.value}>
        <div 
          className="checkbox-wrapper-29 hover:bg-gray-50 rounded"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox__input"
              checked={isSelected || allChildrenSelected}
              onChange={() => handleParentSelect(option)}
              ref={input => {
                if (input && hasChildren && someChildrenSelected !== undefined && allChildrenSelected !== undefined) {
                  input.indeterminate = someChildrenSelected && !allChildrenSelected;
                }
              }}
            />
            <span className="checkbox__label"></span>
            <span className="checkbox__text">{option.caption}</span>
            {hasChildren && (
              <ChevronDown 
                className={`w-4 h-4 ml-2 transition-transform cursor-pointer ${isExpanded ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleExpand(option.value);
                }}
              />
            )}
          </label>
        </div>
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {option.children!.map(child => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      <button
        onClick={onToggle}
        className={`w-full px-4 py-2.5 text-left bg-white border rounded-lg 
          hover:border-gray-400 focus:outline-none focus:border-primary-blue
          ${isOpen ? 'border-primary-blue' : 'border-gray-200'}
          ${className}`}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            {selected.length > 0 ? `${title} (${selected.length})` : title}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {hasSearch && (
            <div className="sticky top-0 p-2 border-b bg-white z-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchplaceholder}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className={`overflow-y-auto ${hasSearch ? 'max-h-[260px]' : 'max-h-[280px]'}`}>
            <div className="p-2 space-y-1">
              {filteredOptions.map(option => renderTreeItem(option))}
              
              {hasSearch && filteredOptions.length === 0 && (
                <div className="p-2 text-sm text-gray-500 text-center">
                  Нема резултата за "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdowntree; 