import { useState } from "react";
import GameBoard from "./components/game-board";
import Player from "./components/player";
import GameLog from "./components/game-log";
import {
  deriveActivePlayer,
  initialGameBoard,
  WINNING_COMBINATIONS,
} from "./utils";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];

    if (first && first === second && third) {
      winner = first;
    }
  }

  const selectedSquareHandler = (rowIndex, colIndex) => {
    // setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    setGameTurns((prevState) => {
      /*
        player에 activePlayer를 할당할 수 있지만, 이러면 두개의 state가 합쳐지게됨,,
          - 별로 좋지 못한 패턴
      */
      const currentPlayer = deriveActivePlayer(prevState);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevState,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* 
            React는 컴포넌트마다 새로운 인스턴스를 생성함
              - 즉, 같은 컴포넌트라도 A의 내용을 변경한 것이 B에 반영되지 않음
            */}
          <Player
            playerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            playerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={selectedSquareHandler} board={gameBoard} />
      </div>
      <GameLog turns={gameTurns} />
    </main>
  );
}

export default App;
