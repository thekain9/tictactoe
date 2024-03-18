import React from 'react';
import Tile from './Tile';
import Strike from './Strike';

export default function Board({ playerTurn, tile, onClickTile, strikeClass }) {
    const tiles = Array.from( {length: 9} )

    const borderDisplay = (index) => {
      if (index === 0 || index === 1 || index === 3 || index ===4) {
        return 'right-border bottom-border';
      } else if (index === 2 || index===5) {
        return 'bottom-border';
      } else if (index === 6|| index=== 7) {
        return 'right-border'
      }else {
        return null
      }   
    }

    const tileSelected = (i) => {
      return tile[i];
    }


  return (
    <div className='board'>
    
    {tiles.map((_, index) => ( 
        <Tile key={index} className={borderDisplay(index)} value={tileSelected(index)} 
        onClick={()=>onClickTile(index)} playerTurn={playerTurn}/>
    ))}
    <Strike strikeClass={strikeClass} />
    
    </div>
  )
}
