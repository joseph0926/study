# React - Effect

## Effect 관리 01

React는 단순히 UI 구현을 위한 라이브러리입니다.

`v = f(s)`

위 공식에서 중요한 점은 view를 계산하는 함수(컴포넌트)가 순수해야한다는 것입니다

즉, 컴포넌트가 렌더링될 때 사이드이펙트 없이 렌더링되어야 합니다.

- 추가설명
  - 컴포넌트는 입력(Props와 State)을 받아서 View를 계산하는 것 외에 다른 일을 할 때 사이드이펙트가 생깁니다.

### **규칙 #0: 컴포넌트가 렌더링될 때 사이드이펙트 없이 렌더링되어야 합니다.**

위의 문장은 매우 심플하지만 실제 애플리케이션은 그렇지 않습니다.

실제 애플리케이션은 사이드이펙트가 없지 않습니다. 오히려 매우 많습니다.

따라서 사이드이펙트를 어떻게 효과적으로 관리하느냐가 중요합니다.

간단한 앱이 존재한다고 가정하겠습니다.

해당 앱은 단어 배열이 존재하고, 버튼에 따라 index를 증가시키거나 마지막 index에서 0으로 리셋하는 앱입니다.

```jsx
import * as React from "react";

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
    </main>
  );
}

export default function App() {
  return <Greeting name="Tyler" />;
}
```

이제 사이드이펙트를 앱에 추가해 복잡성을 증가시켜 보겠습니다.

구체적으로는 브라우저의 **`localStorage`** API를 사용해 index를 로컬 저장소에 저장해 보겠습니다.

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(0);

  const greetings = ["Hello", "Hola", "Bonjour"];

  const handleClick = () => {
    const nextIndex = index === greetings.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
  };

  // ****
  localStorage.setItem("index", index);
  // ****

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

당장 생각할 수 있는 로직은 위의 코드와 같습니다.

이제 앱이 다시 렌더링될 때마다 로컬 저장소가 새 **`index`** 값으로 업데이트됩니다. 이를 나중에 사용하여 사용자의 앱의 초기 상태를 설정할 수 있습니다.

이것은 합리적인 해결책처럼 보일 수 있지만, 이는 **규칙 #0**을 위반합니다.

- `localStorage`와의 상호 작용은 사이드이펙트이며, 따라서 그것을 React의 렌더링 흐름에서 제외해야 합니다.

### **규칙 #1: 사이드이펙트가** 이벤트에 의해 발생한다면, 그 사이드이펙트를 이벤트 핸들러에 넣기

이벤트 핸들러의 전체 목적은 이벤트에 대한 논리를 캡슐화하는 것입니다.

이렇게 하면 React에서 해당 논리(이벤트에 대한 로직)를 렌더링 흐름과 자연스럽게 분리할 수 있습니다.

**따라서 사이드이펙트가 이벤트에 의해 발생한다면, 그 사이드이펙트를 다른 이벤트 논리와 함께 이벤트 핸들러에 넣는것이 좋은 방법이 될수있습니다.**

즉, 아래처럼 수정하면됩니다

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(0);

  const greetings = ["Hello", "Hola", "Bonjour"];

  const handleClick = () => {
    const nextIndex = index === greetings.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);

    // ****
    localStorage.setItem("index", index);
    // ****
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

이제 앱에 존재하는 사이드이펙트는 여전히 컴포넌트의 일부이지만, 렌더링과 관련 없는 컴포넌트의 일부로 추상화되었습니다.

- 이게 중요한 부분입니다 ⇒ 사이드이펙트를 최대한 렌더링과 관계없게 만들어야합니다

이번에는 로컬스토리지에 저장된 index를 가져오는 시나리오입니다.

