import React from "react";

function BagIcon({ size = 24, fill = "#000", style }) {
  return (
    <svg
      width={size}
      height={size}
      fill={fill}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <path d="M26.953 23.576L25 6a2 2 0 00-2-2H7a2 2 0 00-2 2L3.047 23.576A2 2 0 005 26h20a2 2 0 001.953-2.424zM20 8.908V10c0 2.757-2.243 5-5 5s-5-2.243-5-5V8.908A1.495 1.495 0 0110.5 6 1.5 1.5 0 0112 7.5V10c0 1.654 1.346 3 3 3s3-1.346 3-3V7.5a1.5 1.5 0 013 0c0 .652-.419 1.202-1 1.408z"></path>
    </svg>
  );
}

export default BagIcon;
