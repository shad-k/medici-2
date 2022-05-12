import React from 'react'
import mockData from '../mockDataActiveProject.json'
import { Collection } from '../model/types'

const useTestHook = () => {
    const [ActiveProject, setActiveProject] = React.useState<Collection | null>()

    React.useEffect(() => {
        if (mockData.activeProject) {
          setActiveProject((mockData as any).activeProject)
        }
      }, [])
      
      if (ActiveProject) {
        return ActiveProject;
      } else {
        return null;
      }
      
}

export default useTestHook