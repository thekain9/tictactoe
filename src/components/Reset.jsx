import React from 'react';
import GameState from './GameState';

export default function Reset( {gameState, onReset} ) {
    if(gameState === GameState.inProgress) {
        return;
    }
  return (
    <div>
      <button onClick={onReset} className='reset'>Play Again!</button>
    </div>
  )
}

