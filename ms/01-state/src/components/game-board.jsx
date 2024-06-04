const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  /*
    이전 상태가 객체 or 배열인 경우 이전 상태를 기반으로 상태를 올바르게 업데이트 하는 방법
    - 불변성을 지키기 위해 이전 상태를 복사한 후 해당 복사본을 변경
      - 만약 원본을 직접 변경한다면?
      ```js
      setGameBoard(prevState => {
        prevState[rowIndex][colIndex] = "X"
        return prevState
      })
      ```
      - 객체나 배열의 경우 참조 값을 다루고 있기 때문에 이런식으로 업데이트하면 메모리에 있는 이전 값을 즉시 업데이트 하게됨
      - 그러면 리액트 상태 업데이트 스케쥴링과 어긋나게 됨
        - 버그 발생 확률 있음

    - 따라서 아래와 같이 하는 것이 적절
      ```js
      setGameBoard((prevState) => {
        const updatedBoard = [...prevState.map((innerArray) => [...innerArray])];
        updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
        return updatedBoard;
      });
      ```
  */

  let gameBoard = initialGameBoard;
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={playerSymbol !== null}
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
