import React, { Fragment, useState }  from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ handleTurn, xTurn, squares }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner()) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xTurn ? "X": "O";
    handleTurn(nextSquares);
  }

  const winner = calculateWinner();
  let status = winner ? `Winner: ${winner}` : "Next Player";

  return (
    <Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </Fragment>
  );

  // Copied this function from react.dev
  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xTurn, setxTurn] = useState(true);
  const curSquares = history[history.length - 1];

  function handleTurn(board) {
    const newHistory = [...history, board];
    setHistory(newHistory);
    setxTurn(!xTurn);
  }

  function jumpTo(move) {
    console.log(`Jump to ${move}`);
  }

  const moves = history.map((_, move) => {
    const desc = `Go to ${move}`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board handleTurn={handleTurn} 
               xTurn={xTurn}
               squares={curSquares}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
