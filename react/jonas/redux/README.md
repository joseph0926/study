# React - Redux

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
