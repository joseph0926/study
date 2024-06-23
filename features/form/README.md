# Form

## 목차

[react-hook-form](#react-hook-form)

## React Hook Form

- [React Hook From 이란](https://react-hook-form.com/)
  - React 애플리케이션에서 Form에 대한 관리를 쉽게 하기 위해 만들어진 써드파티 라이브러리

### useForm

- useForm이란 react-hook-form에서 제공하는 핵심 커스텀 훅
- 기능

  - 폼 상태 관리

    - 입력 필드의 값을 추적하고 업데이트
    - 폼 전체의 상태를 관리합니다

  - 유효성 검사

    - 입력값에 대한 유효성 검사 규칙을 설정 가능
    - 실시간으로 유효성 검사를 수행

  - 에러 처리

    - 유효성 검사 실패 시 에러 메시지를 관리
    - 필드별로 에러 상태를 추적

  - 폼 제출 핸들링

    - 폼 제출 이벤트를 처리
    - 유효한 데이터만 제출되도록 보장

  - 필드 등록 및 해제

    - 동적으로 폼 필드를 추가하거나 제거 가능

  - 조건부 필드 처리

    - 특정 조건에 따라 필드를 표시하거나 숨길 수 있음

  - 비제어 컴포넌트 지원

    - DOM을 직접 조작하여 성능을 최적화

  - 폼 데이터 watch
    - 특정 필드의 값 변화를 감시 가능

1. `handleSubmit(onSubmit, onError?)`

- handleSubmit 함수는 첫번째 인자로 **폼이 유효할 때 실행될 콜백 함수**를, 두번쨰 인자(옵셔널)로 유효성 검사 실패 시 실행될 콜백 함수를 받음

- 동작

  1. 폼의 기본 제출 이벤트를 가로챔

     1. form 태그를 이용해 폼을 제출하면 브라우저에서 submit 이벤트를 발생시킴
     2. React는 submit 이벤트를 가로채고, 이를 바탕으로 SyntheticEvent 객체를 생성
        - SyntheticEvent
          - React에서 사용하는 특별한 이벤트 객체
          - 모든 브라우저에서 일관된 이벤트 인터페이스를 제공
          - 이벤트 객체를 풀링하여 메모리 사용을 최적화 (v17 전 버전까지만,,)
     3. 해당 SyntheticEvent를 상속받는 `React.FormEvent<HTMLFormElement>`이 handleSubmit으로 전달됨
        - 이 객체에서 event.preventDefault()를 호출함

  2. 등록된 모든 필드에 대해 정의된 유효성 검사 규칙을 실행

     - 내부적으로 모든 등록된 필드에 대해 validateField 함수를 호출
       - 이 과정은 비동기적으로 처리될 수 있으며, Promise.all을 사용하여 모든 검증이 완료될 때까지 기다림

  3. 모든 필드가 유효하면 onSubmit 콜백을 호출 / 유효성 검사 실패 시 오류를 설정하고, 정의된 경우 onError 콜백을 호출

     - 유효성 검사가 완료되면 결과에 따라 onSubmit 또는 onError 콜백함수를 호출

  4. 폼 데이터 또는 에러 데이터를 각 콜백함수에 전달

2. `register(name: string, options?: RegisterOptions)`

- 입력 필드를 폼의 상태 관리 시스템에 등록
  ```tsx
  <input id="name" {...register("name")} />
  ```
- 필드에 대한 유효성 검사 규칙을 정의
  ```tsx
  <input
    id="name"
    {...register("name", { required: "이름을 입력해주세요." })}
  />
  ```
- 필드의 변화를 감지하기 위한 이벤트 리스너를 연결
- 필드에 연결할 수 있는 ref 객체를 반환

1. 필드 식별자 생성
   - 내부적으로 고유한 식별자를 생성하여 각 필드를 추적
2. 상태 초기화
   - 등록된 필드에 대한 초기 상태를 폼의 내부 상태 객체에 설정
3. 유효성 검사 함수 생성
   - 제공된 옵션을 기반으로 유효성 검사 함수를 생성
   - 이 함수는 필드 값이 변경될 때마다 실행
4. 메모이제이션
   - 성능 최적화를 위해 register 함수의 결과를 메모이제이션
   - 불필요한 리렌더링을 방지하기 위해 동일한 인자로 호출 시 캐시된 결과를 반환
5. 비제어 컴포넌트 최적화
   - 가능한 경우 비제어 컴포넌트 방식을 사용하여 렌더링 성능을 최적화
   - 일반적으로 React는 제어 컴포넌트를 권장함 (만약 비제어 컴포넌트 방식을 사용하면 경고를 띄움)
   - 하지만, react-hook-form에서는 최적화를 위해 비제어 컴포넌트를 사용
     - 즉, DOM이 자체적으로 폼 데이터를 관리하고, React는 필요할 때만 값을 읽음 (with ref)
     - 이러면 입력값 변경마다 재렌더링이 안됨
   - 이게 맞는걸까? ... 제어 컴포넌트 vs 비제어 컴포넌트
     | 특성 | 제어 컴포넌트 | 비제어 컴포넌트 |
     |------|--------------|-----------------|
     | **정의** | React state로 입력 값을 관리 | DOM이 입력 값을 직접 관리 |
     | **데이터 흐름** | 양방향 (React ↔ DOM) | 단방향 (DOM → React) |
     | **값 접근 방식** | state를 통해 직접 접근 | ref를 사용하여 DOM에서 접근 |
     | **장점** | - 즉시 입력 값 검증<br>- 조건부 렌더링 용이<br>- 폼 데이터 중앙 관리<br>- 동적 입력 제어 용이 | - 구현 간단<br>- 성능 우수 (특히 대규모 폼)<br>- 즉각적인 사용자 입력 반응 |
     | **단점** | - 각 입력마다 핸들러 함수 필요<br>- 대규모 폼에서 성능 저하 가능 | - 실시간 입력 검증 어려움<br>- 동적 입력 제어 복잡<br>- 폼 상태 관리 복잡 |
     | **성능** | 입력마다 리렌더링 발생 가능 | 리렌더링 최소화, 빠른 반응 |
     | **유효성 검사** | 실시간 검증 용이 | 제출 시점 검증 주로 사용 |
     | **상태 관리** | React state로 명확히 관리 | DOM에 의존, 상태 추적 어려움 |
     | **테스트 용이성** | 단위 테스트 작성 용이 | DOM 의존성으로 테스트 복잡 |
     | **가능한 문제점** | - 대규모 폼에서 성능 이슈<br>- 불필요한 리렌더링 | - 상태 불일치<br>- 예측 불가능한 업데이트<br>- 조건부 렌더링 시 상태 유지 문제 |
     | **서버 사이드 렌더링** | 호환성 우수 | 초기 렌더링 불일치 가능 |
     | **React 철학 일치도** | 높음 (선언적 프로그래밍 모델) | 낮음 (명령적 접근) |
6. 필드 배열 지원

   - 동적 필드 배열을 위한 특별한 로직을 포함
   - 동적 필드 배열이란?
     - 사용자의 액션에 따라 폼 필드가 동적으로 추가되거나 제거될 수 있는 구조
     - ex) 여러 주소를 입력할 수 있는 폼, 여러 항목을 동적으로 추가/제거할 수 있는 목록 등
   - 이러한 동적 필드 배열을 제어하기 위해서 react-hook-form에서 `useFieldArray`를 제공

   ```jsx
   import { useForm, useFieldArray } from "react-hook-form";

   function DynamicForm() {
     const { control, register } = useForm();
     const { fields, append, remove } = useFieldArray({
       control,
       name: "items",
     });

     return (
       <form>
         {fields.map((field, index) => (
           <div key={field.id}>
             <input {...register(`items.${index}.name`)} />
             <button type="button" onClick={() => remove(index)}>
               Delete
             </button>
           </div>
         ))}
         <button type="button" onClick={() => append({ name: "" })}>
           Add Item
         </button>
       </form>
     );
   }
   ```

- `formState`

  - isDirty: 폼의 필드가 변경되었는지 여부
  - isSubmitting: 폼 제출 중인지 여부
  - isSubmitted: 폼이 제출되었는지 여부
  - isSubmitSuccessful: 폼 제출이 성공적이었는지 여부
  - errors: 유효성 검사 오류 객체
  - touchedFields: 사용자가 터치한 필드
  - dirtyFields: 변경된 필드

  - JavaScript Proxy를 사용하여 구현

## FormData
