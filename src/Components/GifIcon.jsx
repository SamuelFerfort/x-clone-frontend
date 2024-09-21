const GifIcon = ({ size = 22 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D9BF0"
    strokeWidth="2"
  >
    <rect x="2" y="2" width="20" height="20" rx="3" ry="3"/>
    <text
      x="12"
      y="12.5"
      fontFamily="Arial, sans-serif"
      fontSize="8"
      fontWeight="bold"
      textAnchor="middle"
      dominantBaseline="central"
      fill="#1D9BF0"
      stroke="none"
    >
      GIF
    </text>
  </svg>
);

  export default GifIcon