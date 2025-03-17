interface JBLLogoProps {
  className?: string;
}

export const JBLLogo = ({ className = "" }: JBLLogoProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 10H160C171.046 10 180 18.9543 180 30C180 41.0457 171.046 50 160 50H40C28.9543 50 20 41.0457 20 30C20 18.9543 28.9543 10 40 10Z"
        fill="#C4A052" // JBL Gold color
      />
      <text
        x="100"
        y="38"
        fontFamily="Arial"
        fontSize="24"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
      >
        JBL CONCEPT
      </text>
    </svg>
  );
}; 