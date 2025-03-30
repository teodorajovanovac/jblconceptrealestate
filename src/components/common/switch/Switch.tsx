import { useEffect, useRef } from "react";
import './Switch.css'

interface SwitchProps {
    title?: string;
    selected?: number;
    onChange?: (value: number) => void;
    isChecked: boolean;
    onToggle: () => void;
    primaryColor?: string;   // Custom primary color
    secondaryColor?: string; // Custom secondary color
    disabled?: boolean;      // Add disabled state
}

const Switch = ({
    title,
    selected,
    onChange,
    isChecked,
    onToggle,
    primaryColor = 'bg-primary-blue', // Default primary color
    secondaryColor = 'bg-gray-200',   // Default secondary color
    disabled = false,
}: SwitchProps) => {
    const switchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (switchRef.current && !disabled) {
            switchRef.current.addEventListener('click', onToggle);
            return () => {
                switchRef.current?.removeEventListener('click', onToggle);
            };
        }
    }, [onToggle, disabled]);

    return (
        <div 
            ref={switchRef}
            className={`
                relative inline-flex items-center cursor-pointer
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            <div className={`
                relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out
                ${isChecked ? primaryColor : secondaryColor}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}>
                <div className={`
                    absolute left-0.5 top-0.5
                    w-5 h-5 rounded-full bg-white
                    transform transition-transform duration-300 ease-in-out
                    shadow-sm
                    ${isChecked ? 'translate-x-5' : 'translate-x-0'}
                `} />
            </div>
            {title && (
                <span className={`
                    ml-3 text-sm font-medium text-gray-700
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                `}>
                    {title}
                </span>
            )}
        </div>
    );
};

export default Switch;
