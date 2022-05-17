import React from 'react'
import { Contract } from '../model/types'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'
import ContractCard from './ContractCard';

const AllContracts: React.FC<{masterAddress : string}> = ({masterAddress}) => {
const { data: contracts, error } = useAllLaunchedContracts(masterAddress);
  if (!contracts && !error) {
    return null
  }

  if (!contracts) {
    return null
  }

    return (
        <div className="w-4/5 md:w-11/12 lg:w-9/12 mx-auto h-full flex flex-col mt-10">
            {contracts.map((contract: Contract) => (
                <ContractCard contract={contract} />
            ))}
        </div>
    );
}

export default AllContracts