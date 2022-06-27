import React from 'react'
import Rocket from '../svgComponents/Rocket'
import Star1 from '../svgComponents/Star1'
import Star2 from '../svgComponents/Star2'
import Planet from '../svgComponents/Planet'
import { useLocation } from 'react-router-dom'

const StarryBackground: React.FC<{}> = () => {
  const location = useLocation()
  if (location.pathname !== "/") {
    return null
  }

  return (
    <div className="absolute top-0 left-0 z-0 h-full w-full flex flex-col">
      <div className="main-page-bg flex w-full flex-1 relative"></div>
        <div className="absolute left-[50%] top-48">
          <Rocket/>
        </div>
        <div className="absolute left-[40%] top-72">
          <Star1/>
        </div>
        <div className="absolute left-[90%] top-56">
          <Planet/>
        </div>
        <div className="absolute left-[50%] top-48">
          <Star2/>
        </div>

    </div>
  )
}

export default StarryBackground