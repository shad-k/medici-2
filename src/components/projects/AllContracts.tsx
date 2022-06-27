import React, { useRef, useState, useEffect } from 'react'
import { Contract } from '../../model/types'
import useAllLaunchedContracts from '../../hooks/useAllLaunchedContracts'
import ContractCardV2 from './ContractCardV2'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const AllContracts: React.FC<{masterAddress : string, connectedChain: string}> = ({masterAddress, connectedChain}) => {
const { data: contracts, error } = useAllLaunchedContracts(masterAddress, connectedChain);


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
    <div className="w-full min-w-max justify-center items-center mt-10 flex flex-col gap-5">
      {/* <br></br>
      <Slider {...settings}>
      {contracts.map((contract: Contract, i) => (
        <div className="flex justify-center p-1">
          <ContractCard contract={contract} colorVar={i} />
        </div>
      ))}
    </Slider> */}
    {contracts.map((contract: Contract, i) => (
          <ContractCardV2 contract={contract}/>
    ))}
    </div>
  );
}

export default AllContracts