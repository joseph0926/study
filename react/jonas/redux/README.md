# React - Redux

## 목차

[Redux란?](#redux란)

[Redux 동작](#redux-동작)

[Middleware](#middleware)

## Redux란?

- 전역 상태 관리 라이브러리
- Standalone 라이브러리 -> 바닐라 js에서도 사용 가능
- 모든 전역 상태를 하나의 스토어에 저장 / `actions`을 이용해 상태 업데이트
  - 전역 상태가 업데이트 되면, 해당 상태를 사용하고 있는 컴포넌트는 리렌더링됨

## Redux 동작

- redux는 기본적으로 useReducer 훅과 유사하게 동작함

- useReducer 훅 동작방식

  - 컴포넌트에서 `actions`을 `reducer`함수로 `dispatch`함
    - actions에는 `type`과 `payload`가 존재함
  - actions을 받은 reducer함수는 현재 상태를 기반으로 상태를 업데이트함
  - 상태가 업데이트되면 컴포넌트가 업데이트됨

- redux 동작방식
  - 컴포넌트에서 actions을 `store`로 dispatch함
    - actions에는 `type`과 `payload`가 존재함
    - redux는 actions을 자동으로 생성해주는 `Action creator function`가 존재함
    - store에는 전역 상태들과 여러 reducer함수가 존재함
  - actions을 받은 reducer함수는 현재 상태를 기반으로 상태를 업데이트함
  - 상태가 업데이트되면 컴포넌트가 업데이트됨

## Middleware

- 기본 아이디어

  - 앱에서 비동기 호출을 하였을 떄(ex, api 호출), redux에서 이것을 처리하는 곳(방법)은?
  - redux는 비동기 호출을 처리할 수 없음

    - 왜냐하면 reducer 함수가 순수함수이기 때문
    - 즉, redux store는 비동기 호출 처리에 대해서 아무런 관여를 하지 않음

  - 그렇다면 `component`에서 기존처럼 useEffect등을 이용해서 비동기 호출을 처리한 후 `dispatch`를 이용하여 store에 저장?

    - 가능은 함,,, 다만 원하는 방향성이 아님
    - 비동기 호출을 한 곳에 모아 캡슐화하는 방법을 원하고, 컴포넌트를 깨끗하게 유지하고 싶은 것을 지향함

  - 그러면 store -> x / component -> x 라면,, 어디서 이러한 작업을 수행할까?
    - **Middleware**에서 처리함

- 미들웨어란?

  - 기본적으로 store와 dispatch 사이에 존재하는 함수
  - 즉, dispatch를 통해 action을 store에 전달하는 사이에서 코드 실행이 가능함을 의미함

- 작동방식
  1. 컴포넌트에서 dispatch를 이용해 어떠한(비동기) action을 store로 보냄
  2. store로 가는 중간에 middleware가 해당 action을 받아서 비동기 작업을 수행
  3. 예를들어 api 호출을 통해 데이터를 가져왔다면, 데이터를 받자마자 middleware에서 action payload에 해당 데이터를 담음
  4. store에 전달 -> 상태 업데이트
