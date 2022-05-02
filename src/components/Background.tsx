import React from 'react'

const Background: React.FC<{}> = () => {
  return (
    <div className="absolute top-0 left-0 z-0 h-full w-full flex flex-col">
      <div className="relative body-bg h-[700px] w-full">
        <div className="absolute body-bg h-full w-full"></div>
      </div>
      <div className="body-bg flex-100 w-full flex-1"></div>
    </div>
  )
}

export default Background
