import React, { useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const NFTCard: React.FC<{collection: string, index: number, onSelect: any}> = ({collection, index, onSelect}) => {
    return (
    <div className="p-2">
        <Card>
            <img loading="lazy" src={process.env.PUBLIC_URL + `/assets/${collection}/${index}.png`} alt={`${index}`} onClick={event => onSelect(index)}/>
            {/* <CardMedia
              data-src="https://placeholder.pics/svg/120x150"
              component="img"
              alt={`${index}`}
              height="150"
              image={process.env.PUBLIC_URL + `/assets/${collection}/${index}.png`}
              title={`${collection}-${index}`}
            /> */}
        </Card>
    </div> 
  )
}

export default NFTCard;