import React from 'react'
import useTestHook from '../hooks/useTestHook'
import { ProjectContextReturn } from '../model/types'

const initialValue: ProjectContextReturn = {
  project: null
}

export const ProjectContext = React.createContext(initialValue)

const ProjectContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const project = useTestHook()

  return (
    <ProjectContext.Provider
      value={{
        project
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider
