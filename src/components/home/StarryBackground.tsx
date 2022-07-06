import React from 'react';
import Rocket from '../../rocket.png';
import Star1 from '../svgComponents/Star1';
import Star2 from '../svgComponents/Star2';
import Planet from '../svgComponents/Planet';
import { useLocation } from 'react-router-dom';

const StarryBackground: React.FC<{}> = () => {
  const location = useLocation();
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 z-0 h-full w-full flex flex-col">
      <div className="main-page-bg w-full h-full flex flex-1">
        <div className="absolute flex bottom-0 right-0">
          <img
            src={Rocket}
            className="transform scale-75 translate-y-18 md:scale-100"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default StarryBackground;
