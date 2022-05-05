import React from 'react'
import mockData from '../mockDataActiveProject.json'
import { Collection } from '../types'

const useTestActiveProject = () => {
    const [ActiveProject, setActiveProject] = React.useState<Collection>()

    React.useEffect(() => {
        setActiveProject((mockData as any).activeProject)
      }, [])
      return ActiveProject
}

export default useTestActiveProject
