import React, { useRef, useState, useEffect } from 'react'
import { Contract } from '../model/types'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'
import ContractCard from './ContractCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

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
      {contracts.map((contract: Contract, i) => (
        <div className="flex justify-center p-1">
          <ContractCard contract={contract} colorVar={i} />
        </div>
      ))}
      <Link
      to="/demo">
      <div className="p-5 border-[1px] backdrop-blur-sm drop-shadow-lg h-[300px] overflow-clip rounded-2xl mt-1">
        <h1 className="align-middle text-center">NEW CONTRACT</h1>
      </div>
      </Link>
    </Slider>
    </div>
  );
}

export default AllContracts