```jsx
import * as React from "react";

function Greeting({ name }) {
  const [index, setIndex] = React.useState(
    // ****
    Number(localStorage.getItem("index"))
    // ****
  );

  const greetings = ["Hello", "Hola", "Bonjour"];

  const handleClick = () => {
    const nextIndex = index === greetings.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);

    localStorage.setItem("index", nextIndex);
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

이것은 합리적인 해결책처럼 보이지만, 다시 **규칙 #0**을 위반합니다.

해당 로컬스토리지 값을 첫 렌더링에 한번만 사용하는데, 지금 상황은 `Greeting`이 렌더링될 때마다 **`Number(localStorage.getItem("index"))`** 사이드이펙트가 호출됩니다

이때 사용할 수 있는 방법으로 lazy state initialization가 존재합니다

이 아이디어는 `useState`에 함수를 전달하여 초기 렌더링 시에만 호출되고, 그 함수의 반환 값이 상태의 초기 값으로 사용된다는 것입니다.

- 함수를 전달하면 왜 초기 렌더링 시에만 호출될까요?
  - ? 리액트 내부 구조가 그렇다고 합니다

```jsx
const [index, setIndex] = React.useState(() => {
  return Number(localStorage.getItem("index"));
});
```

이렇게 하면 초기 렌더링에서만 사이드이펙트가 발생합니다.

반대로 말하면 여전히 한번은 사이드이펙트가 발생합니다

근데 솔직히 딱 한번 사이드이펙트를 호출하여 렌더링이 정말 약간 늦어지는 건 상관없지 않을까요?

맞는말일수 있습니다.

하지만 서버사이드 렌더링, 서버컴포넌트 등에서는 확실히 문제가 됩니다.

우선 로컬스토리지는 브라우저 api이기 때문에 서버 로직에서 접근이 불가능합니다

- useState도 사용이 불가능하지만 일단 넘어갑시다

그것을 해결하려고 코드를 조정하면 이렇게 될 것입니다.

```jsx
const [index, setIndex] = React.useState(() => {
  if (typeof window === "undefined") {
    return 0;
  }
  return Number(localStorage.getItem("index"));
});
```

이는 합리적으로 보이지만, 초기 렌더링 시 클라이언트에서 로컬 저장소에 값이 있으면 React는 또 다른 오류를 발생시킬 것입니다.

서버에서 렌더링된 초기 UI와 클라이언트 UI가 일치하지 않기 때문에 하이드레이션에 실패하는 오류가 발생합니다.

- SSR등으로 렌더링된 HTML에서는 index가 무조건 0이지만, 클라이언트에서 렌더링된 HTML은 index의 값이 0이 아닐수있기때문입니다.

### **규칙 #2: 컴포넌트를 외부 시스템과 동기화하는 사이드이펙트가 있는 경우, 해당 사이드이펙트를 useEffect 에서 처리하기**

`useEffect`는 외부 시스템과 컴포넌트를 동기화하는 사이드이펙트를 실행할 수 있게 해주는 React의 훅입니다.

즉, `useEffect`는 사이드이펙트를 React의 렌더링 흐름에서 제거하고 컴포넌트가 렌더링될 때까지 실행을 지연시키는 방식으로 작동합니다

개념적으로 이것은 논리적입니다. 특히 **규칙 #1**과 결합될 때 더욱 그렇습니다.

React는 사이드이펙트가 실행될 수 있는 시점을 제어함으로써 렌더링의 속도와 예측 가능성을 극대화할 수 있습니다.

정리하면 아래와 같습니다.

**사이드이펙트는 이벤트가 발생할 때 (규칙 #1) 또는 컴포넌트가 렌더링된 후에만 실행될 수 있습니다 (규칙 #2)**

### **규칙 #0**

컴포넌트가 렌더링될 때 사이드이펙트 없이 렌더링되어야 합니다.

### **규칙 #1**

사이드이펙트가 이벤트에 의해 발생한다면, 그 사이드이펙트를 이벤트 핸들러에 넣으십시오.

### **규칙 #2**

사이드이펙트가 외부 시스템과 컴포넌트를 동기화하는 경우, 그 사이드이펙트를 `useEffect` 내에 넣으십시오.
