import React from 'react'
import mockData from '../mockDataActiveProject.json'
import { Collection } from '../model/types'

const useTestHook = () => {
    const [ActiveProject, setActiveProject] = React.useState<Collection | null>()

    React.useEffect(() => {
        if (mockData) {
          setActiveProject((mockData as any).activeProject)
        }
        else {
          setActiveProject(null)
        }
      }, [])
      return ActiveProject
}

export default useTestHook