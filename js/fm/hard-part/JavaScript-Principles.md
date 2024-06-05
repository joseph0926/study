# JavaScript Principles

- 자바스크립트에는 크게 두 파트가 존재함 => 코드를 읽고 실행하는 파트 / 변수,함수등을 저장하는 메모리 파트
  - 이러한 구성은 크게 js코드가 실행되지마자 존재하는 전역 실행 컨텍스트와, 각 함수별로 존재하는 미니 실행 컨텍스트가 존재

```js
const num = 3;
function multiplyBy2(inputNum) {
  const result = inputNum * 2;
  return result;
}

const output = multiplyBy2(num);
```

- 위의 예시로 보면,

  - num: 3 / multiplyBy2: function / output: ?? 이라는 것은 전역 메모리에 저장됨

- 또한

  - inputNum: 3 / result: 6 이라는 것은 로컬(함수의) 메모리에 저장됨

- 아래와 같이 동작함
  1. 자바스크립트는 코드를 읽고, 전역 실행 컨텍스트를 생성
  2. multiplyBy2 함수 정의는 전역 실행 컨텍스트에 저장됨
  3. multiplyBy2(num)이 호출되면 새로운 함수 실행 컨텍스트가 생성되고, inputNum에 3이, result에 6이 저장됨
  4. 함수가 종료되면 함수 실행 컨텍스트는 사라지고, 반환 값 6이 전역 컨텍스트의 output에 저장
