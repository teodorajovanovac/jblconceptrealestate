import clsx from "clsx";
import "./Spinner.css";

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
};

export default function Spinner({ size = 'md', className  }: SpinnerProps) {
  return (
    <svg
    className={clsx("spinner", sizeClasses[size])}
    viewBox="0 0 50 50"
  >
    <circle
      className={className}
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>

// const Spinner = () => {
//   return (
//     //<div className="fixed inset-0 flex items-center justify-center">
//     <div className="flex h-screen w-full items-center justify-center">
//       <div className="flex items-center justify-center w-full h-full">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;
  );
} 