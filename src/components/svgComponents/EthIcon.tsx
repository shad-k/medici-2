import React from 'react'

const EthIcon: React.FC<{ fill?: string }> = ({ fill = 'currentColor' }) => {
  return (
    <svg
      stroke={fill}
      fill={fill}
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
    </svg>
  )
}

export default EthIcon
