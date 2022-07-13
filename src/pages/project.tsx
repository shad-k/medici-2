import React from 'react'
import { useParams } from 'react-router-dom';
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
    const params = useParams()
    const contractname = params.contractname as string;

    return (
    <div>
      <ProjectPageRenderer contractName={contractname} isLaunched={true}/>
    </div>
    );
}

export default Project