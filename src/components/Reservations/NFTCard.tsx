import React, { useState, useEffect} from 'react'
import Card from '@mui/material/Card';

const NFTCard: React.FC<{collection: string, index: number}> = ({collection, index}) => {
    return (
    <div className="p-2">
        <Card>
            <img src={process.env.PUBLIC_URL + `/assets/${collection}/${index}.png`} alt={`${index}`}/>
        </Card>
    </div> 
  )
}

export default NFTCard;