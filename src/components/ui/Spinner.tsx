import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-blue ${sizeClasses[size]} ${className}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
} 