import React from 'react';
import GameState from './GameState';

export default function GameOver({ gameState} ) {
  switch (gameState) {
    case GameState.inProgress:
       return  <div></div>;
    case GameState.player0Wins:
        return <div className='game-over'>Player O Wins!</div>
    case GameState.playerXWins:
        return <div className='game-over'>Player X Wins!</div>
    case GameState.draw:
        return <div className='game-over'>It's a draw!</div>
    default:
        return <div></div>
  }
}
