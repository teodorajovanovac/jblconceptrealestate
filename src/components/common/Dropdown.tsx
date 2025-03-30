import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ComboBoxDto } from '../../data/models/ComboBoxDto'
import './Dropdown.css'

interface DropdownProps {
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
}

const Dropdown: React.FC<DropdownProps> = ({ 
  title, 
  searchplaceholder,
  options, 
  selected, 
  onChange, 
  isOpen, 
  onToggle,
  hasSearch = false,
  className = '',
  containerClassName = ''
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Филтрирамо опције на основу претраге
  const filteredOptions = options.filter(option =>
    option.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // Ресетујемо претрагу када се dropdown затвори
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <div className={`relative ${containerClassName}`}>
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
          
          <div className={`overflow-y-auto ${hasSearch ? 'max-h-[240px]' : 'max-h-[280px]'}`}>
            <div className="p-2 space-y-1">
              {filteredOptions.map((option, index) => (
                <div 
                  key={`${title}-${option.value}-${index}`}
                  className="checkbox-wrapper-29 hover:bg-gray-50 rounded"
                >
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      className="checkbox__input"
                      checked={selected.includes(option.value)}
                      onChange={() => onChange(option.value)}
                    />
                    <span className="checkbox__label"></span>
                    <span className="checkbox__text">{option.caption}</span>
                  </label>
                </div>
              ))}
              
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

export default Dropdown; 