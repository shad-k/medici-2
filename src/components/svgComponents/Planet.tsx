import React from 'react'

const Planet: React.FC<{}> = () => {
    return (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_i_11_224)">
  <circle cx="25" cy="25" r="25" fill="url(#paint0_linear_11_224)"/>
  </g>
  <defs>
  <filter id="filter0_i_11_224" x="0" y="-10" width="50" height="60" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="-10"/>
  <feGaussianBlur stdDeviation="10"/>
  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.328839 0 0 0 0 0.0559028 0 0 0 0 0.583333 0 0 0 0.8 0"/>
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_11_224"/>
  </filter>
  <linearGradient id="paint0_linear_11_224" x1="42" y1="-1.4019e-06" x2="10" y2="45" gradientUnits="userSpaceOnUse">
  <stop stop-color="#F67893"/>
  <stop offset="0.505208" stop-color="#E78FA2" stop-opacity="0.703125"/>
  <stop offset="1" stop-color="#DC267E"/>
  </linearGradient>
  </defs>
  </svg>
  );
}
export default Planet
