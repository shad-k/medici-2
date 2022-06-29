import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import ProjectPage from '../components/projects/ProjectPage';

export const ProjectPageRenderer: React.FC<{
  contractAddress: string
  isLaunched?: boolean
}> = ({ contractAddress, isLaunched }) => {
  switch (isLaunched) {
    default:
      return <ProjectPage contractAddress={contractAddress} />
  }
}

const Project: React.FC<{}> = () => {
    const { wallet, connect, setChain, connectedChain } = useWallet()
    const params = useParams()
    const contractaddress = params.contractaddress as string;

    return (
    <div>
      <ProjectPageRenderer contractAddress={contractaddress} isLaunched={true}/>
    </div>
    );
}

export default Project