import Player from "./components/player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          {/* 
            React는 컴포넌트마다 새로운 인스턴스를 생성함
              - 즉, 같은 컴포넌트라도 A의 내용을 변경한 것이 B에 반영되지 않음 
              - 왜 어떻게 이렇게 동작할까?
                - 답변 추가
            */}
          <Player playerName="Player 1" playerSymbol="X" />
          <Player playerName="Player 2" playerSymbol="O" />
        </ol>
      </div>
    </main>
  );
}

export default App;
