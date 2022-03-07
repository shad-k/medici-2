import React from 'react'
import Collections from '../components/Collections'

const AllCollectionsPage = () => {
  return (
    <div className="w-full mx-auto h-full flex flex-col">
      <Collections viewAll={true} />
    </div>
  )
}

export default AllCollectionsPage
