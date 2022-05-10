import React from 'react'
import { ProjectContext } from '../contexts/ProjectContextProvider'

// const useTestActiveProject = () => {
//     const [ActiveProject, setActiveProject] = React.useState<Collection>()

//     React.useEffect(() => {
//         setActiveProject((mockData as any).activeProject)
//       }, [])
//       return ActiveProject
// }

// export default useTestActiveProject



const useTestActiveProject= () => {
  const { project } = React.useContext(ProjectContext)

  return { project }
}

export default useTestActiveProject