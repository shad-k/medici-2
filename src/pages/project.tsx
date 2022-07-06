import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import ProjectPage from '../components/projects/ProjectPage';

export const ProjectPageRenderer: React.FC<{
  contractName: string
  isLaunched?: boolean
}> = ({ contractName, isLaunched }) => {
  switch (isLaunched) {
    default:
      return <ProjectPage contractName={contractName} />
  }
}

const Project: React.FC<{}> = () => {
    const { wallet, connect, setChain, connectedChain } = useWallet()
    const params = useParams()
    const contractname = params.contractname as string;

    return (
    <div>
      <ProjectPageRenderer contractName={contractname} isLaunched={true}/>
    </div>
    );
}

export default Project