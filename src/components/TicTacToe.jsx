import React from 'react';
import Board from './Board';
import GameOver from './GameOver';
import { useState, useEffect } from 'react';
import GameState from './GameState';
import Reset from './Reset';
import drawSound from '../sounds/draw.wav';
import moveSound from '../sounds/move.wav';
import winnerSound from '../sounds/winner.wav';

const drawSoundEffect = new Audio(drawSound);
drawSoundEffect.volume = .2;

const moveSoundEffect = new Audio(moveSound);
moveSoundEffect.volume = .2;

const winnerSoundEffect = new Audio(winnerSound);
winnerSoundEffect.volume = .5;


const playerX = 'X';
const playerO = "O";

const winningCombinations = [
  //rows
  {combo:[0,1,2], strikeClass: 'strike-row-1'},
  {combo:[3,4,5], strikeClass: 'strike-row-2'},
  {combo:[6,7,8], strikeClass: 'strike-row-3'},

  //columns
  {combo:[0,3,6], strikeClass: 'strike-column-1'},
  {combo:[1,4,7], strikeClass: 'strike-column-2'},
  {combo:[2,5,8], strikeClass: 'strike-column-3'},

  //diagonal
  {combo:[0,4,8], strikeClass: 'strike-diagonal-1'},
  {combo:[2,4,6], strikeClass: 'strike-diagonal-2'}
]

function checkWinner(tiles, setStrikeClass, setGameState) {
  for(const {combo, strikeClass} of winningCombinations) {
    let tileValue1 = tiles[combo[0]]
    let tileValue2 = tiles[combo[1]]
    let tileValue3 = tiles[combo[2]]

    if (tileValue1 !== null && 
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3) {
        setStrikeClass(strikeClass)
        if (tileValue1 === playerX){
          setGameState(GameState.playerXWins)
        } else {
          setGameState(GameState.player0Wins)
        }
        return;
      }
  }
  const tilesAreFilledIn = tiles.every((tile)=>tile != null);
  if(tilesAreFilledIn) {
    setGameState(GameState.draw)
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(playerX);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleClickTile = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if(tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    
    if(playerTurn === 'X') {
      setPlayerTurn('O')
    } else {
      setPlayerTurn('X')
    } 
  }

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(playerX);
    setStrikeClass(null);
  }


  useEffect(()=> {
    checkWinner(tiles, setStrikeClass, setGameState);
  },[tiles]);

  useEffect(() => {
    if(tiles.some((tile)=>tile !== null)) {
      moveSoundEffect.play();
    }
  }, [tiles]);

  useEffect(()=>{
    if(gameState === GameState.draw) {
      drawSoundEffect.play();
      return;
    }
  }, [gameState])

  useEffect(()=> {
    if(gameState !== GameState.inProgress && gameState !== GameState.draw ) {
      winnerSoundEffect.play();
    }
  }, [gameState])

  return (
    <div>
    <h1>Tic-Tac-Toe</h1>
      <Board playerTurn={playerTurn} 
      tile={tiles} 
      onClickTile={handleClickTile} 
      strikeClass={strikeClass} />
      <GameOver gameState={gameState}/>
      <Reset gameState={gameState} onReset={handleReset}/>
      
    </div>
  )
}

export default TicTacToe;