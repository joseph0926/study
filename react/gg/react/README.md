# React

## 목차

[React 렌더링](#react-렌더링)

[Effect 관리](#effect-관리)

[useRef](#useref)

## React 렌더링

- React는 기본적으로 사용자 인터페이스를 구축하기 위한 라이브러리임
  > v = f(s) ... view = function(state)
  - 위의 공식에 대한 의문점
    - 그래서 f(): function는 언제 어떻게 호출되는지 = React가 view를 언제 어떻게 업데이트하는지 = 언제 어떻게 `렌더링`되는지
    - 렌더링이란?
      - 렌더링은 React가 최종적으로 뷰를 업데이트하기 위해 컴포넌트를 호출하는 것을 표현한 것일 뿐
- 어떻게 렌더링하는지

  - React는 특정 시점에 뷰를 업데이트하는 데 필요한 모든 것을 캡처하는 컴포넌트의 스냅샷을 생성
    - 이 스냅샷에는 프로퍼티, 상태, 이벤트 핸들러, UI에 대한 설명(해당 프로퍼티와 상태에 기반한)이 모두 캡처됨

- 언제 렌더링하는지

  - `v = f(s)`에서 알수있듯이 React는 오직 컴포넌트의 상태가 변경될때만 리렌더링됨

- 결국..
  - React는 기존 상태를 스냅샷을 찍어 기존 상태를 인지하고있다가, 상태가 변경되면 기존 스냅샷과 비교하여, 재렌더링을 수행하고 새로운 스냅샷을 기록함

```jsx
import * as React from "react";

export default function VibeCheck() {
  const [status, setStatus] = React.useState("clean");

  const handleClick = () => {
    setStatus("dirty");
    alert(status);
  };

  return <button onClick={handleClick}>{status}</button>;
}
```

- 위의 예시에서 alert에 찍히는 것은 "clean",,, 왜 dirty가 아닐까?
  - 버튼을 클릭하면 setStatus에 의해 status의 상태가 clean -> dirty로 변경되는 업데이트가 스케쥴링에 들어간다
  - 하지만 React는 비동기적이고, 스케쥴링/배치 메커니즘을 따르므로 즉각적인 업데이트가 발생하지 않음
  - 즉, setStatus("dirty")로 인해 상태가 변경되지만, alert은 이미 이전 스냅샷에 status인 clean을 찍음

```jsx
import * as React from "react";

export default function Counter() {
  console.count("Rendering Counter");
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    console.count("click");
    setCount(count);
  };

  return <button onClick={handleClick}>🤨</button>;
}
```

- 위의 예시에서 버튼을 계속 눌러도 count 상태는 계속 0이다.
  - 즉, state가 변경되지 않으므로 react 입장에서는 리렌더링을 하지 않음

```jsx
import * as React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <main>
      <h1>{count}</h1>
      <button onClick={handleClick}>+</button>
    </main>
  );
}
```

- 위의 예시에서 버튼을 클릭하면 count가 3으로 업데이트되는 것을 기대할 수 있지만, 실제로는 1이 나온다
  - 앞서 언급했듯이 react는 모든 상태를 즉각적으로 업데이트하는 것이 아닌 스케쥴링/배치 메커니즘에 의해 약간의 텀을 두고 업데이트됨
  - 즉, count + 1이 세번 존재하지만 모두 동일한 스냅샷(count: 0)에 대해서 +1을 하므로 결과적으로 1이 렌더링됨
  - 또한 버튼을 클릭하였을 때, 리렌더링이 3번 일어난다고 생각할 수 있지만, 실제로는 1번 일어난다

```jsx
import * as React from "react";

export default function App() {
  const [linear, setLinear] = React.useState(0);
  const [exponential, setExponential] = React.useState(1);

  const handleClick = () => {
    setLinear(linear + 1);
    setExponential(exponential * 2);

    console.log({ linear, exponential });
  };

  return (
    <main>
      <p>Linear: {linear}</p>
      <p>Exponential: {exponential}</p>
      <button onClick={handleClick}>Do Math</button>
    </main>
  );
}
```

- 위의 예시도 같은 맥락으로 버튼을 클릭하였을 때, 화면에 렌더링 되는 것은 각각 1, 2지만 콘솔에는 0,1이 찍힌다

```jsx
import * as React from "react";
import Wave from "./Wave";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(0);

  const greetings = ["Hello", "Hola", "Bonjour"];

  const handleClick = () => {
    const nextIndex = index === greetings.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
  };

  return (
    <main>
      <h1>
        {greetings[index]}, {name}
      </h1>
      <button onClick={handleClick}>Next Greeting</button>
      <Wave />
    </main>
  );
}

export default function App() {
  return <Greeting name="Tyler" />;
}
```

- 위의 예시에서 버튼을 눌러 상태를 업데이트하면 `Wave`컴포넌트는 재렌더링이 될까?
  - 재렌더링이 일어난다
- React에서 상위 컴포넌트의 상태가 업데이트되면 하위 컴포넌트가 상위 컴포넌트로부터 props를 받는 것과 관계없이 무조건 재렌더링이 일어난다

- 그러면 아래와 같은 질문이 발생합니다

  > 왜? 아무런 관계도 없어보이는 하위 컴포넌트를 재렌더링하는게 default일까?

- 답은 아래와 같음
  1. React는 렌더링 최적화가 내부적으로 매우 잘되어있음
  - 즉, 하위 컴포넌트들을 재렌더링한다고 크리티컬한 성능 이슈가 발생하지 않음 (발생한다면 그건 코드를 잘못 구성한것)
  2. React 컴포넌트가 항상 순수 함수가 아니기 때문에, 즉 props 외에도 다른 요소들이 렌더링에 영향을 줄 수 있기 때문에, 단순히 props가 변경될 때만 자식 컴포넌트를 다시 렌더링하는 것이 항상 적절하지 않음
  - 리액트의 기본 공식인 `v = f(s)`에서 약간의 탈출구(escape hatches) 가 존재함: useRef, useEffect
  3. 만약 개발자가 의도적으로 오직 props가 변경될때만 리렌더링을 시키고 싶다면 명시적으로 React.memo를 사용하면됨

## Effect 관리

- React는 이론적으로 결국 `v=f(s)`인 순수함수여야함
  - 즉, 상태가 변화하면 렌더링이되는 기능만 수행해야함
- 하지만 실제 애플리케이션을 구축하면 당연하게도 사이드이펙트가 발생
  - 이러한 사이드 이펙트를 관리하는 룰이 존재함

1. Rule #0: 컴포넌트가 렌더링될 때 부작용 없이 렌더링되어야 함

2. Rule #1: 이벤트에 의해 사이드 이펙트가 트리거되는 경우 해당 사이드이펙트를 이벤트 핸들러에 넣어서 처리

- 이벤트 핸들러의 핵심은 이벤트에 대한 로직을 캡슐화하는 것
- 그렇게 함으로써 React에서는 해당 로직을 React의 렌더링 흐름에서 자연스럽게 분리할 수 있음

- 로컬스토리지에 값을 저장하는 경우

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(0);

  const greetings = ["Hello", "Hola", "Bonjour"];

  const handleClick = () => {
    const nextIndex = index === greetings.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);

    localStorage.setItem("index", nextIndex); // 사이드 이펙트를 이벤트 헨들러에서 다루기
  };

  return (
    <main>
      <h1>
        {greetings[index]}, {name}
      </h1>
      <button onClick={handleClick}>Next Greeting</button>
    </main>
  );
}

export default function App() {
  return <Greeting name="Tyler" />;
}
```

- 이렇게 되면서 얻게되는 이점은, 리액트가 렌더링에 사이드 이펙트가 영향을 끼치지 않는다는 점

- 이번에는 로컬스토리지에 저장한 값을 가져오는 경우

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(
    Number(localStorage.getItem("index"))
  );

  // ...
}
```

- 위의 예시는 합리적으로 보이지만, 룰 #0을 위반함
  - 왜냐하면 이 앱에서 `localStorage.getItem("index")`이라는 사이드 이펙트를 매 렌더링마다 불러올것이므로,,

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(() => {
    return Number(localStorage.getItem("index"));
  });

  // ...
}
```

- 이렇게 수정하면 딱 단 한번만 불러오지만, 여전히 룰 #0을 위반함
  - 한번이든 여러번이든 결국 사이드이펙트를 불러옴,,,

3. Rule #2: 컴포넌트를 외부 시스템과 동기화하는 사이드이펙트가 있는 경우, 해당 사이드이펙트를 useEffect 안에 넣어서 처리

```jsx
import * as React from "react";

