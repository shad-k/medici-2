import React, { useState, useEffect} from 'react'
import Card from '@mui/material/Card';

const NFTCard: React.FC<{collection: string, index: number, onSelect: any}> = ({collection, index, onSelect}) => {
    return (
    <div className="p-2">
        <Card>
            <img src={process.env.PUBLIC_URL + `/assets/${collection}/${index}.png`} alt={`${index}`} onClick={event => onSelect(index)}/>
        </Card>
    </div> 
  )
}

export default NFTCard;