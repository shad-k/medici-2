import React from 'react'
import { Contract } from '../model/types'

const ContractCard: React.FC<{contract: Contract}> = ({contract}) => {
    return (
        <div className="w-4/5 md:w-11/12 lg:w-9/12 mx-auto h-full flex flex-col mt-10">
           <p>{contract.name}</p>
        </div>
    );
}

export default ContractCard