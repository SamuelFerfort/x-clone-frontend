/* eslint-disable react/prop-types */

const HomeSVG = ({ size = 24, color = 'black', strokeWidth = 2, className = '', isActive = false, ...props }) => {
  const activeColor = isActive ? color : 'white';
  const inactiveColor = isActive ? 'transparent' : 'black';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      {...props}
    >
      {/* Outline path */}
      <path
        d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"
        fill={activeColor}
        stroke={activeColor}
        strokeWidth={strokeWidth}
      />
      {/* Fill path */}
      <path
        d="M38.5,41h-8c-0.828,0-1.5-0.672-1.5-1.5v-9c0-1.657-1.343-3-3-3h-4c-1.657,0-3,1.343-3,3v9c0,0.828-0.672,1.5-1.5,1.5h-8 C8.672,41,8,40.328,8,39.5V21.413c0-1.746,0.803-3.402,2.174-4.477L23.629,6.172c0.326-0.257,0.788-0.257,1.114,0l13.455,10.764 C39.197,18.011,40,19.667,40,21.413V39.5C40,40.328,39.328,41,38.5,41z"
        fill={inactiveColor}
      />
    </svg>
  );
};

export default HomeSVG;