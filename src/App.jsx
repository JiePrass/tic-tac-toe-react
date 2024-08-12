/* eslint-disable react/prop-types */
import { useState } from 'react'

function Square({value, onSquareClick}) {
  return <button onClick={onSquareClick} className="square">{value}</button>
}


function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice()

    nextSquares[i] = xIsNext ? 'X' : 'O'

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if(winner) {
    status = 'Winner : ' + winner
  } else {
    status = 'Next Player : ' + (xIsNext ? 'X' : 'O')
  }

  return (
      <>
        <div className="status">{status}</div>
        <div className="board">
          {squares.map((square, index) => (
            <Square
              key={index}
              value={square}
              onSquareClick={() => handleClick(index)}
            />
          ))}
    </div>
      </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let desc = ''
    if(move > 0) {
      desc = 'Go to move #' + move
    } else {
      desc = 'Go to game start'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="gameBoard">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="gameInfo">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares)  {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return false
}
