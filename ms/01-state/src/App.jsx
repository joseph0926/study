import { useState } from "react";
import GameBoard from "./components/game-board";
import Player from "./components/player";
import GameLog from "./components/game-log";

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

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
              - 왜 어떻게 이렇게 동작할까?
                - 답변 추가
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
        <GameBoard onSelectSquare={selectedSquareHandler} turns={gameTurns} />
      </div>
      <GameLog turns={gameTurns} />
    </main>
  );
}

export default App;