export default function BatteryLevel() {
  const [level, setLevel] = React.useState(0);

  React.useEffect(() => {
    console.log("Getting battery level...");
    // 사이드이펙트
    navigator.getBattery().then((battery) => {
      const newLevel = Math.round(battery.level * 100);

      if (newLevel !== level) {
        setLevel(newLevel);
      }
    });
  });

  console.log("Rendering");
  return <p>{level}%</p>;
}
```

- 위의 콘솔 결과는 아래와 같음

```
Rendering
Getting battery level...
Rendering
Getting battery level...
```

- 첫번째 콘솔 묶음은 컴포넌트가 머운트될때 찍히는 로깅 + useEffect에서 비동기적으로 배터리 레벨을 가져오고있는 로깅임
- 두번째 콘솔 묶음은 기존 level 상태(0)과 현재 level(100 ... 가정)이 다르기때문에 컴포넌트가 재렌더링이 되어서 찍히는 로깅 + 다시 useEffect에서 비동기적으로 배터리 레벨을 가져오는 로깅임

- useEffect에는 의존성 배열이 존재하여, 의존성 배열에 존재하는 값이 변경되면 useEffect가 다시 트리거됨
  - 단 빈 배열일 경우 마운트될때 딱 한번 실행됨

```jsx
React.useEffect(() => {
  console.log("Getting battery level...");
  // 사이드이펙트
  navigator.getBattery().then((battery) => {
    const newLevel = Math.round(battery.level * 100);

    if (newLevel !== level) {
      setLevel(newLevel);
    }
  });
}, []);
```

- 이러면 로깅 결과가 아래와 같아짐

```
Rendering
Getting battery level...
Rendering
```

## useRef

- useRef는 렌더링 전반에 걸쳐 보존되지만 변경 시 다시 렌더링하지 않는 값을 생성해주는 훅
  - useRef를 호출하면 반환되는 것은 변경 가능한 현재 프로퍼티가 있는 객체, 즉 렌더링 간에 값이 보존되는 참조
  - useState와 달리 변경 가능하며(불변성을 지키지 않아도 되며) 값이 변경되어도 재렌더링이 일어나지 않음
