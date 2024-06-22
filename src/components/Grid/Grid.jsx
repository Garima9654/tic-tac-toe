import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner";
import "./Grid.css";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(true); //true=>0, false=>X
  const [winner, setWinner] = useState(null);

  function play(indx) {
    if (turn == true) {
      board[indx] = "O";
    } else {
      board[indx] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  }
  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }
  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h1 className="turn-highlight">Winner is {winner}</h1>
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h1 className="turn-highlight">Current turn: {turn ? "O" : "X"}</h1>
      <div className="grid">
        {board.map((el, indx) => (
          <Card
            gameEnd={winner ? true : false}
            key={indx}
            onPlay={play}
            player={el}
            index={indx}
          />
        ))}
      </div>
    </div>
  );
}
export default Grid;
