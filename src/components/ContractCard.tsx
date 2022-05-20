import React from 'react'
import { Contract } from '../model/types'
import { FaFileContract } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ContractCard: React.FC<{ contract: Contract, colorVar: number}> = ({contract, colorVar}) => {
    return (
        <Link
            to={`/project/${contract.contractaddress}`}>
        <div className="p-5 border-[1px] backdrop-blur-sm drop-shadow-lg h-[300px] overflow-clip rounded-2xl">   
            <div>
                <FaFileContract size={40}/>
            </div>
            <br></br>
            <span className="inline-flex text-2xl overflow-scroll mt-36">
           <h1 className="mr-2">{contract.name}</h1>
           <p> ({contract.symbol})</p></span>
           <p className="text-[10px]">{contract.contractaddress}</p>
        </div>
        </Link>
    );
}

export default ContractCard