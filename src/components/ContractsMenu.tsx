import React, { useRef, useState, useEffect } from 'react'
import { Contract } from '../model/types'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'
import ContractCard from './ContractCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const ContractsMenu: React.FC<{masterAddress : string, handleInputData: (input: any) => void}> = ({masterAddress, handleInputData}) => {
const { data: contracts, error } = useAllLaunchedContracts(masterAddress);

  if (!contracts && !error) {
    return null
  }

  if (!contracts) {
    return null
  }

  const onSelectOption = async(contractSelected: string) => {
    const contractIdx = contractSelected.substring(.2)
    const selected = contracts[parseInt(contractIdx)-1];
    handleInputData(selected);
  }

  return (
    <div className="w-1/2 md:text-left flex flex-col my-2">
      {
      <select className="h-[50px] text-2xl bg-transparent outline-none overflow-ellipsis" onChange={event => onSelectOption(event.target.value)}>
      {contracts.map((contract: Contract, i) => (
        <option>{i+1}. {contract.name} ({contract.symbol})</option>
      ))}
      </select>
      }
    </div>
  );
}

export default ContractsMenu