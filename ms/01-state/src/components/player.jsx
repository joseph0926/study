import { useState } from "react";

export default function Player({ playerName, playerSymbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playerName);

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      {/* 
        setIsEditing(!isEditing) 보다 setIsEditing((prevState) => !prevState)이 더 권장되는 이유는 뭘까
        - React에서 state를 기존(예전) state를 기반으로 올바르게 업데이트 하는 방법
          - 결론은 update 함수(setXXX)에 함수를 인자로 보내서 업데이트해야함
          - 왜?
            - React가 state를 업데이트할 때 업데이트를 즉각적으로 수행하는 것이 아님
              - React 스케쥴링 메커니즘에 따라 업데이트함
              - 코드적으로 state를 업데이트 함 -> react가 해당 코드에 따라 미래의 상태 변경 스케쥴을 조정함 -> 실제로 업데이트 됨
                - 이 과정은 실제로 ms 이지만 어쨋든 즉각적이진 않음
          - 증명
            ```js
            const updateHandler = () => {
              // 기존 상태가 false라 가정
              setIsOpen(!isOpen) // true로 예측됨
              setIsOpen(!isOpen) // false로 예측됨
              // 결과적으로 state가 변화가 없을 것으로 예측됨
            }
            ```
            - 하지만 실제로 실행해보면 true로 바뀜
            - 위의 코드를 서술
              setIsOpen(!isOpen) => state를 true로 바꾸라는 스케쥴이 생성됨
              setIsOpen(!isOpen) => state를 true로 바꾸라는 스케쥴이 생성됨 (왜냐하면 아직 위에 스케쥴이 실제로 실행되지 않음)
      */}
      <button onClick={() => setIsEditing((prevState) => !prevState)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
