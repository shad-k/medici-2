import React, { useEffect, useState } from 'react'
import { Contract } from '../../model/types'
import { Link } from 'react-router-dom'
import { getContractCover } from '../../utils/retrieve'

const ContractCardV2: React.FC<{ contract: Contract}> = ({contract}) => {
    const [CoverImage, setCoverImage] = useState<string>();

    useEffect(() => {
        async function getCover() {
            try {
                const data = await getContractCover(contract.name)
                setCoverImage(data);
            } catch {
                console.log("error getting cover")
                return null;
            }
        }
        getCover();
    }, [])

    if (!CoverImage) {
        return null;
    }

    return (
        <Link
            to={`/project/${contract.name}`}>
            <div className="justify-center drop-shadow-lg rounded-2xl bg-[#2e2c38] aspect-video items-center flex flex-col m-2">   
                <div className="group relative">
                    <div className="w-full aspect-video rounded-2xl object-cover overflow-hidden">
                      <img src={CoverImage} alt={contract.name} className="w-full aspect-video rounded-2xl object-cover"/>
                    </div>
                    <div className="absolute h-full left-0 top-0 rounded-2xl right-0 p-5 group-hover:bg-medici-purple/60 bg-transparent transition-all ease-in">
                        <h1 className="text-4xl font-bold text-center mt-[20%] text-white opacity-100">{contract.name}({contract.symbol})</h1>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ContractCardV2