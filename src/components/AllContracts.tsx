import React, { useRef, useState, useEffect } from 'react'
import { Contract } from '../model/types'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'
import ContractCard from './ContractCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AllContracts: React.FC<{masterAddress : string}> = ({masterAddress}) => {
const { data: contracts, error } = useAllLaunchedContracts(masterAddress);

  if (!contracts && !error) {
    return null
  }

  if (!contracts) {
    return null
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      }, 
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }, 
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-4/5 md:w-11/12 max-w-[1200px] items-center md:items-start m-auto pb-20">
      <br></br>
      <Slider {...settings}>
      {contracts.slice(1,5).map((contract: Contract, i) => (
        <div className="flex justify-center p-1">
          <ContractCard contract={contract} colorVar={i} />
        </div>
      ))}
      <div className="mt-1 ml-1 p-5 bg-black h-[300px] rounded-2xl">
        NEW CONTRACT
      </div>
    </Slider>
    </div>
  );
}

export default AllContracts